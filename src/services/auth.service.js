const pool = require('../configs/database');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto  = require('crypto');
const mailService = require('../utils/mail.service');
const { error } = require('console');
require('dotenv').config()

const registerService = async (user) => {
    const { gender, name, username, age, password, email } = user;
    try {
        const [existingUser] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length !== 0) {
            return { error: 'Username already exists' };
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await pool.query(
            'INSERT INTO users (gender, name, username, age, password, email) VALUES (?, ?, ?, ?, ?, ?)',
            [gender, name, username, age, hashedPassword, email]
        );
        const [newUser] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const { PASSWORD,SALT,FORGET_PASSWORD_TOKEN,FORGET_PASSWORD_TOKEN_EXPIRATION, ...other } = newUser[0];
        return other;
    } catch (error) {
        return { error: 'Register failed!' };
    }
};

const loginService = async (user) => {
    const { username, password } = user;
    try {
        const userInfo = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (userInfo.length === 0) {
            return { error: 'Username is incorrect' };
        }
        const userPass = (userInfo[0][0].PASSWORD)
        const validPass = await bcrypt.compare(password, userPass);
        if(!validPass){
            return {error: 'Password is incorrect'}
        }
            const accessToken =  await generateAccessToken(user)
            const refreshToken = await generateRefreshToken(user)
            const { PASSWORD, SALT, FORGET_PASSWORD_TOKEN, FORGET_PASSWORD_TOKEN_EXPIRATION, ...other } = userInfo[0][0];
            return { accessToken, refreshToken,other};
    } catch (error) {
        return { error: 'Login failed!'};
    }
};

const generateAccessToken = async (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "45s" }
    );
};

const generateRefreshToken = async (user) =>{
    return jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.SECRET_KEY,
        {expiresIn: "365d"}
    )
}
    

const forgotPassword = async (email) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return { err: 'Email not found' };
        }
        const resetToken = crypto.randomBytes(5).toString('hex');
        const resetTokenExpiration = Date.now() + 3600000;
        const expirationDate = new Date(resetTokenExpiration);

        const formattedDate = expirationDate.getFullYear() + '-' +
            ('0' + (expirationDate.getMonth() + 1)).slice(-2) + '-' +
            ('0' + expirationDate.getDate()).slice(-2) + ' ' +
            ('0' + expirationDate.getHours()).slice(-2) + ':' +
            ('0' + expirationDate.getMinutes()).slice(-2) + ':' +
            ('0' + expirationDate.getSeconds()).slice(-2);    

        await pool.query('UPDATE users SET FORGET_PASSWORD_TOKEN = ?, FORGET_PASSWORD_TOKEN_EXPIRATION = ? WHERE email = ?', [resetToken, formattedDate, email])
        const subject = 'Reset password';
        const text = `Click this link to reset your password: http://localhost:8000/auth/reset-password/${resetToken}`;
        await mailService.sendMail(email, subject, text);
    } catch (error) {
        return { err: 'Forgot password failed!' };
    }
};

const resetPassword = async (token, body) => {
    const { password, confirmPassword, email } = body;
    if (password !== confirmPassword) {
      return { err: 'Passwords do not match' };
    }
    try {
      const [user] = await pool.query('SELECT * FROM users WHERE FORGET_PASSWORD_TOKEN = ? AND EMAIL = ?', [token,email]);
      if (user.length === 0) {
        return { err: 'Reset password token is not valid' };
      }
      const exp = user[0].FORGET_PASSWORD_TOKEN_EXPIRATION;
      const expiresEnd = new Date(exp).getTime();
      if (Date.now() > expiresEnd) {
        return { err: 'Token has expired!' };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await pool.query('UPDATE users SET PASSWORD = ?, FORGET_PASSWORD_TOKEN = NULL, FORGET_PASSWORD_TOKEN_EXPIRATION = NULL WHERE FORGET_PASSWORD_TOKEN = ? AND EMAIL = ?', [hashedPassword, token, email]);
      return null;
    } catch (err) {
      return { err: 'Reset password failed!' };
    }
  }
  
module.exports = {
    loginService,
    registerService,
    forgotPassword,
    resetPassword
};
