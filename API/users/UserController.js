let User = require('./UserModel');
let auth = require('../auth');
let cookieParser = require('cookie-parser'); 

// Function: Checking DB for duplicate entries
// Input: userName and email
// Output: errorMessage. If no error, then errorMessage is empty
let validateUser = async function(req_UserName, req_Email) {
    errorMessage = '';
    await User.find({userName: req_UserName}, function (err, docs) {
        if (docs != undefined && docs.length){
            console.log('userName already exists in schema');
            errorMessage = errorMessage.concat('Username already exists. ');
        }}).then(
        await User.find({email: req_Email}, function (err, docs) {
        if (docs != undefined &&  docs.length){
            console.log('email already exists in schema');
            errorMessage = errorMessage.concat('Email already exists. ');
        }}))
    console.log(errorMessage)
    return errorMessage;
}

exports.index = function (req, res) {
    console.log('Attempting to fetch all users.')
    User.get(function (err, users) {
        if (err) {
            res.status(500).json({
                status: "failed",
                message: err,
            });
            return res;
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

exports.create = async function (req, res) {
    console.log('Attempting to insert an user.')
    var user = new User({
        userName: req.body.userName,
        email: req.body.email,
        dateCreated: req.body.dateCreated ? Date.parse(req.body.dateCreated) : Date.now(),
        languages: req.body.languages,
        oAuthId: req.body.oAuthId,
        oAuthExpiration: (Date.now()+1000*60*60*24)
    });
    
    var isAuthenticated = await auth.verify(user.oAuthId);
    if (isAuthenticated)
    {console.log('verified')
        var errorMessage = '';
        // Checking for required parameters
        if (req.body.userName == undefined || !req.body.userName.trim())
        {
            console.log('Request did not have userName');
            errorMessage = errorMessage.concat('Need username. ');
        }
        if (req.body.email == undefined || !req.body.email.trim())
        {
            console.log('Request did not have email');
            errorMessage = errorMessage.concat('Need email. ');
        }
        if (errorMessage.length)
        {
            res.status(422).json({
                message: errorMessage,
                status: 'failed'
            })
            return res;
        }
        // Resetting error message for future use
        errorMessage = '';

        errorMessage = await validateUser(req.body.userName, req.body.email)
        
        if (errorMessage != undefined && errorMessage.length)
        {
            res.status(409).json({
                message: errorMessage,
                status: 'failed'
            })
            return res;
        }
        else
        {
            //not actualy verifying
            //if(isAuthenticated) {
            
                user.save(function (err) {
                    console.log('save called')
                    if (err) {
                        res.status(500).json(err);
                    } else {
                          res.clearCookie('_oAuthId');
                          res.cookie('_oAuthId', user.oAuthId, {expires: (Date.now+1000*60*60*24)}).json({
                            message: 'New user created!',
                            data: user
                        });
                    }
                });
            //}
        }
    }
    else
    {
        res.status(401).json({
            status: 'failed',
            message: 'User could not be validated'
        })
    }
}

exports.view = function (req, res) {
    console.log('Attempting to retrieve user from DB')
    User.findById(req.params.user_id, function (err, user) {
        if (err)
        {
            res.status(500).send(err);
            return res;
        }
        res.json({
            status: 'success',
            message: 'User retrieved successfully',
            data: user
        });
    });
};

exports.update = function (req, res) {
User.findById(req.params.user_id, async function (err, user) {
        console.log("Attempting to update user")
        if (err)
        {
            res.status(500).send(err);
            return res;
        }
        if (req.body.userName) user.userName = req.body.userName
        if (req.body.email) user.email = req.body.email
        // Send the whole language array for adding or removing languages
        if (req.body.languages) user.languages = req.body.languages
        if (req.body.oAuthId)
        {
            user.oAuthId = req.body.oAuthId;
            user.oAuthExpiration = (Date.now()+1000*60*60*24)
        }
        else
        {
            console.log('no OAuthID given')
            res.status(422).send('Need OAuthId.');
            return res;
        }
        
        var isAuthenticated = await auth.verify(user.oAuthId, user.email);
        if (isAuthenticated)
        {
            console.log("User update authenticated")
            user.save(function (err) {
                if (err)
                {
                    res.status(500).send(err);
                    return res;
                }
              res.clearCookie('_oAuthId');
              res.cookie('_oAuthId', user.oAuthId, {expires: (Date.now+1000*60*60*24)}).json({
                    status: 'success',
                    message: 'User Info updated',
                    data: user
                });
            });
        }
        else
        {
            console.log("User update not authenticated")
            res.status(401).json({
                status: 'failed',
                message: 'User could not be validated'
            })
        }
    }).catch(function(err) {
        console.log(err)
    });
};
