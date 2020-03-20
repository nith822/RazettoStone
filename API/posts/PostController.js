const express = require ('express');
const router = express.Router();
const Post = require('./PostModel');
const Translation = require('./translations/TranslationModel')




// create new post
exports.create = function (req, res, next) {

    // this might also work isntead of the code above
    console.log('Attempting to create new post')
    
    var newPost = new Post({
        title: req.body.title,
        language: req.body.language,
        originalText: req.body.originalText,
        userID: req.body.userID,
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        upvotes: req.body.upvotes,                             // are we going to make the poster auto upvote their post?
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

// view post by id
exports.view = function (req, res, next) {
    console.log('Attempting to retrieve post from DB')
    Post.findById(req.params.post_id).then(function(post){
        res.send({message: "success!",
                  data: post })
    }).catch(next)
};



exports.addTranslation = function (req, res, next){
    console.log(req.params)
    console.log('Attempting to add translation to post ' + req.params.post_id)
    
    Post.findByIdAndUpdate({_id:req.params.post_id}, {translations: {$push: {
        text: req.body.text,
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


exports.votePost = function (req, res, next){
    if (req.body.vote == true){
        Post.findByIdAndUpdate({_id:req.params.post_id},{
            $addToSet: {upvotes: req.body.userID},
            $pull: {downvotes: req.body.userID}
        }).then(function(){
            console.log( req.body.userID+ ' upvoted ' + req.params.post_id)
            res.send({"message": req.body.userID+ ' upvoted ' + req.params.post_id})
        }
        )
    }else{
        Post.findByIdAndUpdate({_id:req.params.post_id},{
            $addToSet: {downvotes: req.body.userID},
            $pull: {upvotes: req.body.userID}
        }).then(function(){
            console.log( req.body.userID+ ' upvoted ' + req.params.post_id)
            res.send({"message": req.body.userID+ ' downvoted ' + req.params.post_id})
        }
        )
    }
}

exports.voteTranslation = function(req, res, next){

}


