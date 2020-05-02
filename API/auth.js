const {OAuth2Client} = require('google-auth-library');
const axios = require('axios');
const User = require('./users/UserModel');
const getCookie = require('./GetCookie');
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
  console.log(userid);
  if(payload) {
		console.log(payload['name']);
		console.log(payload['email']);
		return true;
  }
}

module.exports.verify = verify;

async function validateUser(req, res, next){
    
    try{
    // Checks Id against Oauth Token to make sure user is valid
        async function validate(UID, OID)
        {
            const exists = await User.findOne({_id: UID, oAuthId: OID});
            val = Date.now() < exists.oAuthExpiration;
            console.log('user Verification Status: ' + val);
            return val;
        }
        var ths = await validate(getCookie.UID(req), getCookie.OID(req));
        if(!ths)
        {
            console.log(ths);
            console.log('UID OID MISMATCH');
            throw 'UID OID MISMATCH';
        }
        else
        {
            next();
        }
    } catch(e) {
        console.log(e);
        res.status(401).json({
        error:'Invalid request! ' + e
        });
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
