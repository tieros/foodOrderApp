import { useState, useEffect } from "react";
import { validate } from "../service/validate";

export default function useForm (initialValues) {
    
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });

        //deletes error msg on Change if value is valid

        if (errors[name]) {
            const error = validate({ [name]: value });
            if (Object.keys(error).length === 0) {
                let clearErrors = { ...errors };
                delete clearErrors[name];
                setErrors((errors) => ({
                    ...clearErrors,
                }));
            }
        }
    };

    const validateValue = (e) => {
        const { name, value } = e.target;
        const error = validate({ [name]: value });
        setErrors((errors) => ({
            ...errors,
            ...error,
        }));
    }

       useEffect(() => {
           if (Object.keys(errors).length === 0) {
               setDisabled(false);
           } else setDisabled(true);
       }, [errors]);

       return { values, errors, disabled, handleChange, validateValue };
}