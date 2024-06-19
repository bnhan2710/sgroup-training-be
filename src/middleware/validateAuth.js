function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
    return usernameRegex.test(username);
  }

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }

function validateLogin(req,res,next){
    const {username,password} = req.body;
    if(!username || !password){
        res.status(400).json({message: 'Missing required fields: username, password'});
    }
    if(!validateUsername(username)){
        res.status(400).json({message: 'Invalid username'});
    }
    if(!validatePassword(password)){
        res.status(400).json({message: 'Invalid password'});
    }
    next();
}

module.exports = validateLogin;