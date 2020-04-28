let router = require('express').Router();
let postController = require('./PostController');
let voteController = require('./VoteController');
let commentController = require('./CommentController');
let auth = require('../auth');

// These will be unser postController
// create post
router.route('/').post(auth.validateUser, postController.create);
// get one post
router.route('/:post_id').get(postController.view);
// add translation to post
router.route('/:post_id/translations/').post(auth.validateUser, postController.addTranslation);
// search for a post
router.route('/search/:search_string').get(postController.search);
//Flag
router.route('/:post_id/translations/:translation_id/flag').put(auth.validateUser, postController.flagTranslation);
// get one translation
router.route('/:post_id/translations/:translation_id').get(postController.getOneTranslation);
// get list
router.route("").get(postController.listPosts);
router.route("/:post_id/translations").get(postController.listTranslations);


// Comments and Replies will be under commentController
//Comments
router.route('/:post_id/comments').post(auth.validateUser, commentController.commentOnPost);
router.route('/:post_id/translations/:translation_id/comments/').post(auth.validateUser, commentController.commentOnTranslation);
//Replies
router.route('/:post_id/comments/:comment_id/replies').post(auth.validateUser, commentController.replyToPostComment);
router.route('/:post_id/translations/:translation_id/comments/:comment_id/replies').post(auth.validateUser, commentController.replyToTranslationComment);

// Votes will be under voteController
//Votes
router.route('/:post_id/vote').put(auth.validateUser, voteController.votePost);                                     // vote on post
router.route('/:post_id/translations/:translation_id/vote').put(auth.validateUser, voteController.voteTranslation); // vote on translation
router.route('/:post_id/comments/:comment_id/vote').put(auth.validateUser, voteController.votePostComment);         // vote on post comment
router.route('/:post_id/translations/:translation_id/comments/:comment_id/vote').put(auth.validateUser, voteController.voteTranslationComment); // vote on translation comment
router.route('/:post_id/comments/:comment_id/replies/:reply_id/vote').put(auth.validateUser, voteController.votePostCommentReply);
router.route('/:post_id/translations/:translation_id/comments/:comment_id/replies/:reply_id/vote').put(auth.validateUser, voteController.voteTranslationCommentReply);


module.exports = router;
