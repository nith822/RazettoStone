const cookieParser = require('cookie-parser'); 
let GetCookie = require('../GetCookie');
const express = require ('express');
const router = express.Router();
const Post = require('./PostModel');
const User = require('../users/UserModel');
const Translation = require('./translations/TranslationModel')
var mongoose = require('mongoose');

// constant for max length
const maxTextLength = 100000;
const maxTitleLength = 300;
const maxLanguageLength = 200;
const maxTagLength = 200;

// create new post
exports.create = function (req, res, next) {

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
    if(req.body.text.length > maxTextLength){
        console.log('Text is longer than max length');
        errorMessage = errorMessage.concat('Text too long. ');
    }
    if(req.body.title.length > maxTitleLength){
        console.log('Title is longer than max length');
        errorMessage = errorMessage.concat('Title too long. ');
    }
    if(req.body.textLanguage.length > maxLanguageLength){
        console.log('textLanguage is longer than max length');
        errorMessage = errorMessage.concat('textLanguage too long. ');
    }
    
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
        textLanguage: req.body.textLanguage,
        text: req.body.text,
        userID: GetCookie.UID(req),
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        upvotes: [GetCookie.UID(req)],                             // are we going to make the poster auto upvote their post?
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
            textLanguage: post.textLanguage,
            text: post.text,
            userID: post.userID,
            dateCreated: post.dateCreated
        }
        console.log('Post OP: ' + temp.userID);
        try {
            userObjectId = mongoose.Types.ObjectId(temp.userID);
            console.log(userObjectId);
            User.aggregate([ { $match : { _id: userObjectId}},{$project:{
                oAuthId: false,
                email: false
            }}]).then(function(user){
                console.log(user);
                temp['user_object'] = user;
                res.send({message: "success!", data: temp });
            });
        } catch (exception) {
            console.log('That post probably did not have a real user ID');
            console.log(exception);
            res.send({ message: "success!", data: temp });
        }
    }).catch(next)
};



exports.addTranslation = function (req, res, next){
    console.log(req.params)
    console.log('Attempting to add translation to post ' + req.params.post_id)
    var errorMessage = '';
    // Checking for required parameters
    if (req.body.title == undefined || !req.body.title.trim())
    {
        console.log('Request did not have title');
        errorMessage = errorMessage.concat('Need title. ');
    }
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
    if(req.body.text.length > maxTextLength){
        console.log('Text is longer than max length');
        errorMessage = errorMessage.concat('Text too long. ');
    }
    if(req.body.title.length > maxTitleLength){
        console.log('Text is longer than max length');
        errorMessage = errorMessage.concat('Text too long. ');
    }
    if(req.body.textLanguage.length > maxLanguageLength){
        console.log('Text is longer than max length');
        errorMessage = errorMessage.concat('Text too long. ');
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
        textLanguage: req.body.textLanguage,
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        userID: GetCookie.UID(req),
        upvotes: [GetCookie.UID(req)],
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
exports.flagTranslation = function(req,res,next){
    console.log(req.params)
    console.log('Attempting to add comment to translation ' + req.params.translation_id)
    var errorMessage = '';
    // Checking for required parameters
    

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
        userID: GetCookie.UID(req),
        flag: req.body.flag
        }}}).then(function(){
            Post.findOne({_id: req.params.post_id}).then(function(post){
                res.send(post);
            })
        }).catch(next)
}


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

        var temp = post[0].translation[0];
        delete temp.comments;
        try {
            User.aggregate([ { $match : { _id: mongoose.Types.ObjectId(temp.userID)}},{$project:{
                oAuthId: false,
                email: false
            }}]
            ).then(function(user){
                temp['user_object'] = user;
                res.send(temp)
            });
        } catch (exception) {
            console.log('That translation probably did not have a real user ID');
            console.log(exception);
            res.send(temp);
        }
    }).catch(next)
};


exports.listPosts =  function(req,res,next){
    // sort by newest 
    function sortByNewest( a, b ) {
        if ( a.dateCreated < b.dateCreated ){
            return 1;
        }
        if ( a.dateCreated > b.dateCreated){
            return -1;
        }
        return 0;
        }

    
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
    

    Post.aggregate([
       {$project: {
           _id: "$_id",
           title: "$title",
           textLanguage: "$textLanguage",
           tags: "$tags",
           userID: "$userID",
           dateCreated: "$dateCreated",
           upvotes: "$upvotes", // do we want user or front end to see who voted?
           downvotes: "$downvotes", // do we want user or front end to see who voted?
           previewText: {$substrCP: ["$text",0,sizeOfPreview]},
           numberOfTranslations: {$size: "$translations"}   // may or may not be needed but its here 
       }}                                 
    ]).then(async function(posts){
        var temp = posts;
        var promises = [];
        for (var post in temp){
            console.log("REEEEEEEEEEEEEEEEEEEEEEEEEEE");
            try {
                userObjectId = mongoose.Types.ObjectId(temp[post].userID);
                console.log(userObjectId);
                promise = User.aggregate([ { $match : { _id: userObjectId}},{$project:{
                    oAuthId: false,
                    email: false
                }}]).then(function(user){
                    console.log(user);
                    temp[post]['user_object'] = user;
                    //console.log("hoho");
                })
                await promise;
            } catch (exception) {
                console.log('That post probably did not have a real user ID ');
                console.log(exception);
                temp[post]['user_object'] = null;
            }
        }
        Promise.all(promises).then(function(){
            //console.log("hehe");
            res.send(temp.sort(sortByNewest).slice(page*postsPerPage,page*postsPerPage+postsPerPage));
    });
    }).catch(next)
};


exports.listTranslations = function(req,res,next){
    // sort by upvotes 
    function sortByUpvotes( a, b ) {
        if ( a.upvotes.length - a.downvotes.length < b.upvotes.length - b.downvotes.length ){
          return 1;
        }
        if ( a.upvotes.length - a.downvotes.length > b.upvotes.length - b.downvotes.length){
          return -1;
        }
        return 0;
      }

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
     ]).then(async function(post){
        var tempArray = post[0].translations.sort(sortByUpvotes);
        var promises = [];
        for (var post in tempArray){
            console.log("REEEEEEEEEEEEEEEEEEEEEEEEEEE");
            try {
                userObjectId = mongoose.Types.ObjectId(tempArray[post].userID);
                console.log(userObjectId);
                promise = User.aggregate([ { $match : { _id: userObjectId}},{$project:{
                    oAuthId: false,
                    email: false
                }}]).then(function(user){
                    console.log(user);
                    tempArray[post]['user_object'] = user;
                    //console.log("hoho");
                })
                await promise;
            } catch (exception) {
                console.log('That post probably did not have a real user ID ');
                console.log(exception);
                tempArray[post]['user_object'] = null;
            }
        }
        Promise.all(promises).then(function(){
            //console.log("hehe");
            res.send(tempArray.slice(page*translationsPerPage,page*translationsPerPage+translationsPerPage))
        });

     }).catch(next)
};
