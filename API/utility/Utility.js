/// Get a user object (excluding email and OAuthID)
function retrieveUserById(id){
    let returnValue;
    User.aggregate([ { $match : { _id: id}},{$project:{
        oAuthId: false,
        email: false
    }}]).then(function(user){
        //console.log(user);
        returnValue = user;
    });
    return returnValue;
}
