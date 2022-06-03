import Input from '../../atoms/input';
import Button from '../../atoms/button';
import { login } from '../../service/auth';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import useForm from '../../customhooks/useForm';
import { resetPassword } from '../../service/auth';
import ForgotPassword from '../forgotPassword';
import { useState } from 'react';

export default function Login() {

    const [loginMode, setLoginMode] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {email: '', password: ''};

    const { values, errors, disabled, handleChange, validateValue } = useForm(initialValues);

    const submitHandler = async (e) => {
        e.preventDefault();
        const { email, password } = values;
        console.log(email)
        try {
            login(email, password);
            const { uid } = login();
            dispatch(authActions.setUid(uid));
            navigate('/');

        } catch (error) {
            console.log(error);
        }
    };

    const changeMode = () => {
        setLoginMode(false)
    }


    return (
        <>
       {!loginMode ? <ForgotPassword /> :
        <form className='login-container' onSubmit={submitHandler}>
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
            <span onClick={changeMode}>Forgot Password</span>
            <Button title='Submit' type='submit' disabled={disabled} />
        </form>
        }
        </>
    );
}