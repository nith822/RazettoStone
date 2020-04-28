const cookieParser = require('cookie-parser');
let GetCookie = require('../GetCookie');
const express = require ('express');
const router = express.Router();
const Post = require('./PostModel');
const User = require('../users/UserModel');
const Translation = require('./translations/TranslationModel')
var mongoose = require('mongoose');


// constant for max length
const maxLanguageLength = 20;
const maxCommentLength = 300;

exports.commentOnPost = function(req,res,next){
    console.log('Attempting to add comment to post ' + req.params.post_id)
    var errorMessage = '';
    // Checking for required parameters
    
    if (req.body.language == undefined || !req.body.language.trim())
    {
        console.log('Request did not have language');
        errorMessage = errorMessage.concat('Need language. ');
    }
    if (req.body.text == undefined || !req.body.text.trim())
    {
        console.log('Request did not have text');
        errorMessage = errorMessage.concat('Need text. ');
    }
    // check for max length
    if(req.body.text.length > maxCommentLength){
        console.log('Text is longer than max length');
        errorMessage = errorMessage.concat('Text too long. ');
    }
    if(req.body.language.length > maxLanguageLength){
        console.log('Language is longer than max length');
        errorMessage = errorMessage.concat('Language too long. ');
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
    Post.findByIdAndUpdate({_id:req.params.post_id}, {$push: {comments: {
        text: req.body.text,
        textLanguage: req.body.language,
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        userID: GetCookie.UID(req),
        upvotes: [GetCookie.UID(req)],
        downvotes: [],
        }}}).then(function(){
        Post.findOne({_id: req.params.post_id}).then(function(post){
            res.send(post);
        });
    }).catch(next);
}

exports.commentOnTranslation = function(req,res,next){
    console.log(req.params)
    console.log('Attempting to add comment to translation ' + req.params.translation_id)
    console.log('Attempting to add comment to post ' + req.params.post_id)
    var errorMessage = '';
    // Checking for required parameters
    
    
    
    if (req.body.language == undefined || !req.body.language.trim())
    {
        console.log('Request did not have language');
        errorMessage = errorMessage.concat('Need language. ');
    }
    if (req.body.text == undefined || !req.body.text.trim())
    {
        console.log('Request did not have text');
        errorMessage = errorMessage.concat('Need text. ');
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
    Post.findOneAndUpdate({_id: req.params.post_id, "translations._id" : req.params.translation_id},
    {$push: {"translations.$.comments": {
        text: req.body.text,
        textLanguage: req.body.language,
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        userID: GetCookie.UID(req),
        upvotes: [GetCookie.UID(req)],
        downvotes: [],
        }}}).then(function(){
            Post.findOne({_id: req.params.post_id}).then(function(post){
                res.send(post);
            })
        }).catch(next)
}

exports.replyToPostComment = function(req,res,next){
    console.log("Replying to post comment " + req.params.comment_id)
    var errorMessage = '';
    // Checking for required parameters
    
    
    if (req.body.language == undefined || !req.body.language.trim())
    {
        console.log('Request did not have language');
        errorMessage = errorMessage.concat('Need language. ');
    }
    if (req.body.text == undefined || !req.body.text.trim())
    {
        console.log('Request did not have text');
        errorMessage = errorMessage.concat('Need text. ');
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
    Post.findOneAndUpdate({_id: req.params.post_id, "comments._id": req.params.comment_id},
    {$push: {"comments.$.replies":{
        text: req.body.text,
        textLanguage: req.body.language,
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        userID: GetCookie.UID(req),
        upvotes: [GetCookie.UID(req)],
        downvotes: []
    }}
        }).then(function(){
            Post.findOne({_id: req.params.post_id}).then(function(post){
                res.send(post);
            })
        }).catch(next)
}

exports.replyToTranslationComment = function(req,res,next){
    var errorMessage = '';
    // Checking for required parameters
    
    
    if (req.body.language == undefined || !req.body.language.trim())
    {
        console.log('Request did not have language');
        errorMessage = errorMessage.concat('Need language. ');
    }
    if (req.body.text == undefined || !req.body.text.trim())
    {
        console.log('Request did not have text');
        errorMessage = errorMessage.concat('Need text. ');
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
   Post.findOneAndUpdate({_id: req.params.post_id, "translations._id": req.params.translation_id},
   {$push: {"translations.$[].comments.$[comment].replies": {
    text: req.body.text,
    textLanguage: req.body.language,
    dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
    userID: GetCookie.UID(req),
    upvotes: [GetCookie.UID(req)],
    downvotes: []
}}}, { arrayFilters: [{ 'comment._id': req.params.comment_id }] }).then(function(){
    Post.findOne({_id: req.params.post_id}).then(function(post){
        res.send(post);
    })
       }).catch(next)
}
