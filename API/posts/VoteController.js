const cookieParser = require('cookie-parser');
let GetCookie = require('../GetCookie');
const express = require ('express');
const router = express.Router();
const Post = require('./PostModel');
const User = require('../users/UserModel');
const Translation = require('./translations/TranslationModel')
var mongoose = require('mongoose');

exports.votePost = function (req, res, next){
    var errorMessage = '';
    // Checking for required parameters
    

    if (req.body.vote == undefined)
    {
        console.log('Request did not have vote');
        errorMessage = errorMessage.concat('Need vote. ');
    }
    if (errorMessage.length)
    {
        res.status(422).json({
            message: errorMessage,
            status: 'failed'
        })
        return res;
    }
    // Resetting error message for future use
    errorMessage = '';
    if (req.body.vote == true){
        Post.findByIdAndUpdate({_id:req.params.post_id},{
            $addToSet: {upvotes: GetCookie.UID(req)},
            $pull: {downvotes: GetCookie.UID(req)}
        }).then(function(){
            console.log( GetCookie.UID(req)+ ' upvoting post ' + req.params.post_id)
            res.send({"message": GetCookie.UID(req)+ ' upvoted post ' + req.params.post_id})
        }
        )
    }else{
        Post.findByIdAndUpdate({_id:req.params.post_id},{
            $addToSet: {downvotes: GetCookie.UID(req)},
            $pull: {upvotes: GetCookie.UID(req)}
        }).then(function(){
            console.log( GetCookie.UID(req)+ ' downvoting post ' + req.params.post_id)
            res.send({"message": GetCookie.UID(req)+ ' downvoted post ' + req.params.post_id})
        }
        )
    }
}

exports.voteTranslation = function(req, res, next){
    var errorMessage = '';
    // Checking for required parameters
    
    
    
    if (req.body.vote == undefined)
    {
        console.log('Request did not have vote');
        errorMessage = errorMessage.concat('Need vote. ');
    }
    if (errorMessage.length)
    {
        res.status(422).json({
            message: errorMessage,
            status: 'failed'
        })
        return res;
    }
    // Resetting error message for future use
    errorMessage = '';
    if (req.body.vote == true){
        console.log(GetCookie.UID(req)+ ' upvoting transaltion ' + req.params.translation_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "translations._id" : req.params.translation_id},
        {$addToSet: {"translations.$.upvotes": GetCookie.UID(req)},
            $pull: {"translations.$.downvotes": GetCookie.UID(req)}}).then(function(){
                res.send({"message": GetCookie.UID(req)+ ' upvoted translation ' + req.params.translation_id})
            })
    }else{
        console.log(GetCookie.UID(req)+ ' downvoting transaltion ' + req.params.translation_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "translations._id" : req.params.translation_id},
        {$pull: {"translations.$.upvotes": GetCookie.UID(req)},
            $addToSet: {"translations.$.downvotes": GetCookie.UID(req)}}).then(function(){
                res.send({"message": GetCookie.UID(req)+ ' downvoted translation ' + req.params.translation_id})
            })
    }
}

exports.votePostComment = function(req, res, next){
    console.log(req.body);
    var errorMessage = '';
    // Checking for required parameters
    
    
    if (req.body.vote == undefined)
    {
        console.log('Request did not have vote');
        errorMessage = errorMessage.concat('Need vote. ');
    }
    if (errorMessage.length)
    {
        res.status(422).json({
            message: errorMessage,
            status: 'failed'
        })
        return res;
    }
    // Resetting error message for future use
    errorMessage = '';
    if (req.body.vote == true){
        console.log(GetCookie.UID(req)+ ' upvoting post comment ' + req.params.comment_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "comments._id" : req.params.comment_id},
        {$addToSet: {"comments.$.upvotes": GetCookie.UID(req)},
            $pull: {"comments.$.downvotes": GetCookie.UID(req)}}).then(function(){
                res.send({"message": GetCookie.UID(req)+ ' upvoted post comment ' + req.params.comment_id})
            })
    }else{
        console.log(GetCookie.UID(req)+ ' downvoting post comment ' + req.params.comment_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "comments._id" : req.params.comment_id},
        {$pull: {"comments.$.upvotes": GetCookie.UID(req)},
            $addToSet: {"comments.$.downvotes": GetCookie.UID(req)}}).then(function(){
                res.send({"message": GetCookie.UID(req)+ ' downvoted post comment ' + req.params.comment_id})
            })
    }
}

