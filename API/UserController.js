User = require('./UserModel');

exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

exports.create = function (req, res) {
    console.log('Attempting to insert an user')
    var user = new User({
        userName: req.body.userName,
        email: req.body.email,
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        languages: req.body.languages,
        oAuthId: req.body.oAuthId
    });
    
    console.log("get called");
    user.save(function (err) {
        if (err)
            res.json(err);
        res.json({
                    message: 'New user created!',
                    data: user
                });
    });
};

exports.view = function (req, res) {
    console.log('Attempting to retrieve user from DB')
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};

exports.update = function (req, res) {
User.findById(req.params.user_id, function (err, user) {
        console.log("Attempting to update user")
        if (err)
            res.send(err);
        if (req.body.userName) user.userName = req.body.userName
        if (req.body.email) user.email = req.body.email
        // Send the whole language array for adding or removing languages
        if (req.body.languages) user.languages = req.body.languages
        if (req.body.oAuthId) user.oAuthId = req.body.oAuthId

        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};