let router = require('express').Router();
let postController = require('./PostController');

// I think postController can be broken down but I'm a lazy fuck

// create post
router.route('/').post(postController.create);
// get one post
router.route('/:post_id').get(postController.view);
// add translation to post
router.route('/:post_id/translations/').post(postController.addTranslation);


//Comments
router.route('/:post_id/comments').post(postController.commentOnPost);


//Votes
router.route('/:post_id/vote').put(postController.votePost);    // vote on post
router.route('/:post_id/translations/:translation_id/vote').put(postController.voteTranslation); // vote on translation

module.exports = router;