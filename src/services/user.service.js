const pool = require('../configs/database');

const getAllUsers = async () =>{
    try {
        const users = await pool.query('SELECT * FROM users');
       return users[0];
    }catch(error) {
        console.error(error);
        return;
    }
}

const getUserById = async (id) =>{
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (users.length === 0) {
            return { message: 'User not found' };
        }
        return users[0];
    }catch(error) {
        console.error(error);
        return;
    }
}

const createUser = async (user) =>{
    const { gender, name, username, age, password, email } = user; 

    try {
        const insertQuery = `
            INSERT INTO users (gender, name, username, age, password, email)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        await pool.query(insertQuery, [gender, name, username, age, password, email]);
        const [users] = await pool.query('SELECT * FROM users WHERE useranme = ?', [username]); 
        return users[0];
    } catch (err){
        console.error(err);
        return;
    }
}

const updateUser = async (id, user) =>{
    const { gender, name, username, age, password, email } = user; 
    const updateQuerry =`
    UPDATE users 
    SET gender = ?, name = ?, username = ?, age = ?, password = ?, email = ?
    WHERE id = ?  
    `;
    try {
        await pool.query(updateQuerry,[gender, name, username, age, password, email, id]);
    }catch(error){
         console.error(error);
         return;
    }
    }
    
const deleteUser = async (id) =>{
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (users.length === 0) {
            return { message: 'User not found' };
        }
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return { message: 'User deleted successfully' };
    }catch(error) {
        console.error(error);
        return;
    }}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}