import { useState } from 'react';
import eyeOff from '../../assets/eyeOff.svg';
import eye from '../../assets/eye.svg';

export default function Input(props){

const [showPassword, setShowPassword] = useState(false);

const {id, type, label, className, error, loading, onBlur, ...rest} = props;

const setType = showPassword ? 'text' : 'password';

return (
    <div className='input-main-container'>
        <label htmlFor={id}>{label}</label>
        <div className='input-container'>
            {
                {
                    textarea: <textarea disabled={loading} autoComplete='nope'></textarea>,
                    password: (
                        <span onClick={() => setShowPassword((prevState) => !prevState)}>
                            {!showPassword ? (
                                <img src={eye} alt='password show icon' />
                            ) : (
                                <img src={eyeOff} alt='password hide icon' />
                            )}
                        </span>
                    ),
                }[type]
            }
            <input
                className={`${error ? 'invalid' : ''} ${className}`}
                type={type === 'password' ? setType : type}
                disabled={loading}
                onBlur={onBlur}
                id={id}
                autoComplete='nope'
                {...rest}
            />
        </div>
        {error && <div className='error-message'>{error}</div>}
    </div>
);
}