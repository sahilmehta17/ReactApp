import React, {useState} from "react";

function ForgotPasswordPage ({onBack}) {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        console.log("Sending link to", { username, password });
        alert("Awaiting Forgot Password API");
    }

    return (
        <div className="forgot-password-page">
          <h2>Forgot Password</h2>
          
          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
          
          <div>
            <button onClick={onBack}>Back to Login</button>
          </div>
        </div>
      );
}

export default ForgotPasswordPage;