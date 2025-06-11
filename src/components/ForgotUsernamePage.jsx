import React, {useState} from "react";

function ForgotUsernamePage ({onBack}) {
    const [email, setEmail] = useState('');

    const handleForgotUsername = async (e) => {
        e.preventDefault();

        console.log("Sending username recovery to", { email });
        alert("Forgot Username API PH");
    }

    return (
        <div className="forgot-username-page">
          <h2>Forgot username</h2>
          
          <form onSubmit={handleForgotUsername}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Link</button>
          </form>
          
          <div>
            <button onClick={onBack}>Back to Login</button>
          </div>
        </div>
      );
}

export default ForgotUsernamePage;