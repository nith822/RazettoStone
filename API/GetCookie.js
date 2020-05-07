/*
 this is a quick little function that will let you pull the User Id out of a request,
 I made the function here because we'll also need it over in the post controler.
 Also gonna throw 
*/
const User = require('./users/UserModel');
var mongoose = require('mongoose');

//here in this function I try out a new programming style called throw errors on purpose.
function pullUserID(req){
    
    try{
        
    var ObjectId = require('mongoose').Types.ObjectId;
    
    //because I didnt check to make sure cookies actually existed, this can throw an error.
    var comp = req.headers.cookie.split(" ");
    
    //love random variables
    var x;
    var value;
    // look through all the cookies to see if any are the one I want, I could write a generic form of this, BUT we only use it twice, and we need to make sure UID's are valid, so...
    for(x of comp)
    {
        if(x != undefined)
        {
            var s = x.split("=");
            if(s[0] == 'userId') value = s[1];
        }
    }
    // Make sure value doesnt have a semicolon
    if(value.charAt(value.length - 1) == ';')
    {
        value = value.substring(0, value.length - 1);
    }
    //check to make sure the ID is a valid Object Id
    if(!value || !ObjectId.isValid(value))
    {
        console.log('Request did not have User ID');
        console.log(value);
        throw 'Need User ID. ';
    }
    return value;
    }
    catch(e){
        throw e;
    }
}

module.exports.UID = pullUserID;

// you may think this function is just a copy paste of the UID one, but youd be WRONG, this ones the original
function pullOAuthID(req){
    
    //first things first we have to remove the semicolon from the end This will throw an error if no cookies
    var cookiesWOColon = req.headers.cookie;
    if(cookiesWOColon.charAt(cookiesWOColon.length - 1) == ';')
    {
        cookiesWOColon = cookiesWOColon.substring(0, cookiesWOColon.length - 1);
    }
    
    // this throws an error if there are no cookies
    var comp = req.headers.cookie.split(" ");
    var x;
    var value;
    //interate through x to find the oAuthID cookie
    for(x of comp)
    {
        if(x != undefined)
        {
            var s = x.split("=");
            if(s[0] == '_oAuthId') value = s[1];
        }
    }
    if(value.charAt(value.length - 1) == ';')
    {
        value = value.substring(0, value.length - 1);
    }
    if(!value)
    {
        console.log('Request did not have Auth ID');
        throw 'Need authID. ';
    }
    return value;
}
module.exports.OID = pullOAuthID;
