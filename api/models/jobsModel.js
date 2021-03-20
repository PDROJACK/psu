require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

var JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    employer:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: [Number],
        index: { type: '2dsphere', sparse: true }
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    description:{
        type: String
    },
    employees: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    requirment: {
        type: Boolean,
        default: false
    },
    images: {
        type: [String],
        default: []
    },
    budget: {
        type: Number,
        required: true,
        default: 0
    },
    code: {
        type: Number
    }
},{ timestamps: true });

JobSchema.methods.generateCode = function(){
    this.code = Math.floor(Math.random()*9000) + 1000;
}
module.exports=mongoose.model('Jobs', JobSchema);

