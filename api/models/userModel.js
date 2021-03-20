require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'cannot be empty'],
        lowercase: true,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/,'is Invalid'],
    },
    email: {
        type: String,
        required: [true,'cannot be empty'],
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/,'is Invalid'],
    },
    phone: {
        type: String,
        required: true
    },
    image: String,
    gender: {
        type: String,
        enum: ['male','female']
    },
    isEmployer: {
        type: Boolean
    },
    hash: String,
    salt: String
},{timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'Is already taken.'});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password,this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function(password){
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

UserSchema.methods.generateJWT = function(){
    return jwt.sign({
        _id: this._id
    }, 
    process.env.SECRET,
    {
        expiresIn: '1D'
    });
};

UserSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    };
};

const User = mongoose.model('User', UserSchema);

module.exports = User;