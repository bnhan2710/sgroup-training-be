const userService = require('../../services/user.service');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}


const getUserById = async(req, res) => {
    try{
        const id = req.params.id;
        const user = await userService.getUserById(id);
        if(user){
            res.status(200).json(user);
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Internal server error"});
    }
}

const createUser = async(req, res) => {
    try {
        userService.createUser(req.body);
        res.status(200).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateUser = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await userService.updateUser(id, req.body);
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({message: "User not found"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteUser = async(req, res) =>{
    try {
        const id = req.params.id;
        const user = await userService.deleteUser(id);
        if(!user){
          return res.status(404).json({message: "User not found"});
        }
       return res.status(200).json({message: "User deleted successfully"});
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}