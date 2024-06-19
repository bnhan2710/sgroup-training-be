const pool = require('../configs/database');

async function loginService(loginData) {
    try {
        const { username, password } = loginData;
        if (!username || !password) {
            throw new Error("Username and password are required.");
        }
        
        const result = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        
        if (result.length > 0) {
            const user = result[0];
            delete user.password; 
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    loginService
};
