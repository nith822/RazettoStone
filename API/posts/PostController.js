const cookieParser = require('cookie-parser'); 
let auth = require('../auth');
const express = require ('express');
const router = express.Router();
const Post = require('./PostModel');
const User = require('../users/UserModel');
const Translation = require('./translations/TranslationModel')
var mongoose = require('mongoose');

// create new post
exports.create = async function (req, res, next) {

    // this might also work isntead of the code above
    console.log('Attempting to create new post')
    console.log(req.body)
    
    var errorMessage = '';
    // Checking for required parameters
    if (req.body.title == undefined || !req.body.title.trim())
    {
        console.log('Request did not have title');
        errorMessage = errorMessage.concat('Need title. ');
    }
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
    
    //Validate user will check to see if there is a valid user id, and whether the user Id and Oauth Id match
    errorMessage = errorMessage.concat(await auth.validateUser(req));
    
    if (req.body.tags == undefined || !Array.isArray(req.body.tags) || !req.body.tags.length)
    {
        console.log('Request did not have tags');
        errorMessage = errorMessage.concat('Need tags. ');
    }
    if (errorMessage.length)
    {
        console.log(errorMessage);
        res.status(422).json({
            message: errorMessage,
            status: 'failed'
        })
        return res;
    }
    // Resetting error message for future use
    errorMessage = '';

    var newPost = new Post({
        title: req.body.title,
        language: req.body.language,
        text: req.body.text,
        userID: req.body.userID,
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        upvotes: [req.body.userID],                             // are we going to make the poster auto upvote their post?
        downvotes: [],  // on creation there shouldn't be any downvotes
        //tags: req.body.tags,                                   // tags might be not required
        // on creation will not have comments, flags
        // it might be easier to just create a post with no translation then have the user
        // to add translation once the post is created.
        translations: req.body.translations,
        tags: req.body.tags
    });

    Post.create(newPost).then(function(post){
        res.send({message: "success!",
                  data: post })
    }).catch(next);
};

// TODO: project out comments
// view post by id
exports.view = function (req, res, next) {
    console.log('Attempting to retrieve post from DB')
    Post.findById(req.params.post_id).then(function(post){
    // temp fix there is probably a better way to do this
       var temp = {
       _id: post._id,
       upvotes: post.upvotes,
       downvotes: post.downvotes,
       tags: post.tags,
       title: post.title,
       language: post.language,
       text: post.text,
       userID: post.userID,
       dateCreated: post.dateCreated
       }
       res.send({message: "success!", data: temp })    }).catch(next)
};



exports.addTranslation = async function (req, res, next){
    console.log(req.params)
    console.log('Attempting to add translation to post ' + req.params.post_id)
    
    var errorMessage = '';
    // Checking for required parameters
    if (req.body.title == undefined || !req.body.title.trim())
    {
        console.log('Request did not have title');
        errorMessage = errorMessage.concat('Need title. ');
    }
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
    //Validate user will check to see if there is a valid user id, and whether the user Id and Oauth Id match
    errorMessage = errorMessage.concat(await auth.validateUser(req));

    if (req.body.tags == undefined || !Array.isArray(req.body.tags) || !req.body.tags.length)
    {
        console.log('Request did not have tags');
        errorMessage = errorMessage.concat('Need tags. ');
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

    Post.findByIdAndUpdate({_id:req.params.post_id}, {$push: {translations: {
        text: req.body.text,
        title: req.body.title,
        language: req.body.language,
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        userID: req.body.userID,
        upvotes: [req.body.userID],
        downvotes: [],
        comments: []}}}).then(function(){
        Post.findOne({_id: req.params.post_id}).then(function(post){
            res.send(post);
        });
    }).catch(next);
}

exports.search = function (req, res, next){
    console.log(req.params)
    console.log('Attempting search' + req.params.search_string)
    
    Post.find( { $text: { $search: "\"" + req.params.search_string + "\""}}).then(function(posts){
        res.send({message: "success!",
                  data: posts })
    }).catch(next)
}

// need to check if duplicate
exports.flagTranslation = async function(req,res,next){
    console.log(req.params)
    console.log('Attempting to add comment to translation ' + req.params.translation_id)
    var errorMessage = '';
    // Checking for required parameters
    
    
    //Validate user will check to see if there is a valid user id, and whether the user Id and Oauth Id match
    errorMessage = errorMessage.concat(await auth.validateUser(req));

    // add more check
    if (req.body.flag == undefined)
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
    Post.findOneAndUpdate({_id: req.params.post_id, "translations._id" : req.params.translation_id},
    {$addToSet: {"translations.$.flags": {
        userID: req.body.userID,
        flag: req.body.flag
        }}}).then(function(){
            Post.findOne({_id: req.params.post_id}).then(function(post){
                res.send(post);
            })
        }).catch(next)
}


// TODO: hide comments
// TODO: hide user id from upvotes and downvotes ????????
exports.getOneTranslation = function(req,res,next){
    console.log('Attempting to translation ' + req.params.translation_id + ' from DB')
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
        console.log(post)
            var temp = post[0].translation[0];
            delete temp.comments;
            res.send(temp)}).catch(next)};


exports.listPosts =  function(req,res,next){
    var page;
    var sizeOfPreview;
    var postsPerPage;
    
    if (req.query.page == null){
        page = 0;
    }else{
        page = Number(req.query.page);
    }
    
    if (req.query.sizeOfPreview == null){
        sizeOfPreview = 100;
    }else{
        sizeOfPreview = Number(req.query.sizeOfPreview);
    }
    
    if (req.query.postsPerPage == null){
        postsPerPage = 10;
    }else{
        postsPerPage = Number(req.query.postsPerPage);
    }
    
    console.log("getting page " + page + " of posts");
    
    Post.aggregate([{$skip: postsPerPage*page},{$limit: postsPerPage},
                    {$project: {
                       _id: "$_id",
                     title: "$title",
                  language: "$language",
                      tags: "$tags",
                    userID: "$userID",
               dateCreated: "$dateCreated",
                   upvotes: "$upvotes", // do we want user or front end to see who voted?
                 downvotes: "$downvotes", // do we want user or front end to see who voted?
               previewText: {$substrCP: ["$text",0,sizeOfPreview]},
      numberOfTranslations: {$size: "$translations"}   // may or may not be needed but its here
                    }}
                    ]).then(function(posts){
                            res.send(posts);
                            }).catch(next)
};

exports.listTranslations = function(req,res,next){
    var page;
    var withComments;
    var translationsPerPage;
    if (req.query.page == null){
        page = 0;
    }else{
        page = Number(req.query.page);
    }
    
    if (req.query.translationsPerPage == null){
        translationsPerPage = 10;
    }else{
        translationsPerPage = Number(req.query.translationsPerPage);
    }
    
    if (req.query.withComments == null){
        withComments = false;
    }else{
        withComments = true;;
    }
    
    console.log("getting page " + page + " of translations for post " + req.params.post_id);
    
    Post.aggregate([{ $match : { _id: mongoose.Types.ObjectId(req.params.post_id)}},
                    {$project: {
                    "translations.comments": withComments
                    }}
                    ]).then(function(post){
                            res.send(post[0].translations.slice(page*translationsPerPage,page*translationsPerPage+translationsPerPage))
                            }).catch(next)
};
