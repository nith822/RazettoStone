let router = require('express').Router();
var userController = require('./UserController');

router.get('/', function (req, res) {
    res.json({
        status: 'UP',
        message: 'Welcome to RazettoStone\'s API!'
    });
});

// Add new user to DB -- Pass values in request's body
router.route('/users/create')
    .post(userController.create);
// Fetch all users from DB
router.route('/users')
    .get(userController.index);
// Fetch specific user from DB
router.route('/users/:user_id')
    .get(userController.view);
// Update specific user from DB -- Pass values to be updated in request's body
router.route('/users/update/:user_id')
    .put(userController.update)

module.exports = router;