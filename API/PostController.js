Post = require('./PostModel');

// create new post
exports.create = function (req, res) {
    console.log('Attempting to create new post')
    var post = new Post({
        title: req.body.title,
        languages: req.body.languages,
        original_text: req.body.original_text,
        user_id: req.body.user_id,
        created_date: req.body.created_date ? Date.parse(req.body.created_date) : Date.now(),
        upvotes: req.body.upvotes,                             // are we going to make the poster auto upvote their post?
        downvotes: req.body.downvotes,
        tags: req.body.tags,                                   // tags might be not required
        // on creation will not have comments, flags

        // it might be easier to just create a post with no translation then have the user
        // to add translation once the post is created.
        translations: req.body.translations 
    });
    
    console.log("get called");
    post.save(function (err) {
        if (err)
            res.json(err);
        res.json({
                    message: 'New post created!',
                    data: post
                });
    });
};
