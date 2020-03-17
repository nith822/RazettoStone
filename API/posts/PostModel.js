const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
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
        required: [true, 'dateCreated field is required']
    },
    //replies:[RepliesSchema]
});

// TODO add schema for flags
const FlagSchema = new Schema({

});

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
        required: [true, 'tags field is required']          //do we require each post to have at least one tag?
    },
    comments: [CommentSchema],
    flags: [FlagSchema],
    translations: [TranslationSchema]
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;