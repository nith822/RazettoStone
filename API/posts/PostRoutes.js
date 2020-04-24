let router = require('express').Router();
let postController = require('./PostController');
let voteController = require('./VoteController');
let commentController = require('./CommentController');

// These will be unser postController
// create post
router.route('/').post(postController.create);
// get one post
router.route('/:post_id').get(postController.view);
// add translation to post
router.route('/:post_id/translations/').post(postController.addTranslation);
// search for a post
router.route('/search/:search_string').get(postController.search);
//Flag
router.route('/:post_id/translations/:translation_id/flag').put(postController.flagTranslation);
// get one translation
router.route('/:post_id/translations/:translation_id').get(postController.getOneTranslation);
// get list
router.route("").get(postController.listPosts);
router.route("/:post_id/translations").get(postController.listTranslations);


// Comments and Replies will be under commentController
//Comments
router.route('/:post_id/comments').post(commentController.commentOnPost);
router.route('/:post_id/comments').get(commentController.listPostComments);
router.route('/:post_id/translations/:translation_id/comments/').post(commentController.commentOnTranslation);
router.route('/:post_id/translations/:translation_id/comments/').get(commentController.listTranslationComments);
//Replies
router.route('/:post_id/comments/:comment_id/replies').post(commentController.replyToPostComment);
router.route('/:post_id/translations/:translation_id/comments/:comment_id/replies').post(commentController.replyToTranslationComment);

// Votes will be under voteController
//Votes
router.route('/:post_id/vote').put(voteController.votePost);                                     // vote on post
router.route('/:post_id/translations/:translation_id/vote').put(voteController.voteTranslation); // vote on translation
router.route('/:post_id/comments/:comment_id/vote').put(voteController.votePostComment);         // vote on post comment
router.route('/:post_id/translations/:translation_id/comments/:comment_id/vote').put(voteController.voteTranslationComment); // vote on translation comment
router.route('/:post_id/comments/:comment_id/replies/:reply_id/vote').put(voteController.votePostCommentReply);
router.route('/:post_id/translations/:translation_id/comments/:comment_id/replies/:reply_id/vote').put(voteController.voteTranslationCommentReply);


module.exports = router;
