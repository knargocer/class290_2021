const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {ROLES} = require('../commons/util');

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
        enum: [ROLES.ADMIN,ROLES.CUSTOMER],
        default:ROLES.CUSTOMER
    },

    loginAttempts: { 
        type: Number, 
        required: true, 
        default: 1 
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