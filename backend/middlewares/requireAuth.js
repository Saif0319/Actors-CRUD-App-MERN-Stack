const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).json({error: "Authorization required"});
    }


    try {
        const decoded = jwt.verify(authorization.split(" ")[1], process.env.SECRET); //this returns the payload
        req.user = await userModel.findOne({_id: decoded._id}).select("_id");
        next();

    } catch (error) {
        return res.status(401).json({ error: 'Authorization required' });
    } 
}


module.exports = requireAuth;