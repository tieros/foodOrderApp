import { Formik, Form } from 'formik';
import Input from '../../atoms/input';
import Button from '../../atoms/button';
import yupValidation from '../../yup';
import { login } from '../../service/auth';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password : ''
    };

    const onSubmit = async (values) => {

        const { email, password } = values;
        try {
            login(email, password);
            const { uid } = login();
            dispatch(authActions.setUid(uid));
            navigate('/');

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={yupValidation} onSubmit={onSubmit}>
            {({ isSubmitting, isValid, errors, touched }) => (
                <Form className='login-container'>
                    <Input
                        name='email'
                        type='e-mail'
                        label='E-mail'
                        className={errors.email && touched.email &&'invalid'}
                    />
                    <Input
                        name='password'
                        type='password'
                        label='Password'
                        className={errors.password && touched.password && 'invalid'}
                    />
                    <Button title='Submit' type='submit' disabled={!isValid || isSubmitting} />
                </Form>
            )}
        </Formik>
    );
}