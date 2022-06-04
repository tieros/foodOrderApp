import useForm from "../../customhooks/useForm";
import Input from "../../atoms/input";
import Button from "../../atoms/button";
import { resetPassword } from "../../service/auth";

export default function ForgotPassword(){
    const { values, errors, disabled, handleChange, validateValue } = useForm({email: ''});
   
    const forgotPasswordHandler = (e) => {
        e.preventDefault();
        
        resetPassword(values.email).catch(error => {
            console.log(error)});

            // navigate to login page?
    };

    return (
        <form onSubmit={forgotPasswordHandler}>
            <Input
                id='forgot-password-email'
                name='email'
                type='e-mail'
                label='E-mail'
                value={values.email}
                onBlur={validateValue}
                onChange={handleChange}
                error={errors.email}
            />
            <Button title='Send E-mail' type='submit' disabled={disabled} />
        </form>
    )
}