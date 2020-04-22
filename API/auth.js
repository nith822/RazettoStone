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

async function validateUser(req){
    //allows us to check for the user Id being castable to a mongo ID
    var ObjectId = require('mongoose').Types.ObjectId;
    
    //This checks if the user Id is there, and whether it is a valid ID
    if (req.body.userID == undefined || !req.body.userID.trim() || !ObjectId.isValid(req.body.userID))
    {
        console.log('Request did not have userID');
        return 'Need userID. ';
    }
    
    // here we check to make sure that the cookie header is filled
    else if(req.headers.cookie == undefined)
    {
    	console.log('Need to log in');
        return 'Need to log in ';
    }
    // interates through the cookies to find if there is an Oauth Id token
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
	return 'Need authID. ';
	}
        
    // Checks Id against Oauth Token to make sure user is valid
    else
    {
        var erro = '';
        async function validate(UID, OID)
        {
            const val = await User.exists({_id: UID, oAuthId: OID});
            return val;
        }
        var ths = await validate(req.body.userID, value);
        if(!ths)
        {
            erro = erro.concat(' Bad Login ');
            console.log('UID OID MISMATCH');
        }
        return erro;
    }
    }
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
