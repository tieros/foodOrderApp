import { ref, set, child } from 'firebase/database';
import { database } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Input from '../../atoms/input';
import Button from '../../atoms/button';
import { signUp } from '../../service/auth';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import useForm from "../../customhooks/useForm";


export default function Login(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        name: '',
        surname: '',
        phone: '',
        address: '',
        email: '',
        password: '',
        verifyPassword: ''
    };

    const { values, errors, disabled, handleChange, validateValue } = useForm(initialValues);

    const submitHandler = async (e) => {
        e.preventDefault();
        const { name, surname, phone, address, email, password } = values;
        if (Object.keys(errors).length !== 0) {
            props.mode(false);
            return;
        }
        try {
            const user = await signUp(email, password, name, surname, phone, address);
            if (user) {
                const { uid, token } = user;
                dispatch(authActions.setUser({ uid, token, isLoggedIn: true }));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            dispatch(authActions.setErrorMessage(error));
        }
    };

    return (
                <div className='signup-container'>
                    <form className='signup-form-container' onSubmit={submitHandler}>
                        <Input
                            id="signup-name"
                            name='name'
                            type='text'
                            label='Name'
                            value={values.name}
                            onBlur={validateValue}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <Input
                            id="signup-surname"
                            name='surname'
                            type='text'
                            label='Surname'
                            value={values.surname}
                            onBlur={validateValue}
                            onChange={handleChange}
                            error={errors.surname}
                        />
                        <Input
                            id="signup-phone"
                            name='phone'
                            type='text'
                            label='Phone Number'
                            placeholder="555 555 55 55"
                            value={values.phone}
                            onBlur={validateValue}
                            onChange={handleChange}
                            error={errors.phone}
                        />
                        <Input
                            id="signup-email"
                            name='email'
                            type='email'
                            label='E-mail'
                            value={values.email}
                            onBlur={validateValue}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <Input
                            id="signup-address"
                            name='address'
                            type='text-area'
                            label='Address'
                            value={values.address}
                            onBlur={validateValue}
                            onChange={handleChange}
                            error={errors.address}
                        />
                        <Input
                            id="signup-password"
                            name='password'
                            type='password'
                            label='Password'
                            value={values.password}
                            onBlur={validateValue}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <Input
                            id="signup-verifyPassword"
                            name='verifyPassword'
                            type='password'
                            label='Verify Password'
                            value={values.verifyPassword}
                            onBlur={validateValue}
                            onChange={handleChange}
                            error={errors.verifyPassword}
                        />
                        <Button title='Submit' type='submit' disabled={disabled} />
                    </form>
                </div>
    );
}
