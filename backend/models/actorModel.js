const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const actorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    birthday: {
        type: Date,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Actor", actorSchema);;