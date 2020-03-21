const mongoose = require('mongoose');;
const Schema = mongoose.Schema;

let CommentSchema = require('../comments/CommentModel');

const TranslationSchema = new Schema({
	title: {
        type: String,
        required: [true, 'title field is required']
    },
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
    upvotes:{
        type: [String],
        required: [true, 'upvotes field is required']
    },
    downvotes:{
        type: [String],
        required: [true, 'downvotes field is required']     
    },
    comments: [CommentSchema]
});


const Translation = mongoose.model('translation', TranslationSchema);
module.exports = Translation;
module.exports = TranslationSchema;
