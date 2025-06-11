import React, { useState } from 'react';
import LoginPage from './LoginPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import ForgotUsernamePage from './ForgotUsernamePage';

function LoginInterface() {
    const [pageType, setPageType] = useState('login');

    return (
        <div className="login-interface">
            
            {pageType === 'login' && (
                <LoginPage onForgotPassword={() => setPageType('forgotPassword')} onForgotUsername={() => setPageType('forgotUsername')}/>
           )}
           
            {pageType === 'forgotPassword' && (
                <ForgotPasswordPage onBack={() => setPageType('login')} />
           )}
           
            {pageType === 'forgotUsername' && (
             <ForgotUsernamePage onBack={() => setPageType('login')} />
           )}
        
        </div>
    )

}

export default LoginInterface;
