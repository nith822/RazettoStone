const cookieParser = require('cookie-parser');
let GetCookie = require('../GetCookie');
const express = require ('express');
const router = express.Router();
const Post = require('./PostModel');
const User = require('../users/UserModel');
const Utility = require('../utility/Utility');
const Translation = require('./translations/TranslationModel');
const mongoose = require('mongoose');


// constant for max length
const maxLanguageLength = 20;
const maxCommentLength = 300;

exports.commentOnPost = function(req,res,next){
    console.log('Attempting to add comment to post ' + req.params.post_id)
    var errorMessage = '';
    // Checking for required parameters
    
    if (req.body.textLanguage == undefined || !req.body.textLanguage.trim())
    {
        console.log('Request did not have textLanguage');
        errorMessage = errorMessage.concat('Need textLanguage. ');
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
    if(req.body.textLanguage.length > maxLanguageLength){
        console.log('textLanguage is longer than max length');
        errorMessage = errorMessage.concat('textLanguage too long. ');
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
        textLanguage: req.body.textLanguage,
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
    
    
    
    if (req.body.textLanguage == undefined || !req.body.textLanguage.trim())
    {
        console.log('Request did not have textLanguage');
        errorMessage = errorMessage.concat('Need textLanguage. ');
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
        textLanguage: req.body.textLanguage,
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
    
    
    if (req.body.textLanguage == undefined || !req.body.textLanguage.trim())
    {
        console.log('Request did not have textLanguage');
        errorMessage = errorMessage.concat('Need textLanguage. ');
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
        textLanguage: req.body.textLanguage,
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
    
    
    if (req.body.textLanguage == undefined || !req.body.textLanguage.trim())
    {
        console.log('Request did not have textLanguage');
        errorMessage = errorMessage.concat('Need textLanguage. ');
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
    textLanguage: req.body.textLanguage,
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


exports.listPostComments = function(req, res, next) {
    console.log('AAAAAAAAAAAAttempting to get post comments ' + req.params.post_id)
    let errorMessage = '';

    Post.findOne({_id: req.params.post_id}).then(async function(post){
	for (let i = 0; i < post.comments.length; i++) {
            try {
                let userObjectId = mongoose.Types.ObjectId(post.comments[i].userID);
                console.log('userId from comment: ' + userObjectId);
        
                post.comments[i].user_object = await User.findById(userObjectId, 'userName dateCreated languages');
            } catch (exception) {
                console.log('That comment probably did not have a real user ID');
                console.log(exception);
            }
            console.log(post.comments[i].user_object)
        }
        console.log('outta for loop')
        res.send(post.comments)
    }).catch(next);
};

exports.listTranslationComments = function(req, res, next) {
    console.log('Attempting to get translation comments ' + req.params.translation_id)
    let errorMessage = '';
    Post.aggregate([
        { $match : { _id: mongoose.Types.ObjectId(req.params.post_id)}},
        { $project : {
            _id: false,
            translation: {
                $filter:{
                    "input": "$translations",
                    "as": "translation",
                    "cond": {"$eq":["$$translation._id", mongoose.Types.ObjectId(req.params.translation_id)]}
                }
            }
          }
        }
    ]).then(function(post){
        if (post.length > 0 && post[0].translation.length > 0) {
	    for (let i = 0; i < post[0].translation[0].comments.length; i++) {
                try {
                    userObjectId = mongoose.Types.ObjectId(post[0].translation[0].comments[i].userID);
                    console.log(userObjectId);

                    post[0].translation[0].comments[i]['user_object'] = Utility.retrieveUserById(userObjectId, 'userName dateCreated languages');
		    console.log('vroomz!');
		    console.log(post[0].translation[0].comment[i]['user_object']);
                } catch (exception) {
                    console.log('That comment probably did not have a real user ID');
                    console.log(exception);
                }
            }

            res.send(post[0].translation[0].comments);
	} else {
	    // That post probably didn't have any translations
	    res.send([]);
	}
    }).catch(next);
};
