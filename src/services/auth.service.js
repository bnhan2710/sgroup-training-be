const pool = require('../configs/database');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken')
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
    }``
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


module.exports = {
    loginService,
    registerService,
};
