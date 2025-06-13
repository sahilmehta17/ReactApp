import React, {useState} from "react";

function ForgotPasswordPage ({onBack}) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
          const res = await fetch('http://localhost:3001/api/request-password-reset', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
          });

          const data = await res.json();

          if (res.ok) {
              setOtpSent(true);
              setMessage('OTP sent to your email.');
            } else {
                setMessage(data.error || 'Failed to send reset OTP.');
            }
        } catch (err) {
            console.error('Error requesting reset:', err);
            setMessage('Network error. Try again.');
        }
    };

    const handleReset = async (e) => {
      e.preventDefault();
      try {
          console.log('Sending:', { email, otp, newPassword });
          const res = await fetch('http://localhost:3001/api/forgot-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, otp, newPassword }),
          });

          const data = await res.json();
          console.log('Response:', data);
          if (res.ok) {
              alert('Password reset successfully!');
              onBack();
          } else {
              setMessage(data.error || 'Reset failed.');
          }
      } catch (err) {
          console.error('Reset password error:', err);
          setMessage('Network error. Try again.');
      }
    };
      
    return (
      <div className="forgot-password-page">
        <div className="form-card">
          <h2>Forgot Password</h2>
          {!otpSent ? (
              <form onSubmit={handleForgotPassword}>
                  <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
                  <button type="submit">Send OTP</button>
              </form>
          ) : (
              <form onSubmit={handleReset}>
                  <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                  />
                  <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                  />
                  <button type="submit">Reset Password</button>
              </form>
          )}
          {message && <p>{message}</p>}
          <button className="back-button" onClick={onBack}>Back to Login</button>
        </div>
      </div>
  );
}

export default ForgotPasswordPage;