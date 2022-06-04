import { useState, useEffect } from "react";
import { validate, validatePasswords } from "../service/validate";

export default function useForm (initialValues) {
    
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });

        //deletes error msg on Change if value is valid

        if (errors[name]) {
            console.log('errors/name ' + errors[name])
            const error = validate({[name]: value });
            
            if (Object.keys(error).length === 0) {
                console.log('objectkeys ' + Object.keys(error));
                let clearErrors = { ...errors };
                delete clearErrors[name];
                setErrors({...clearErrors});
            }
        }
    };

    const validateValue = (e) => {
        const { name, value } = e.target;
        if(name !== 'verifyPassword') {
        const error = validate({[name]: value });
        setErrors({ ...errors, ...error})
        } else {
            const error = validatePasswords({['verifyPassword']: values.verifyPassword, ['password']: values.password});
            setErrors({ ...errors, ...error})
        }
    }

       useEffect(() => {
           setDisabled(Object.keys(errors).length !== 0);
       }, [errors]);

       return { values, errors, disabled, handleChange, validateValue };
}
