// Temporary DB for Unit tests
const existingMongoUri = process.env.MONGO_URI
process.env.MONGO_URI = 'mongodb://localhost/RazettoStoneUnitTests'

const supertest = require('supertest');
const app = require('../');
const mongoose = require('mongoose')


describe("Testing the users endpoint", () => {

	it("can add user successfully", async () => {
		const response = await supertest(app).post('/users')
			.send({userName: "TestUser1",
			email: "TestUser1@email.com",
			dateCreated: "2020-03-25T03:52:32.187Z",
			languages: ["english"],
			oAuthId: "TestUser1_OAuthId"})

		expect(response.status).toBe(200);
		expect(response.body.message).toEqual("New user created!");
		expect(response.body.data.userName).toEqual("TestUser1");
		expect(response.body.data.email).toEqual("TestUser1@email.com");
		expect(response.body.data.dateCreated).toEqual("2020-03-25T03:52:32.187Z");
		expect(response.body.data.languages).toEqual(["english"]);
		expect(response.body.data.oAuthId).toEqual("TestUser1_OAuthId");
	});
	
	it("fetch all users successfully", async () => {

		const response = await supertest(app).get('/users');

		expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
		expect(response.body.message).toBe("Users retrieved successfully");
		expect(response.body.data[0].userName).toEqual("TestUser1");
		expect(response.body.data[0].email).toEqual("TestUser1@email.com");
		expect(response.body.data[0].dateCreated).toEqual("2020-03-25T03:52:32.187Z");
		expect(response.body.data[0].languages).toEqual(["english"]);
		expect(response.body.data[0].oAuthId).toEqual("TestUser1_OAuthId");
	});
});

// Tear Down stage
afterAll(() => {
	mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true});
	var db = mongoose.connection

	// Emptying collections created from unit testing
	if(db)
		db.dropDatabase();
	console.log('deleting db')
	process.env.MONGO_URI = existingMongoUri
  });