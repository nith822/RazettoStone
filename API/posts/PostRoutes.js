let router = require('express').Router();
let postController = require('./PostController');
let voteController = require('./VoteController');
let commentController = require('./CommentController');
let auth = require('../auth');

/**
 * @swagger
 * /posts:
 *  post:
 *      description: Add a post
 *      parameters:
 *          - in: cookie
 *            name: userId
 *            required: true
 *          - in: cookie
 *            name: _oAuthId
 *            required: true
 *          - in: body
 *            required: true
 *            schema:
 *              type: object
 *              required: 
 *                  - title
 *                  - textLanguage
 *                  - text
 *                  - tags
 *              properties:
 *                  title:
 *                      type: string
 *                  textLanguage:
 *                      type: string
 *                  text:
 *                      type: string
 *                  dateCreated:
 *                      type: string
 *                  translations:
 *                      type: object
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *      responses:
 *          '200':
 *              description: Successful response
 *          '422':
 *              description: Missing arguments
 *          '401':
 *              description: Unauthorized request
 */
router.route('/').post(auth.validateUser, postController.create);
/**
 * @swagger
 * /posts/{post_id}:
 *  get:
 *      description: Retrieve single post
 *      parameters:
 *          - in: path
 *            name: post_id
 *            required: true
 *          - in: cookie
 *            name: userId
 *            required: true
 *          - in: cookie
 *            name: _oAuthId
 *            required: true
 *      responses:
 *          '200':
 *              description: Successful response
 *          '401':
 *              description: Unauthorized request
 */
router.route('/:post_id').get(postController.view);
/**
 * @swagger
 * /posts/{post_id}/translations:
 *  post:
 *      description: Add translation to a post
 *      parameters:
 *          - in: path
 *            name: post_id
 *            required: true
 *          - in: cookie
 *            name: userId
 *            required: true
 *          - in: cookie
 *            name: _oAuthId
 *            required: true
 *          - in: body
 *            required: true
 *            schema:
 *              type: object
 *              required: 
 *                  - title
 *                  - textLanguage
 *                  - text
 *              properties:
 *                  title:
 *                      type: string
 *                  textLanguage:
 *                      type: string
 *                  text:
 *                      type: string
 *                  dateCreated:
 *                      type: string
 *      responses:
 *          '200':
 *              description: Successful response
 *          '422':
 *              description: Missing arguments
 *          '401':
 *              description: Unauthorized request
 */
router.route('/:post_id/translations/').post(auth.validateUser, postController.addTranslation);
/**
 * @swagger
 * /posts/search/{search_string}:
 *  get:
 *      description: Search for posts containing the search_string
 *      parameters:
 *          - in: path
 *            name: search_string
 *      responses:
 *          '200':
 *              description: Successful response
 */
router.route('/search/:search_string').get(postController.search);
//Flag
router.route('/:post_id/translations/:translation_id/flag').put(auth.validateUser, postController.flagTranslation);
/**
 * @swagger
 * /posts/{post_id}/translations/{translation_id}:
 *  get:
 *      description: Retrieve translations of a post
 *      parameters:
 *          - in: path
 *            name: post_id
 *            required: true
 *          - in: path
 *            name: translation_id
 *            required: true
 *          - in: cookie
 *            name: userId
 *            required: true
 *          - in: cookie
 *            name: _oAuthId
 *            required: true
 *      responses:
 *          '200':
 *              description: Successful response
 *          '401':
 *              description: Unauthorized request
 */
router.route('/:post_id/translations/:translation_id').get(postController.getOneTranslation);
/**
 * @swagger
 * /posts:
 *  get: 
 *      description: List all posts
 *      parameters:
 *          - in: query
 *            name: page
 *            required: false
 *            default: 0
 *          - in: query
 *            name: sizeOfPreview
 *            required: false
 *            default: 100
 *          - in: query
 *            name: postsPerPage
 *            required: false
 *            default: 10
 *      responses:
 *          '200':
 *              description: Successful response
 *          '401':
 *              description: Unauthorized request
 */
