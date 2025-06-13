const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const { sql, poolConnect, pool } = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/api/register', async (req, res) => {
  await poolConnect;
  const { username, email, password } = req.body;
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .input('email', sql.VarChar, email)
        .input('password_hash', sql.VarChar, hashedPassword)
        .input('otp_code', sql.VarChar, otp)
        .input('otp_expires', sql.DateTime, otpExpiry)
        .query(`
            INSERT INTO Users (username, email, password_hash, otp_code, otp_expires)
            VALUES (@username, @email, @password_hash, @otp_code, @otp_expires)
        `);

      await sgMail.send({
        to: email,
        from: 'sahilmehta0204@gmail.com',
        subject: 'Your OTP',
        text: `Your OTP code is: ${otp}`,
      });
  
      res.status(200).json({ message: 'OTP sent to email. Awaiting verification.' });
    } catch (e) {
      console.error('Registration + OTP error:', e);
      res.status(500).json({ error: 'Failed to register and send OTP' });
    }
});

app.post('/api/login', async (req, res) => {
    await poolConnect;
  
    const { username, password } = req.body;
  
    try {
      const result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM Users WHERE username = @username');
  
      const user = result.recordset[0];
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (!user.is_verified || user.is_verified != 1) {
        return res.status(403).json({ error: 'Email not verified. Please verify before logging in.' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password_hash);
  
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
    );
    
    res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user.id, username: user.username }
    });
  
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/api/verify-otp', async (req, res) => {
    await poolConnect;
  
    const { email, otp } = req.body;
  
    try {
      const result = await pool.request()
        .input('email', sql.VarChar, email)
        .query(`SELECT otp_code, otp_expires FROM Users WHERE email = @email`);
  
      const user = result.recordset[0];
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const now = new Date();
      const isExpired = new Date(user.otp_expires) < now;
      const isMatch = user.otp_code === otp;
  
      if (isExpired) {
        return res.status(400).json({ error: 'OTP expired' });
      }
  
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }
  
      await pool.request()
        .input('email', sql.VarChar, email)
        .query(`UPDATE Users SET is_verified = 1 WHERE email = @email`);
  
      res.status(200).json({ message: 'Email verified successfully' });
  
    } catch (err) {
      console.error('OTP verification error:', err);
      res.status(500).json({ error: 'Verification failed' });
    }
  });
  
  
app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});