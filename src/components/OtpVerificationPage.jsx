import React, { useState } from 'react';

function OtpVerificationPage({ email, onBackToLogin }) {
    const [otp, setOtp] = useState('');

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Email verified successfully!');
                onBackToLogin();
            } else {
                alert(data.error || 'Verification failed');
            }
        } catch (e) {
            console.error('OTP Verification error:', e);
            alert('Network error. Please try again.');
        }
    };

    return (
        <div className="otp-verification-page">
            <div className="form-card">
                <h2>Verify Your Email</h2>
                <p>Enter the OTP sent to {email}</p>
                <form onSubmit={handleVerify}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button type="submit">Verify</button>
                </form>
                <button className="back-button" onClick={onBackToLogin}>Back to Login</button>
            </div>
        </div>
    );
}

export default OtpVerificationPage;