router.route("").get(postController.listPosts);
/**
 * @swagger
 * /posts/{post_id}/translations:
 *  get:
 *      description: Add translation to a post
 *      parameters:
 *          - in: path
 *            name: post_id
 *            required: true
 *          - in: query
 *            name: page
 *          - in: query
 *            name: translationsPerPage
 *          - in: query
 *            name: withComments
 *      responses:
 *          '200':
 *              description: Successful response
 */
router.route("/:post_id/translations").get(postController.listTranslations);


// Comments and Replies will be under commentController
//Comments
/**
 * @swagger
 * /posts/{post_id}/comments:
 *  post:
 *      description: Add a comment to post
 *      parameters:
 *          - in: path
 *            name: post_id
 *            required: true
 *          - in: cookie
 *            name: userId
 *            required: true
 *          - in: cookie
 *            name: _oAuthId
 *            required: true
 *          - in: body
 *            required: true
 *            schema:
 *              type: object
 *              required:
 *                  - textLanguage
 *                  - text
 *              properties:
 *                  textLanguage:
 *                      type: string
 *                  text:
 *                      type: string
 *                  dateCreated:
 *                      type: string
 *      responses:
 *          '200':
 *              description: Successful response
 *          '422':
 *              description: Missing arguments
 *          '401':
 *              description: Unauthorized request
 */
router.route('/:post_id/comments').post(auth.validateUser, commentController.commentOnPost);
/**
 * @swagger
 * /posts/{post_id}/comments:
 *  get:
 *      description: List all comments on a post
 *      parameters:
 *          - in: path
 *            name: post_id
 *            required: true
 *      responses:
 *          '200':
 *              description: Successful response
 */
router.route('/:post_id/comments').get(commentController.listPostComments);
/**
 * @swagger
 * /posts/{post_id}/translations/{translation_id}/comments:
 *  post:
 *      description: Add a comment to translation
 *      parameters:
 *          - in: path
 *            name: post_id
 *            required: true
 *          - in: path
 *            name: translation_id
 *            required: true
 *          - in: cookie
 *            name: userId
 *            required: true
 *          - in: cookie
 *            name: _oAuthId
 *            required: true
 *          - in: body
 *            required: true
 *            schema:
 *              type: object
 *              required:
 *                  - textLanguage
 *                  - text
 *              properties:
 *                  textLanguage:
 *                      type: string
 *                  text:
 *                      type: string
 *                  dateCreated:
 *                      type: string
 *      responses:
 *          '200':
 *              description: Successful response
 *          '422':
 *              description: Missing arguments
 *          '401':
 *              description: Unauthorized request
 */
router.route('/:post_id/translations/:translation_id/comments/').post(auth.validateUser, commentController.commentOnTranslation);
/**
 * @swagger
 * /posts/{post_id}/translations/{translation_id}/comments:
 *  get:
 *      description: List all comments on a translation
 *      parameters:
 *          - in: path
 *            name: post_id
 *            required: true
 *          - in: path
 *            name: translation_id
 *            required: true
 *      responses:
 *          '200':
 *              description: Successful response
 */
router.route('/:post_id/translations/:translation_id/comments/').get(commentController.listTranslationComments);
//Replies
router.route('/:post_id/comments/:comment_id/replies').post(auth.validateUser, commentController.replyToPostComment);
router.route('/:post_id/translations/:translation_id/comments/:comment_id/replies').post(auth.validateUser, commentController.replyToTranslationComment);

