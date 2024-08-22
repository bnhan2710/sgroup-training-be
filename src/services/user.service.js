const { SELECT } = require('sequelize/lib/query-types');
const pool = require('../configs/database');
const ErrorResponse = require('../utils/error.response');

const getAllUsers = async () =>{
        const users = await pool.query('SELECT * FROM users');
        return users[0];
}

const getUserById = async (id) =>{
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (users.length === 0) {
            throw new ErrorResponse(404,'User Not Found')
        }
        return users[0];
}

const createUser = async (user) =>{
    const { gender, name, username, age, password, email } = user; 

       const checkUserExits = await pool.query('SELECT * FROM users WHERE username = ?', [username])
        if(checkUserExits.length!==0){
            throw new ErrorResponse(400,'Username Already Exits')
        }
        const insertQuery = `
            INSERT INTO users (gender, name, username, age, password, email)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        await pool.query(insertQuery, [gender, name, username, age, password, email]);
        return {
            message: 'Created successfully'
        }
}

const updateUser = async (id, user) =>{
    const { gender, name, age, password, email } = user; 
    const checkUserExits = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    if(!checkUserExits){
        throw new ErrorResponse(404, 'Not Found User ')
    }
    const updateQuerry =`
    UPDATE users 
    SET gender = ?, name = ?, age = ?, password = ?, email = ?
    WHERE id = ?  
    `;
        await pool.query(updateQuerry,[gender, name, age, password, email, id]);
    return {
        message: 'Update successfully'
    }
    }
    
const deleteUser = async (id) =>{
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (users.length === 0) {
            throw new ErrorResponse(404, 'Not Found User')
        }
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return { message: 'User deleted successfully'};
    }

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}