import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

function RegisterPage({onBackToLogin, onOtpSent}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert('OTP sent. Verify your email!');
                onOtpSent(email);
            } else {
                alert(data.error || 'Registration failed.');
            }

        } catch (e) {
            console.error('Registration error:', e);
            alert('Network error. Please try again later.');
        }
    };

    return (
        <div className="register-page">
            <div className="form-card">
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <button className="back-button" onClick={onBackToLogin}>Back to Login</button>
            
            </div>
        </div>
    );
}

export default RegisterPage;
