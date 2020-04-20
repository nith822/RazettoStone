const cookieParser = require('cookie-parser');
let auth = require('../auth');
const express = require ('express');
const router = express.Router();
const Post = require('./PostModel');
const User = require('../users/UserModel');
const Translation = require('./translations/TranslationModel')
var mongoose = require('mongoose');

exports.votePost = function (req, res, next){
    var errorMessage = '';
    // Checking for required parameters
    
    //Validate user will check to see if there is a valid user id, and whether the user Id and Oauth Id match
    errorMessage = errorMessage.concat(auth.validateUser(req));
    
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
            $addToSet: {upvotes: req.body.userID},
            $pull: {downvotes: req.body.userID}
        }).then(function(){
            console.log( req.body.userID+ ' upvoting post ' + req.params.post_id)
            res.send({"message": req.body.userID+ ' upvoted post ' + req.params.post_id})
        }
        )
    }else{
        Post.findByIdAndUpdate({_id:req.params.post_id},{
            $addToSet: {downvotes: req.body.userID},
            $pull: {upvotes: req.body.userID}
        }).then(function(){
            console.log( req.body.userID+ ' downvoting post ' + req.params.post_id)
            res.send({"message": req.body.userID+ ' downvoted post ' + req.params.post_id})
        }
        )
    }
}

exports.voteTranslation = function(req, res, next){
    var errorMessage = '';
    // Checking for required parameters
    
    //Validate user will check to see if there is a valid user id, and whether the user Id and Oauth Id match
    errorMessage = errorMessage.concat(auth.validateUser(req));
    
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
        console.log(req.body.userID+ ' upvoting transaltion ' + req.params.translation_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "translations._id" : req.params.translation_id},
        {$addToSet: {"translations.$.upvotes": req.body.userID},
            $pull: {"translations.$.downvotes": req.body.userID}}).then(function(){
                res.send({"message": req.body.userID+ ' upvoted transaltion ' + req.params.translation_id})
            })
    }else{
        console.log(req.body.userID+ ' downvoting transaltion ' + req.params.translation_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "translations._id" : req.params.translation_id},
        {$pull: {"translations.$.upvotes": req.body.userID},
            $addToSet: {"translations.$.downvotes": req.body.userID}}).then(function(){
                res.send({"message": req.body.userID+ ' downvoted transaltion ' + req.params.translation_id})
            })
    }
}

exports.votePostComment = function(req, res, next){
    console.log(req.body);
    var errorMessage = '';
    // Checking for required parameters
    
    //Validate user will check to see if there is a valid user id, and whether the user Id and Oauth Id match
    errorMessage = errorMessage.concat(auth.validateUser(req));
    
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
        console.log(req.body.userID+ ' upvoting post comment ' + req.params.comment_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "comments._id" : req.params.comment_id},
        {$addToSet: {"comments.$.upvotes": req.body.userID},
            $pull: {"comments.$.downvotes": req.body.userID}}).then(function(){
                res.send({"message": req.body.userID+ ' upvoted post comment ' + req.params.comment_id})
            })
    }else{
        console.log(req.body.userID+ ' downvoting post comment ' + req.params.comment_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "comments._id" : req.params.comment_id},
        {$pull: {"comments.$.upvotes": req.body.userID},
            $addToSet: {"comments.$.downvotes": req.body.userID}}).then(function(){
                res.send({"message": req.body.userID+ ' downvoted post comment ' + req.params.comment_id})
            })
    }
}

