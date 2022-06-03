import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getUserInfo, logout } from "../../service/auth";
import { authActions } from "../../store/auth";
import Button from "../../atoms/button";

export default function Profile(){

    const [userInfo, setUserInfo] = useState();

    const storedUid = useSelector(state => state.auth.uid);
    const localUserInfo = JSON.parse(localStorage.getItem("user"));
    const { uid } = localUserInfo;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

      if (storedUid || uid ){
        getUserInfo(storedUid || uid).then(userInfo => {
            if(userInfo.exists()){
                setUserInfo(userInfo.val());
                // set is loading false
            } else {
                console.log('User data does not exist');
            }
        }).catch(error => {
            console.log(error);
        });
      }
    }, [uid, storedUid]);

    const logoutHandler = () => {
        try {
            logout();
            dispatch(authActions.setIsLoggedIn(false));
            navigate('/');
        } catch (error) {console.log(error)}
    }

    console.log(userInfo);

    return (
        <div>
            <h1>Profile</h1>
            <Button title='Logout' onClick={logoutHandler}/>
        </div>
    )
}