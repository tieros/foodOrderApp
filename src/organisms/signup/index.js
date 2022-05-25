import { ref, set, child } from 'firebase/database';
import { database } from '../../firebase';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import Input from '../../atoms/input';
import Button from '../../atoms/button';
import yupValidation from '../../yup';
import { signUp } from '../../service/auth';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';


export default function Login() {

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

    const onSubmit = (values) => {
        const { name, surname, phone, address, email, password } = values;
        try {
            signUp(email, password, name, surname, phone, address);
            const { uid } = signUp();
            dispatch(authActions.setIsLoggedIn(true));
            dispatch(authActions.setUid(uid));
            navigate('/home');
        } catch (error) {
            console.log(error);
            dispatch(authActions.setErrorMessage(error))
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={yupValidation} onSubmit={onSubmit}>
            {({ isValid, isSubmitting, errors, touched }) => (
                <div className='signup-container'>
                    <Form className='signup-form-container'>
                        <Input
                            name='name'
                            type='text'
                            label='Name'
                            className={errors.name && touched.name && 'invalid'}
                        />
                        <Input
                            name='surname'
                            type='text'
                            label='Surname'
                            className={errors.surname && touched.surname && 'invalid'}
                        />
                        <Input
                            name='phone'
                            type='text'
                            label='Phone Number'
                            className={errors.phone && touched.phone && 'invalid'}
                        />
                        <Input
                            name='email'
                            type='email'
                            label='E-mail'
                            className={errors.email && touched.email && 'invalid'}
                        />
                        <Input
                            name='address'
                            type='text-area'
                            label='Address'
                            className={errors.address && touched.address && 'invalid'}
                        />
                        <Input
                            name='password'
                            type='password'
                            label='Password'
                            className={errors.password && touched.password && 'invalid'}
                        />
                        <Input
                            name='verifyPassword'
                            type='password'
                            label='Verify Password'
                            className={errors.verifyPassword && touched.verifyPassword && 'invalid'}
                        />
                        <Button title='Submit' type='submit' disabled={!isValid || isSubmitting} />
                    </Form>
                </div>
            )}
        </Formik>
    );
}
