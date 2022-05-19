import { useState } from 'react';
import Login from '../../organisms/login'
import SignUp from '../../organisms/signup';

export default function LoginPage() {
    const [loginMode, setLoginMode] = useState(true);
    const linkText = loginMode ? "Don't have an account? Sign-up!" : "Already have an account? Sign-in!";
    const linkHeading = loginMode ? 'Login' : 'Sign-up';
    return (
        <div className='container'>
            <h2 className='link-heading'>{linkHeading}</h2>
            {loginMode ? <Login /> : <SignUp />}
            <p className="link-text" onClick={() => setLoginMode(prev => !prev)}>{linkText}</p>
        </div>
    );
}