// Votes will be under voteController
//Votes
/**
 * @swagger
 * /posts/{post_id}/vote:
 *  put:
 *      description: Vote on a post
 *      parameters:
 *          - in: path
 *            name: post_id
 *            required: true
 *          - in: cookie
 *            name: userId
 *            required: true
 *          - in: cookie
 *            name: _oAuthId
 *            required: true
 *          - in: body
 *            required: true
 *            schema:
 *              type: object
 *              required: 
 *                  - vote
 *              properties:
 *                  vote:
 *                      type: boolean
 *                      description: True for upvoting. False for downvoting
 *      responses:
 *          '200':
 *              description: Successful response
 *          '422':
 *              description: Missing arguments
 *          '401':
 *              description: Unauthorized request
 */
router.route('/:post_id/vote').put(auth.validateUser, voteController.votePost);                                     // vote on post
/**
 * @swagger
 * /posts/{post_id}/translations/{translation_id}/vote:
 *  put:
 *      description: Vote on a translation
 *      parameters:
 *          - in: path
 *            name: post_id
 *            required: true
 *          - in: path
 *            name: translation_id
 *            required: true
 *          - in: cookie
 *            name: userId
 *            required: true
 *          - in: cookie
 *            name: _oAuthId
 *            required: true
 *          - in: body
 *            required: true
 *            schema:
 *              type: object
 *              required: 
 *                  - vote
 *              properties:
 *                  vote:
 *                      type: boolean
 *                      description: True for upvoting. False for downvoting
 *      responses:
 *          '200':
 *              description: Successful response
 *          '422':
 *              description: Missing arguments
 *          '401':
 *              description: Unauthorized request
 */
router.route('/:post_id/translations/:translation_id/vote').put(auth.validateUser, voteController.voteTranslation); // vote on translation
/**
 * @swagger
 * /posts/{post_id}/comments/{comment_id}/vote:
 *  put:
 *      description: Vote on a post's comment
 *      parameters:
 *          - in: path
 *            name: post_id
 *            required: true
 *          - in: path
 *            name: comment_id
 *            required: true
 *          - in: cookie
 *            name: userId
 *            required: true
 *          - in: cookie
 *            name: _oAuthId
 *            required: true
 *          - in: body
 *            required: true
 *            schema:
 *              type: object
 *              required: 
 *                  - vote
 *              properties:
 *                  vote:
 *                      type: boolean
 *                      description: True for upvoting. False for downvoting
 *      responses:
 *          '200':
 *              description: Successful response
 *          '422':
 *              description: Missing arguments
 *          '401':
 *              description: Unauthorized request
 */
router.route('/:post_id/comments/:comment_id/vote').put(auth.validateUser, voteController.votePostComment);         // vote on post comment
/**
 * @swagger
 * /posts/{post_id}/translations/{translation_id}/comments/{comment_id}/vote:
 *  put:
 *      description: Vote on a translation's comment
 *      parameters:
 *          - in: path
 *            name: post_id
 *            required: true
 *          - in: path
 *            name: translation_id
 *            required: true
 *          - in: path
 *            name: comment_id
 *            required: true
 *          - in: cookie
 *            name: userId
 *            required: true
 *          - in: cookie
 *            name: _oAuthId
 *            required: true
 *          - in: body
 *            required: true
 *            schema:
 *              type: object
 *              required: 
 *                  - vote
 *              properties:
 *                  vote:
 *                      type: boolean
 *                      description: True for upvoting. False for downvoting
 *      responses:
 *          '200':
 *              description: Successful response
 *          '422':
 *              description: Missing arguments
 *          '401':
 *              description: Unauthorized request
 */
router.route('/:post_id/translations/:translation_id/comments/:comment_id/vote').put(auth.validateUser, voteController.voteTranslationComment); // vote on translation comment
router.route('/:post_id/comments/:comment_id/replies/:reply_id/vote').put(auth.validateUser, voteController.votePostCommentReply);
router.route('/:post_id/translations/:translation_id/comments/:comment_id/replies/:reply_id/vote').put(auth.validateUser, voteController.voteTranslationCommentReply);


module.exports = router;
