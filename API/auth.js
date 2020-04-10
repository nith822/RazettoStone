const {OAuth2Client} = require('google-auth-library');
const axios = require('axios');

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
verify().catch(console.error);

module.exports.verify = verify;
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
