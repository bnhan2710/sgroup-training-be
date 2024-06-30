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

module.exports = {
  loginUser,
  registerUser,
};
