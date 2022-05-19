import { Formik, Form } from 'formik';
import Input from '../../atoms/input';
import Button from '../../atoms/button';
import yupValidation from '../../yup';

export default function Login(){

    const initialValues = {
        email: '',
        password : ''
    };

    const onSubmit = (values) => {
        console.log(values)
    };

    return (
        <Formik initialValues={initialValues} validationSchema={yupValidation} onSubmit={onSubmit}>
            {({ isSubmitting, isValid }) => (
                <Form className='login-container'>
                    <Input name='email' type='e-mail' label='E-mail' />
                    <Input name='password' type='password' label='Password' />
                    <Button title='Submit' type='submit' disabled={!isValid || isSubmitting} />
                </Form>
            )}
        </Formik>
    );
}