const userService = require('../../services/user.service');

const getAllUsers = async (req, res) => {
        const users = await userService.getAllUsers();
        res.send(users)
}

const getUserById = async(req, res) => {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        res.send(user)
    }

const createUser = async(req, res) => {
       const created = await userService.createUser(req.body);
        res.send(created)
}

const updateUser = async(req, res) => {
    const id = req.params.id;
    const update = await userService.updateUser(id, req.body);
    res.send(update)
}

const deleteUser = async(req, res) =>{
        const id = req.params.id;
        const user = await userService.deleteUser(id);
        res.send(user)
}
    
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}