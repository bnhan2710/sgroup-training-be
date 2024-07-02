const authService = require("../services/auth.service");

const registerUser = async (req, res) => {
  try {
    const user = await authService.registerService(req.body);
    if (user.error) {
      return res.status(400).json({ message: user.error });
    }
    res.status(201).json({ message: "Registered successfully", user: user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const {refreshToken,accessToken,other} = await authService.loginService(req.body);
    if (other.error) {
      return res.status(400).json({ message: other.error });
    }
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
  });            
    res.status(200).json({ message: "Login successfuly!", accessToken,other });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const forgotPassword = async(req,res) =>{
  const {email} = req.body 
  if(!email){
    res.status(400).json({msg: "Please provide your email"})
  }
  try{
      await authService.forgotPassword(email)
    res.status(200).json({message: "Reset password link sent to your email"})
  }catch(err){
  console.error(err)
  res.status(500).json({message: "Internal server error"})
}
}

const resetPassword = async (req, res) => {
  const token = req.params.token;
  try {
    const result = await authService.resetPassword(token, req.body);

    if (result && result.err) {
      return res.status(400).json({ message: result.err });
    }
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword
};
