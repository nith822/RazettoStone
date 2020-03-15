let router = require('express').Router();
var userController = require('./UserController');

// Add new user to DB -- Pass values in request's body
router.route('/')
    .post(userController.create);
// Fetch all users from DB
router.route('/')
    .get(userController.index);
// Fetch specific user from DB
router.route('/:user_id')
    .get(userController.view);
// Update specific user from DB -- Pass values to be updated in request's body
router.route('/:user_id')
    .put(userController.update)

module.exports = router;