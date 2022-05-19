import { Formik, Form } from 'formik';
import Input from '../../atoms/input';
import Button from '../../atoms/button';
import yupValidation from '../../yup';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const initialValues = {
        name: '',
        surname: '',
        phoneNumber: '',
        address: '',
        email: '',
        password: '',
        verifyPassword: ''
    };

    const onSubmit = async (values, event) => {
        event.preventDefault();
        await console.log(values);
        navigate('/home', {replace: true});
    };

    return (
        <Formik initialValues={initialValues} validationSchema={yupValidation} onSubmit={onSubmit}>
            {({ isSubmitting, isValid }) => (
                <Form className='signup-container'>
                    <Input name='name' type='text' label='Name' />
                    <Input name='surname' type='text' label='Surname' />
                    <Input name='phoneNumber' type='text' label='Phone Number' />
                    <Input name='address' type='text-area' label='Address' />
                    <Input name='password' type='password' label='Password' />
                    <Input name='verifyPassword' type='password' label='Verify Password' />
                    <Button title="Submit" type='submit' disabled={!isValid || isSubmitting} />
                </Form>
            )}
        </Formik>
    );
}
