require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Jobs'
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    status: {
        type: String,
        enum: ['accepted','rejected','pending'],
        default: 'pending'
    },
    comment: {
        type: String
    }
},{timestamps: true});


module.exports = mongoose.model('Applications',ApplicationSchema);