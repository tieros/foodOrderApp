import { Field, ErrorMessage } from 'formik';

export default function Input(props){
    const {name, type, label, className} = props;

    return (
        <div className='input-container'>
            <label>{label}</label>
            {type === 'text-area' ? (
                <Field
                    component='textarea'
                    rows='4'
                    value={Field.value}
                    name={name}
                    className={className}
                />
            ) : (
                <Field name={name} type={type} className={className} />
            )}
            <ErrorMessage name={name} component='div' className='error-message' />
        </div>
    );
}