const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// TODO add schema for comments
const CommentSchema = new Schema({

});

// TODO add schema for flags
const FlagSchema = new Schema({

});

// TODO add schema for translations
const TranslationSchema = new Schema({

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
        required: [true, 'tags field is required']
    },
    comments: [CommentSchema],
    flags: [FlagSchema],
    translations: [TranslationSchema]
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;