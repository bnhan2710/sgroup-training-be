const pool = require('../configs/database');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto  = require('crypto');
const mailService = require('../utils/mail.service');
require('dotenv').config()

let refreshTokens = [];

const registerService = async (user) => {
    const { gender, name, username, age, password, email } = user;
    const created_at = new Date();
    try {
        const [existingUser] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length !== 0) {
            return { error: 'Username already exists' };
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await pool.query(
            'INSERT INTO users (gender, name, username, age, password, email,CreatedAt) VALUES (?, ?, ?, ?, ?, ?,?)',
            [gender, name, username, age, hashedPassword, email,created_at]
        );
        const [newUser] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);


        const { PASSWORD,SALT,FORGET_PASSWORD_TOKEN,FORGET_PASSWORD_TOKEN_EXPIRATION,CreatedBy, ...other } = newUser[0];
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
        const accessToken =  await generateAccessToken(userInfo[0][0])
        const refreshToken = await generateRefreshToken(userInfo[0][0])

        refreshTokens.push(refreshToken)
        // console.log(refreshTokens)
            const { PASSWORD, SALT, FORGET_PASSWORD_TOKEN, FORGET_PASSWORD_TOKEN_EXPIRATION,CreatedBy,CreatedAt,...other } = userInfo[0][0];
            return { accessToken,refreshToken,other};
    } catch (error) {
        return { error: 'Login failed!'};
    }
};

const generateAccessToken = (user) => {

        return jwt.sign(
            { id: user.ID },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );
};



const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.ID,
        },
        process.env.SECRET_KEY,
        { expiresIn: "365d" }
    );
};


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

  const requestNewToken = async (refreshToken) => {
      try {  
          if (!refreshTokens.includes(refreshToken)) {
              return {
                  code: 403,
                  message: 'Refresh token not found'
              };
          }
          const user = await new Promise((resolve, reject) => {
              jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
                  if (err) {
                      reject({
                          code: 403,
                          message: 'Token not valid'
                      });
                  } else {
                      resolve(user);
                  }
              });
          });
          refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        
          const newAccessToken = generateAccessToken(user);
          const newRefreshToken = generateRefreshToken(user);
          refreshTokens.push(newRefreshToken);
          return {
              code: 200,
              message: {
                  newAccessToken,
                  newRefreshToken
              }
          };
      } catch (err) {
          if (err.code) {
              return err; 
          }
          console.log(err);
          return {
              code: 500,
              message: 'Request new token failed'
          };
      }
  };
  

const logoutService = async (refreshToken) => {
    refreshTokens = refreshTokens.filter((token) => { token !== refreshToken });
};


module.exports = {
    loginService,
    registerService,
    forgotPassword,
    resetPassword,
    requestNewToken,
    logoutService
};
