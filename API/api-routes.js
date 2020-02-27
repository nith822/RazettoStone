let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'UP',
        message: 'Welcome to RazettoStone\'s API!'
    });
});

module.exports = router;