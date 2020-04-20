const {OAuth2Client} = require('google-auth-library');
const axios = require('axios');
const User = require('./users/UserModel');
var mongoose = require('mongoose');


//Production 

//const CLIENT_ID = "453317713902-pcipug2cpurc23oubn5kjde7648uk1f2.apps.googleusercontent.com";
const CLIENT_ID = "1026018355292-n7qc68g2uk33ase78pl8buo4rp8qnb98.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, 
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  if(payload) {
		console.log(payload['name']);
		console.log(payload['email']);
		return true;
  }
}

module.exports.verify = verify;

function validateUser(req){
    var ObjectId = require('mongoose').Types.ObjectId;
    var erro = "";
	console.log(ObjectId.isValid(req.body.userID));
    if (req.body.userID == undefined || !req.body.userID.trim() || !ObjectId.isValid(req.body.userID))
    {
        console.log('Request did not have userID');
        erro = 'Need userID. ';
    }
    else if(req.headers.cookie == undefined)
    {
    	console.log('Need to log in');
        erro = err.concat('Need to log in ');
    }
    else
    {
	var comp = req.headers.cookie.split(" ");
	var x;
	var value;
	for(x of comp)
	{
        if(x != undefined)
        {
		var s = x.split("=");
		if(s[0] == 'oAuthId') value = s[1];
        }
	}
	if(!value)
	{
	console.log('Request did not have Auth ID');
	erro = erro.concat('Need authID. ');
	}
    else
    {
	 User.exists({_id: req.body.userID, oAuthId: value}, function(err, result){
        if(!result){
			console.log('Please Log in to make a post');
            erro = erro.concat('Need to log in ');
			}}
    }
    console.log(erro);
    return erro;


}
module.exports.validateUser = validateUser;


/*
module.exports = { 
	verify: async function (id_token) {
		axios.get('https://oauth2.googleapis.com/tokeninfo?id_token=' + id_token)
		.then(function (response) {
			//
			console.log("successful response");
			return true;
		})
		.catch(function (error) {
			console.log(error);
			return false;
		})
		.then(function () {
			console.log("then");
		});
	}
};
*/
