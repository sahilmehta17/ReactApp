import React, {useState} from "react";

function LoginPage({onForgotPassword, onForgotUsername}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Logging in with", { username, password });
        alert("Awaiting Login API");
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
                <button onClick={onForgotPassword}>Forgot Password?</button>
                <button onClick={onForgotUsername}>Forgot Username?</button>
            </div>
        </div>
    );
}

export default LoginPage;