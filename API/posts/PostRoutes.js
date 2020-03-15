let router = require('express').Router();
let postController = require('./PostController');


router.route('/').post(postController.create);
router.route('/:id').get(postController.view);
	
module.exports = router;