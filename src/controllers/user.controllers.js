const pool = require('../configs/database');

async function getAllUsers(req, res) {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.status(200).json(users[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function getUserById(req, res) {
    try {
        const id = req.params.id; 
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]); 

        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(users[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function createUser(req,res){
    
}
module.exports = {
    getAllUsers,
    getUserById
}