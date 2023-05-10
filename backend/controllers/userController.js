const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");


// Create a token
const createToken = (_id) => {
  const token = jwt.sign({_id}, process.env.SECRET, {expiresIn: "1d"});

  return token;
}


const signupUser = async (req, res) => {
    const {email, password} = req.body;
  
    try {
      const user = await userModel.signup(email, password);
      const token = await createToken(user._id);
  
      res.status(200).json({email, token});
    } catch (error) {
      console.log(error);
      res.status(400).json({error: error.message});
    }
  };




const loginUser = async (req, res) => {
    //START FROM HERE
    const {email, password} = req.body;

    try {
      const user = await userModel.login(email, password);
      const token = createToken(user._id);

      res.status(200).json({email, token});
    } catch (error) {
      res.status(400).json({error: error.message});
    }
};






module.exports = {
    signupUser,
    loginUser
}