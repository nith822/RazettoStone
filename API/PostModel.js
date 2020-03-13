const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    text: {
        type: String,
        required: [true, 'text field is required']
    },
    user_id:{
        type: String,
        required: [true, 'user_id field is required']
    },
    created_date:{
        type: Date,
        required: [true, 'created_date field is required']
    },
    replies:[RepliesSchema]
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
    created_date:{
        type: Date,
        default: Date.now,
        required: [true, 'created_date field is required']
    },
    user_id:{
        type: String,
        required: [true, 'user_id field is required']
    },
    comments: [CommentSchema]
});

const RepliesSchema = new Schema({
    text: {
        type: String,
        required: [true, 'text field is required']
    },
    user_id:{
        type: String,
        required: [true, 'user_id field is required']
    },
    created_date:{
        type: Date,
        default: Date.now,
        required: [true, 'created_date field is required']
    },
    replies: [RepliesSchema]
});

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    language: {
        type: String,
        required: [true, 'Language field is required']
    },
    original_text: {
        type: String,
        required: [true, 'original_text field is required']
    },
    user_id:{
        type: String,
        required: [true, 'user_id field is required']
    },
    created_date:{
        type: Date,
        default: Date.now,
        required: [true, 'created_date field is required']
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