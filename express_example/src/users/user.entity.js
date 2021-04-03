const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const util = require('../commons/util');

const roles = [util.ADMIN_ROL, util.CUSTOMER_ROLE];
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength:4
    },

    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: roles,
        default:roles[0]
    },

    loginAttempts: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    
    isLocked: {
        type: Boolean,
        default:false
    }

   
}, { collection: 'users' });

schema.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
})



module.exports = mongoose.model('User', schema);