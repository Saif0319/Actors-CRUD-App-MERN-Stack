const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;



const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});



//Static signup method
userSchema.statics.signup = async function (email, password) {

    //validation
    if(!email || !password) {
        throw Error("All fields are required");
    }

    //Normalize email
    const normalizedEmail = validator.normalizeEmail(email);
    
    //check if email is valid
    if(!validator.isEmail(normalizedEmail)) {
        throw Error("Please enter a valid email");
    }

    const user_exists = await this.findOne({normalizedEmail}); 

    if(user_exists) {
        throw Error("Email already exists");
    }

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await this.create({email: normalizedEmail, password: hashedPass});

    return user;
}



//Login static function
userSchema.statics.login = async function (email, password) {

    //validation
    if(!email || !password) {
        throw Error("All fields are required");
    }


    const user_exists = await this.findOne({email}); 

    if(!user_exists) {
        throw Error("Email does not exist");
    }

    const match = await bcrypt.compare(password, user_exists.password);

    if(!match) {
        throw Error("Password is incorrect");
    }

    return user_exists; 


}


module.exports = mongoose.model("User", userSchema);