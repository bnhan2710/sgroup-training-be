const { log } = require("handlebars");
const authService = require("../../services/auth.service");

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
    const {accessToken,refreshToken,other,error} = await authService.loginService(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }        

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
  });

    res.status(200).json({ message: "Login successfuly!", accessToken});
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const requestNewToken = async(req,res) =>{
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
      return res.status(400).json({message: "Please login first"})
    }
    try{
        const token = await authService.requestNewToken(refreshToken)
        if(!token) return res.status(400).json({message: "Invalid refresh token"})
          console.log(token.message)
     const newAccessToken = token.message.newAccessToken
     const newRefreshToken = token.message.newRefreshToken
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
      });

      res.status(token.code).json({
        message: "Token refreshed successfully",
        accessToken: newAccessToken
      })
      
    }catch(err){
      res.status(500).json({ message: "Internal server error" });
    }
}

const logoutUser = async (req, res) => {
    try{
      res.clearCookie("refreshToken");
      await authService.logoutService(req.cookies.refreshToken)
      res.status(200).json({ message: "Logged out successfully" });

    }catch(err){
      res.status(500).json({ message: "Internal server error" })
    }
}

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
  resetPassword,
  requestNewToken,
  logoutUser
};
