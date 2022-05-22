import * as yup from 'yup';

const YupValidation = yup.object({
    email: yup.string().required('Please enter your e-mail adress'),
    password: yup.string().required('Please enter your password'),
    verifyPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    address: yup.string().required('Please enter your full address'),
    name: yup.string().required('Please enter your name'),
    surname: yup.string().required('Please enter your surname'),
    phone: yup.string().required('Please enter your phone number'),
});
export default YupValidation;
