const mongoose = require('mongoose');;
const Schema = mongoose.Schema;

let CommentSchema = require('../comments/CommentModel');

const TranslationSchema = new Schema({
    text: {
        type: String,
        required: [true, 'text field is required']
    },
    language: {
        type: String,
        required: [true, 'Language field is required']
    },
    dateCreated:{
        type: Date,
        default: Date.now,
        required: [true, 'dateCreated field is required']
    },
    userID:{
        type: String,
        required: [true, 'userID field is required']
    },
    comments: [CommentSchema]
});


const Translation = mongoose.model('translation', TranslationSchema);
module.exports = Translation;
module.exports = TranslationSchema;