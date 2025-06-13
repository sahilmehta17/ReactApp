import React, {useState} from "react";

function ForgotUsernamePage ({onBack}) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotUsername = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/forgot-username', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Your username has been sent to your email.');
            } else {
                setMessage(data.error || 'Failed to retrieve username.');
            }
        } catch (e) {
            console.error('Forgot Username Error:', e);
            setMessage('Network error. Try again.');
        }
    };

    return (
        <div className="forgot-username-page">
          <div className="form-card">
            <h2>Forgot Username</h2>
            
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
            {message && <p>{message}</p>}
            <button className="back-button" onClick={onBack}>Back to Login</button>
          </div>
        </div>
      );
}

export default ForgotUsernamePage;