let router = require('express').Router();
let postController = require('./PostController');


router.route('/').post(postController.create);
router.route('/:post_id').get(postController.view);
router.route('/:post_id/translations/').put(postController.addTranslation);

//Votes
router.route('/:post_id/vote').put(postController.votePost);
router.route('/:post_id/translations/:translation_id/vote').put(postController.voteTranslation);
	
module.exports = router;