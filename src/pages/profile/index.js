import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../service/auth";
import { authActions } from "../../store/auth";
import Button from "../../atoms/button";
import { persistor } from "../../store";
import ProfileInfo from "../../organisms/profileInfo";
import Card from "../../atoms/card";

export default function Profile(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        try {
            logout();
            dispatch(authActions.logoutUser());
            persistor.purge();
            navigate('/');
        } catch (error) {console.log(error)}
    }

    return (
        <div className='profile-page-container'>
            <Card className='profile-card'>
                <h2>Profile</h2>
                <ProfileInfo />
                <Button title='Logout' onClick={logoutHandler} className='logout-button'/>
            </Card>
        </div>
    );
}