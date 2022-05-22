import { Formik, Form } from 'formik';
import Input from '../../atoms/input';
import Button from '../../atoms/button';
import yupValidation from '../../yup';
import { login } from '../../service/auth';
import { useNavigate } from 'react-router';

export default function Login() {

    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password : ''
    };

    const onSubmit = async (values) => {

        const { email, password } = values;
        try {
            await login(email, password);
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