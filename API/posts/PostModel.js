const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema = require('./comments/CommentModel');
let TranslationSchema = require('./translations/TranslationModel');

/*
const RepliesSchema = new Schema({
    text: {
        type: String,
        required: [true, 'text field is required']
    },
    userID:{
        type: String,
        required: [true, 'userID field is required']
    },
    dateCreated:{
        type: Date,
        default: Date.now,
        required: [true, 'dateCreated field is required']
    }
    //replies: [RepliesSchema]
});
*/

const PostSchema = new Schema({
    originalText: {
        type: String,
        required: [true, 'originalText field is required']
    },
    language: {
        type: String,
        required: [true, 'Language field is required']
    },
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    userID:{
        type: String,
        required: [true, 'userID field is required']
    },
    dateCreated:{
        type: Date,
        default: Date.now,
        required: [true, 'dateCreated field is required']
    },
    upvotes:{
        type: [String],
        required: [true, 'upvotes field is required']
    },
    downvotes:{
        type: [String],
        required: [true, 'downvotes field is required']     
    },
    tags:{
        type: [String],
        required: [true, 'tags field is required']          //if there is no tag just input empty array, []
    },
    comments: [CommentSchema],
    translations: [TranslationSchema]
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;