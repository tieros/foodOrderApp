import Input from '../../atoms/input';
import Button from '../../atoms/button';
import { login } from '../../service/auth';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import useForm from '../../customhooks/useForm';
import ForgotPassword from '../forgotPassword';
import { useState } from 'react';
import { errorMessage } from '../../service/error-message';

export default function Login() {

    const [loginMode, setLoginMode] = useState(true);
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {email: '', password: ''};

    const { values, errors, disabled, handleChange, validateValue } = useForm(initialValues);

    const submitHandler = async (e) => {
        e.preventDefault();
        const { email, password } = values;

        try {
            const data = await login(email, password);
            const {uid, accessToken} = data.user;
            dispatch(authActions.setUser({ uid, token: accessToken, isLoggedIn: true }));
            navigate('/');
        
        } catch (error) {
            setLoginError(errorMessage(error.message))
        }
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