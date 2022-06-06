import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../service/auth";
import Input from "../../atoms/input";
import Button from "../../atoms/button";
import { database } from "../../firebase";
import { ref, child, update } from 'firebase/database';
import useForm from "../../customhooks/useForm";

export default function ProfileInfo(){
    
    const [userInfo, setUserInfo] = useState({});
    const [editVersion, setEditVersion] = useState(false);
    const [profileError, setProfileError] = useState('');

    const uid = useSelector((state) => state.auth.user.uid);

    useEffect(() => {
        if (uid) {
            getUserInfo(uid)
                .then((userInfo) => {
                    if (userInfo.exists()) {
                        setUserInfo(userInfo.val());
                        // set is loading false
                    } else {
                        console.log('User data does not exist');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [uid]);
    
    const { name, surname, phone, address } = userInfo;
    const { errors, validateValue, handleChange, disabled, values } = useForm({userInfo});

    const sendDataHandler = (e) => {
        e.preventDefault();
        const dbRef = ref(database);
            update(child(dbRef, `users/${uid}`), {
                name: values.name || name,
                surname: values.surname || surname,
                phone: values.phone || phone,
                address: values.address || address,
            })
            .then(() => {
                setEditVersion(false);
            })
            .catch((error) => {
                console.log(error);
                setProfileError('Something went wrong!');
            });
    }

    return (
        <form className="profile-info-form">
            <p className="profile-error">{profileError}</p>
            <Input
                id='profile-name'
                placeholder={name}
                label='Name'
                type='text'
                name='name'
                onChange={handleChange}
                disabled={!editVersion ? 'disabled' : ''}
                value={values.name}
                onBlur={validateValue}
                error={errors.name}
            />
            <Input
                id='profile-surname'
                placeholder={surname}
                label='Surname'
                type='text'
                name='surname'
                onChange={handleChange}
                disabled={!editVersion ? 'disabled' : ''}
                value={values.surname}
                onBlur={validateValue}
                error={errors.surname}
            />
            <Input
                id='profile-phone'
                placeholder={phone}
                label='Phone'
                type='text'
                name='phone'
                onChange={handleChange}
                disabled={!editVersion ? 'disabled' : ''}
                value={values.phone}
                onBlur={validateValue}
                error={errors.phone}
            />
            <Input
                id='profile-address'
                placeholder={address}
                label='Address'
                type='text-area'
                name='address'
                onChange={handleChange}
                disabled={!editVersion ? 'disabled' : ''}
                value={values.address}
                onBlur={validateValue}
                error={errors.address}
            />
            {editVersion && (
                <Button title='Save Changes' onClick={sendDataHandler} disabled={disabled} />
            )}
            {!editVersion && (
                <Button title='Edit Profile Information' onClick={() => setEditVersion(true)} />
            )}
        </form>
    );

}