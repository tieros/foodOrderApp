import { useState } from 'react';
import Login from '../../organisms/login'
import SignUp from '../../organisms/signup';
import Card from '../../atoms/card';

export default function LoginPage() {
    const [loginMode, setLoginMode] = useState(true);
    const linkText = loginMode ? "Don't have an account? Sign-up!" : "Already have an account? Sign-in!";
    const linkHeading = loginMode ? 'Login' : 'Sign-up';
    return (
        <div className='container'>
            <Card className='sign-in-up-card'>
            <h2 className='link-heading'>{linkHeading}</h2>
            {loginMode ? <Login /> : <SignUp mode={setLoginMode}/>}
            <p className="link-text" onClick={() => setLoginMode(prev => !prev)}>{linkText}</p>
            </Card>
        </div>
    );
}
