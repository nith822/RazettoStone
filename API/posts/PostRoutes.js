let router = require('express').Router();
let postController = require('./PostController');

// I think postController can be broken down but I'm a lazy 

// create post
router.route('/').post(postController.create);
// get one post
router.route('/:post_id').get(postController.view);
// add translation to post
router.route('/:post_id/translations/').post(postController.addTranslation);
// search for a post
router.route('/search/:search_string').get(postController.search);

//Comments
router.route('/:post_id/comments').post(postController.commentOnPost);
router.route('/:post_id/translations/:translation_id/comments/').post(postController.commentOnTranslation);

//Replies
router.route('/:post_id/comments/:commment_id/replies').post(postController.replyToPostComment);
router.route('/:post_id/translations/:translation_id/comments/:commment_id/replies').post(postController.replyToPostComment);

//Votes
router.route('/:post_id/vote').put(postController.votePost);                                     // vote on post
router.route('/:post_id/translations/:translation_id/vote').put(postController.voteTranslation); // vote on translation
router.route('/:post_id/comments/:comment_id/vote').put(postController.votePostComment);         // vote on post comment
router.route('/:post_id/translations/:translation_id/comments/:comment_id/vote').put(postController.voteTranslationComment); // vote on translation comment
router.route('/:post_id/comments/:commment_id/replies/:reply_id/vote').post(postController.votePostComment);
router.route('/:post_id/translations/:translation_id/comments/:commment_id/replies/:reply_id/vote').post(postController.votePostComment);

//Flag
router.route('/:post_id/translations/:translation_id/flag').post(postController.flagTranslation);







module.exports = router;