exports.voteTranslationComment = function(req,res,next){
    console.log('Attempting to add comment to post ' + req.params.post_id)
    var errorMessage = '';
    
    //Validate user will check to see if there is a valid user id, and whether the user Id and Oauth Id match
    errorMessage = errorMessage.concat(auth.validateUser(req));
    
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
        console.log(req.body.userID+ ' upvoting translation comment ' + req.params.comment_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "translations._id": req.params.translation_id},
        {$addToSet: {"translations.$[].comments.$[comment].upvotes": req.body.userID},
            $pull: {"translations.$[].comments.$[comment].downvotes": req.body.userID}}, { arrayFilters: [{ 'comment._id': req.params.comment_id }] }).then(function(){
                res.send({"message": req.body.userID+ ' upvoted translation comment ' + req.params.comment_id})
            })
    }else{
        console.log(req.body.userID+ ' downvoting translation comment ' + req.params.comment_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "translations._id": req.params.translation_id},
        {$pull: {"translations.$[].comments.$[comment].upvotes": req.body.userID},
            $addToSet: {"translations.$[].comments.$[comment].downvotes": req.body.userID}}, { arrayFilters: [{ 'comment._id': req.params.comment_id }] }).then(function(){
                res.send({"message": req.body.userID+ ' downvoted translation comment ' + req.params.comment_id})
            })
    }
}

exports.votePostCommentReply = function(req,res,next){
    var errorMessage = '';
    // Checking for required parameters
    //Validate user will check to see if there is a valid user id, and whether the user Id and Oauth Id match
    
    errorMessage = errorMessage.concat(auth.validateUser(req));
    
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
        console.log(req.body.userID+ ' upvoting post comment reply ' + req.params.reply_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "comments._id": req.params.comment_id},
        {$addToSet: {"comments.$[].replies.$[reply].upvotes": req.body.userID},
            $pull: {"comments.$[].replies.$[reply].downvotes": req.body.userID}}, { arrayFilters: [{ 'reply._id': req.params.reply_id }] }).then(function(){
                res.send({"message": req.body.userID+ ' upvoted post comment reply ' + req.params.comment_id})
            })
    }else{
        console.log(req.body.userID+ ' downvoting post comment reply ' + req.params.reply_id)
        Post.findOneAndUpdate({_id: req.params.post_id, "comments._id": req.params.comment_id},
        {$pull: {"comments.$[].replies.$[reply].upvotes": req.body.userID},
            $addToSet: {"comments.$[].replies.$[reply].downvotes": req.body.userID}}, { arrayFilters: [{ 'reply._id': req.params.reply_id }] }).then(function(){
                res.send({"message": req.body.userID+ ' downvoted post comment reply ' + req.params.comment_id})
            })

    }
}

exports.voteTranslationCommentReply = function(req,res,next){
    var errorMessage = '';
    // Checking for required parameters
    
    //Validate user will check to see if there is a valid user id, and whether the user Id and Oauth Id match
    errorMessage = errorMessage.concat(auth.validateUser(req));
    
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
        console.log(req.body.userID+ ' upvoting translation comment reply ' + req.params.reply_id)
        Post.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.post_id)},
        {$addToSet: {"translations.$[translation].comments.$[comment].replies.$[reply].upvotes": req.body.userID},
         $pull: {"translations.$[translation].comments.$[comment].replies.$[reply].downvotes": req.body.userID}},
        {arrayFilters: [{'translation._id': mongoose.Types.ObjectId(req.params.translation_id)},{'comment._id': mongoose.Types.ObjectId(req.params.comment_id)},
        { 'reply._id': mongoose.Types.ObjectId(req.params.reply_id) }]}).then(function(){
             res.send({"message": req.body.userID+ ' upvoted post comment reply ' + req.params.comment_id})
        })
    }else{
        console.log(req.body.userID+ ' downvoting translation comment reply ' + req.params.reply_id)
        Post.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.post_id)},
        {$pull: {"translations.$[translation].comments.$[comment].replies.$[reply].upvotes": req.body.userID},
         $addToSet: {"translations.$[translation].comments.$[comment].replies.$[reply].downvotes": req.body.userID}},
        {arrayFilters: [{'translation._id': mongoose.Types.ObjectId(req.params.translation_id)},{'comment._id': mongoose.Types.ObjectId(req.params.comment_id)},
        { 'reply._id': mongoose.Types.ObjectId(req.params.reply_id) }]}).then(function(){
             res.send({"message": req.body.userID+ ' downvoted post comment reply ' + req.params.comment_id})
        })
    }
}

