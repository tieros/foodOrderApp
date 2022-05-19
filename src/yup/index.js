import * as yup from 'yup';

const YupValidation = yup.object({
    email: yup.string().required('Please enter your e-mail adress'),
    password: yup.string().required('Please enter your password'),
});
export default YupValidation;
