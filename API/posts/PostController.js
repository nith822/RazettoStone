const express = require ('express');
const router = express.Router();
const Post = require('./PostModel');
const Translation = require('./translations/TranslationModel')


// create new post
exports.create = function (req, res, next) {

    // this might also work isntead of the code above
    console.log('Attempting to create new post')
    console.log(req.body)
    
    var newPost = new Post({
        title: req.body.title,
        language: req.body.language,
        originalText: req.body.originalText,
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


exports.votePost = function (req, res, next){
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
            console.log( req.body.userID+ ' upvoting post ' + req.params.post_id)
            res.send({"message": req.body.userID+ ' downvoted post ' + req.params.post_id})
        }
        )
    }
}

exports.voteTranslation = function(req, res, next){
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


// replies not added yet
exports.commentOnPost = function(req,res,next){
    console.log('Attempting to add comment to post ' + req.params.post_id)
    Post.findByIdAndUpdate({_id:req.params.post_id}, {$push: {comments: {
        text: req.body.text,
        language: req.body.language,
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        userID: req.body.userID,
        upvotes: [req.body.userID],
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
    Post.findOneAndUpdate({_id: req.params.post_id, "translations._id" : req.params.translation_id},
    {$push: {"translations.$.comments": {
        text: req.body.text,
        language: req.body.language,
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        userID: req.body.userID,
        upvotes: [req.body.userID],
        downvotes: [],
        }}}).then(function(){
            Post.findOne({_id: req.params.post_id}).then(function(post){
                res.send(post);
            })
        }).catch(next)
}

exports.voteTranslationComment = function(req,res,next){
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

exports.flagTranslation = function(req,res,next){
    console.log(req.params)
    console.log('Attempting to add comment to translation ' + req.params.translation_id)
    Post.findOneAndUpdate({_id: req.params.post_id, "translations._id" : req.params.translation_id},
    {$push: {"translations.$.flags": {
        userID: req.body.userID,
        flag: req.body.flag
        }}}).then(function(){
            Post.findOne({_id: req.params.post_id}).then(function(post){
                res.send(post);
            })
        }).catch(next)
}

exports.replyToPostComment = function(req,res,next){
    console.log("Replying to post comment " + req.params.comment_id)
    Post.findOneAndUpdate({_id: req.params.post_id, "comments._id": req.params.comment_id},
    {$push: {"comments.$.replies":{
        text: req.body.text,
        language: req.body.language,
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        userID: req.body.userID,
        upvotes: [req.body.userID],
        downvotes: []
    }}
        }).then(function(){
            Post.findOne({_id: req.params.post_id}).then(function(post){
                res.send(post);
            })
        }).catch(next)
}

exports.replyToTranslationComment = function(req,res,next){
   Post.findOneAndUpdate({_id: req.params.post_id, "translations._id": req.params.translation_id},
   {$push: {"translations.$[].comments.$[comment].replies": {
    text: req.body.text,
    language: req.body.language,
    dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
    userID: req.body.userID,
    upvotes: [req.body.userID],
    downvotes: []
}}}, { arrayFilters: [{ 'comment._id': req.params.comment_id }] }).then(function(){
    Post.findOne({_id: req.params.post_id}).then(function(post){
        res.send(post);
    })
       }).catch(next)
}

exports.votePostCommentReply = function(req,res,next){

}

exports.voteTranslationCommentReply = function(req,res,next){

}






