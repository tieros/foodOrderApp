import Input from '../../atoms/input';
import Button from '../../atoms/button';
import { login } from '../../service/auth';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import useForm from '../../customhooks/useForm';
import ForgotPassword from '../forgotPassword';
import { useState } from 'react';

export default function Login() {

    const [loginMode, setLoginMode] = useState(true);
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {email: '', password: ''};

    const { values, errors, disabled, handleChange, validateValue } = useForm(initialValues);

    const submitHandler =  (e) => {
        e.preventDefault();
        const { email, password } = values;

        const user = login(email, password)
        .then(user => {
            const { token, uid } = user;
            dispatch(authActions.setUser({ token, uid, isLoggedIn: true }));
            navigate('/');
        })
        .catch(error => {
            console.log(error)
            setLoginError(error.message);
        });
    }

    const changeMode = () => {
        setLoginMode(false)
    }

    return (
        <>
       {!loginMode ? <ForgotPassword /> :
        <form className='login-container' onSubmit={submitHandler}>
            <p className='auth-error'>{loginError}</p>
            <Input
                id='login-email'
                name='email'
                type='e-mail'
                label='E-mail'
                value={values.email}
                onBlur={validateValue}
                onChange={handleChange}
                error={errors.email}
            />
            <Input
                id='login-password'
                name='password'
                type={'password'}
                label='Password'
                value={values.password}
                onBlur={validateValue}
                onChange={handleChange}
                error={errors.password}
            />
            <span onClick={changeMode} className='forgot-password'>Forgot Password</span>
            <Button title='Submit' type='submit' disabled={disabled} />
        </form>
        }
        </>
    );
}