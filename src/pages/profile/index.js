import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getUserInfo, logout } from "../../service/auth";
import { authActions } from "../../store/auth";
import Button from "../../atoms/button";
import { persistor } from "../../store";
import ProfileInfo from "../../organisms/profileInfo";

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
        <div className="profile-page-container">
            <h1>Profile</h1>
            <ProfileInfo />
            <Button title='Logout' onClick={logoutHandler}/>
        </div>
    )
}