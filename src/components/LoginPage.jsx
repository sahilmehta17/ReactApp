import React, {useState} from "react";

function LoginPage({onGoToRegister, onForgotPassword, onForgotUsername}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert(`Welcome, ${data.user.username}! Token: ${data.token}`);
                localStorage.setItem('token', data.token);
            } else { 
                alert(data.error || 'Login failed');
            }
        } catch (e) {
            console.log('Login failed!', e)
            alert('Network Error');
        }
    };

    return (
        <div className="login-page">
            <h1> Welcome to ENIDUS!</h1>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>

            <div>
                <button onClick={onGoToRegister}>Register</button>
                <button onClick={onForgotPassword}>Forgot Password?</button>
                <button onClick={onForgotUsername}>Forgot Username?</button>
            </div>
        </div>
    );
}

export default LoginPage;