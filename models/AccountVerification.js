const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const generateAccountVerification = new Schema({

    email: {
        type: String,
        required: true
    },

    hashed_email: {
        type: String,
        required: true
    },

     verification_link: {
        type: String,
        required: true
     }

});


module.exports = mongoose.model("AccountVerification", generateAccountVerification);


