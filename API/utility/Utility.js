const User = require('../users/UserModel');

/// Get a user object (excluding email and OAuthID)
exports.retrieveUserById = function(id){
    let returnValue;
    User.aggregate([ { $match : { _id: id}},{$project:{
        oAuthId: false,
        email: false
    }}]).then(function(user){
        //console.log(user);
        returnValue = user;
    });
    console.log(returnValue);
    return returnValue;
}

