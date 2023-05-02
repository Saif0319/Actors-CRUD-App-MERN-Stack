const userModel = require("../models/userModel");



const signupUser = async (req, res) => {
    res.json({message: "signup"});
};




const loginUser = async (req, res) => {
    res.json({message: "login"});
};






module.exports = {
    signupUser,
    loginUser
}