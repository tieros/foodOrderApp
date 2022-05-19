import { Field, ErrorMessage } from 'formik';

export default function Input(props){
    const {name, type, label} = props;

    return (
        <div className='input-container'>
            <label>{label}</label>
            {(type==='text-area') ? 
                <Field component='textarea' rows='4' value={Field.value} /> : 
                <Field name={name} type={type} />}
            <ErrorMessage name={name} />
        </div>
    );
}