exports.voteTranslationComment = function(req,res,next){
    console.log('Attempting to add comment to post ' + req.params.post_id)
    var errorMessage = '';
    
    
    if (req.body.vote == undefined)
    {
        console.log('Request did not have vote');
        errorMessage = errorMessage.concat('Need vote. ');
    }
    if (errorMessage.length)
    {
        res.status(422).json({
            message: errorMessage,
            status: 'failed'
        })
        return res;
    }
    // Resetting error message for future use
    errorMessage = '';
    if (req.body.vote == true){
        console.log(GetCookie.UID(req)+ ' upvoting translation comment ' + req.params.comment_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "translations._id": req.params.translation_id},
        {$addToSet: {"translations.$[].comments.$[comment].upvotes": GetCookie.UID(req)},
            $pull: {"translations.$[].comments.$[comment].downvotes": GetCookie.UID(req)}}, { arrayFilters: [{ 'comment._id': req.params.comment_id }] }).then(function(){
                res.send({"message": GetCookie.UID(req)+ ' upvoted translation comment ' + req.params.comment_id})
            })
    }else{
        console.log(GetCookie.UID(req)+ ' downvoting translation comment ' + req.params.comment_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "translations._id": req.params.translation_id},
        {$pull: {"translations.$[].comments.$[comment].upvotes": GetCookie.UID(req)},
            $addToSet: {"translations.$[].comments.$[comment].downvotes": GetCookie.UID(req)}}, { arrayFilters: [{ 'comment._id': req.params.comment_id }] }).then(function(){
                res.send({"message": GetCookie.UID(req)+ ' downvoted translation comment ' + req.params.comment_id})
            })
    }
}

exports.votePostCommentReply = function(req,res,next){
    var errorMessage = '';
    // Checking for required parameters
    
    if (req.body.vote == undefined)
    {
        console.log('Request did not have vote');
        errorMessage = errorMessage.concat('Need vote. ');
    }
    if (errorMessage.length)
    {
        res.status(422).json({
            message: errorMessage,
            status: 'failed'
        })
        return res;
    }
    // Resetting error message for future use
    errorMessage = '';
    if (req.body.vote == true){
        console.log(GetCookie.UID(req)+ ' upvoting post comment reply ' + req.params.reply_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "comments._id": req.params.comment_id},
        {$addToSet: {"comments.$[].replies.$[reply].upvotes": GetCookie.UID(req)},
            $pull: {"comments.$[].replies.$[reply].downvotes": GetCookie.UID(req)}}, { arrayFilters: [{ 'reply._id': req.params.reply_id }] }).then(function(){
                res.send({"message": GetCookie.UID(req)+ ' upvoted post comment reply ' + req.params.comment_id})
            })
    }else{
        console.log(GetCookie.UID(req)+ ' downvoting post comment reply ' + req.params.reply_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "comments._id": req.params.comment_id},
        {$pull: {"comments.$[].replies.$[reply].upvotes": GetCookie.UID(req)},
            $addToSet: {"comments.$[].replies.$[reply].downvotes": GetCookie.UID(req)}}, { arrayFilters: [{ 'reply._id': req.params.reply_id }] }).then(function(){
                res.send({"message": GetCookie.UID(req)+ ' downvoted post comment reply ' + req.params.comment_id})
            })

    }
}

exports.voteTranslationCommentReply = function(req,res,next){
    var errorMessage = '';
    // Checking for required parameters
    
    
    if (req.body.vote == undefined)
    {
        console.log('Request did not have vote');
        errorMessage = errorMessage.concat('Need vote. ');
    }
    if (errorMessage.length)
    {
        res.status(422).json({
            message: errorMessage,
            status: 'failed'
        })
        return res;
    }
    // Resetting error message for future use
    errorMessage = '';
    if (req.body.vote == true){
        console.log(GetCookie.UID(req)+ ' upvoting translation comment reply ' + req.params.reply_id)
        Post.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.post_id)},
        {$addToSet: {"translations.$[translation].comments.$[comment].replies.$[reply].upvotes": GetCookie.UID(req)},
         $pull: {"translations.$[translation].comments.$[comment].replies.$[reply].downvotes": GetCookie.UID(req)}},
        {arrayFilters: [{'translation._id': mongoose.Types.ObjectId(req.params.translation_id)},{'comment._id': mongoose.Types.ObjectId(req.params.comment_id)},
        { 'reply._id': mongoose.Types.ObjectId(req.params.reply_id) }]}).then(function(){
             res.send({"message": GetCookie.UID(req)+ ' upvoted post comment reply ' + req.params.comment_id})
        })
    }else{
        console.log(GetCookie.UID(req)+ ' downvoting translation comment reply ' + req.params.reply_id)
        Post.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.post_id)},
        {$pull: {"translations.$[translation].comments.$[comment].replies.$[reply].upvotes": GetCookie.UID(req)},
         $addToSet: {"translations.$[translation].comments.$[comment].replies.$[reply].downvotes": GetCookie.UID(req)}},
        {arrayFilters: [{'translation._id': mongoose.Types.ObjectId(req.params.translation_id)},{'comment._id': mongoose.Types.ObjectId(req.params.comment_id)},
        { 'reply._id': mongoose.Types.ObjectId(req.params.reply_id) }]}).then(function(){
             res.send({"message": GetCookie.UID(req)+ ' downvoted post comment reply ' + req.params.comment_id})
        })
    }
}

