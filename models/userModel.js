const mongoose = require('mongoose');
const db = require("../config/db");
const jwt = require('jsonwebtoken');


const schema = mongoose.Schema({
    firstname: {
        type: String,
        // allowNull: false
    },
    lastname: {
        type: String,
        // allowNull: false
    },
    email: {
        type: String,
        // allowNull: false
    },
    password :{
        type: String,
    },
    phoneno: {
        type: String,
        // allowNull: false
    },

    Task : [{database_name : String,
        database_username : String,
        database_pw : String , 
        Host : String,
        Table_name : String,
        File_name : String,
        query : String,
        File_location : String }],



    created_At: {
        type: Date,
        // field: 'created_at',
        default: Date.now
    },
    updatedAt: {
        type: Date,
        // field: 'updated_at',
        default: Date.now
    }
})

// User.prototype.getToken = function () {
//     return jwt.sign(
//         {
//             id: this.phoneno,
//             //email:this.email
//         },
//         process.env.JWT_SECRET,
//         {
//             expiresIn: process.env.JWT_EXPIRY,
//         }
//     );
// }


const User = mongoose.model('user', schema);

module.exports = User;