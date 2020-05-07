// Temporary DB for Unit tests
const existingMongoUri = process.env.MONGO_URI
process.env.MONGO_URI = 'mongodb://localhost/RazettoStoneUnitTests'

jest.mock('../auth')
const supertest = require('supertest');
const app = require('../');
const mongoose = require('mongoose')

var userId;
/*
var userIdtemp = "9e8b43be9887fc05a3ad852e";
var postId;
var commentId;
var translationId;
var translationCommentId;
var commentReplyId;
var transalationCommentReplyId;*/

describe("Testing the users endpoint", () => {

	it("can add user successfully", async () => {
		const response = await supertest(app).post('/users')
			.send({userName: "TestUser1",
				email: "TestUser1@email.com",
				dateCreated: "2020-03-25T03:52:32.187Z",
				languages: ["english"],
				oAuthId: "TestUser1_OAuthId"})

		userId = response.body.data._id;

		expect(response.status).toBe(200);
		expect(response.body.message).toEqual("New user created!");
		expect(response.body.data.userName).toEqual("TestUser1");
		expect(response.body.data.email).toEqual("TestUser1@email.com");
		expect(response.body.data.dateCreated).toEqual("2020-03-25T03:52:32.187Z");
		expect(response.body.data.languages).toEqual(["english"]);
	});

	it("cannot add user without username", async () => {
		const response = await supertest(app).post('/users')
			.send({email: "TestUser1@email.com",
				dateCreated: "2020-03-25T03:52:32.187Z",
				languages: ["english"],
				oAuthId: "TestUser1_OAuthId"})

		expect(response.status).toBe(422);
		expect(response.body.message).toEqual("Need username. ");
		expect(response.body.status).toEqual("failed");
	});
	
	it("cannot add user without email", async () => {
		const response = await supertest(app).post('/users')
			.send({userName: "TestUser1",
				dateCreated: "2020-03-25T03:52:32.187Z",
				languages: ["english"],
				oAuthId: "TestUser1_OAuthId"})

		expect(response.status).toBe(422);
		expect(response.body.message).toEqual("Need email. ");
		expect(response.body.status).toEqual("failed");
	});

	it("cannot add user without username and email", async() => {
		const response = await supertest(app).post('/users')
			.send({dateCreated: "2020-03-25T03:52:32.187Z",
				languages: ["english"],
				oAuthId: "TestUser1_OAuthId"})

		expect(response.status).toBe(422);
		expect(response.body.message).toEqual("Need username. Need email. ")
		expect(response.body.status).toEqual("failed");
	})

	it("cannot add user with same existing username", async () => {
		const response = await supertest(app).post('/users')
			.send({userName: "TestUser1",
			email: "TestUser1notsame@email.com",
			dateCreated: "2020-03-25T03:52:32.187Z",
			languages: ["english"],
			oAuthId: "TestUser1_OAuthId"})

		expect(response.status).toBe(409);
		expect(response.body.message).toEqual("Username already exists. ");
		expect(response.body.status).toEqual("failed");
	});
	
	it("cannot add user with same existing email", async () => {
		const response = await supertest(app).post('/users')
			.send({userName: "TestUser1notsame",
			email: "TestUser1@email.com",
			dateCreated: "2020-03-25T03:52:32.187Z",
			languages: ["english"],
			oAuthId: "TestUser1_OAuthId"})

		expect(response.status).toBe(409);
		expect(response.body.message).toEqual("Email already exists. ");
		expect(response.body.status).toEqual("failed");
	});

	it("cannot add user with same existing username and email", async() => {
		const response = await supertest(app).post('/users')
			.send({userName: "TestUser1",
			email: "TestUser1@email.com",
			dateCreated: "2020-03-25T03:52:32.187Z",
			languages: ["english"],
			oAuthId: "TestUser1_OAuthId"})

		expect(response.status).toBe(409);
		// Using toContain rather than toEqual because the API validates this asynchronously hence message won't be in same order always
		expect(response.body.message).toContain("Email already exists. ")
		expect(response.body.message).toContain("Username already exists. ")
		expect(response.body.status).toEqual("failed");
	})

	it("fetch all users successfully", async () => {

		const response = await supertest(app).get('/users');

		expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
		expect(response.body.message).toBe("Users retrieved successfully");
		expect(response.body.data[0].userName).toEqual("TestUser1");
		expect(response.body.data[0].email).toEqual("TestUser1@email.com");
		expect(response.body.data[0].dateCreated).toEqual("2020-03-25T03:52:32.187Z");
		expect(response.body.data[0].languages).toEqual(["english"]);
	});

	it("fetch single user successfully", async () => {

		const response = await supertest(app).get('/users/'+userId);

		expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
		expect(response.body.message).toBe("User retrieved successfully");
		expect(response.body.data.userName).toEqual("TestUser1");
		expect(response.body.data.email).toEqual("TestUser1@email.com");
		expect(response.body.data.dateCreated).toEqual("2020-03-25T03:52:32.187Z");
		expect(response.body.data.languages).toEqual(["english"]);
	});

	it("can update single user successfully", async () => {

		const response = await supertest(app).put('/users/'+userId)
			.send({email: "newEmail@gmail.com",
					oAuthId: 'exampleoauth'});

		expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
		expect(response.body.message).toBe("User Info updated");
		expect(response.body.data.userName).toEqual("TestUser1");
		expect(response.body.data.email).toEqual("newEmail@gmail.com");
		expect(response.body.data.dateCreated).toEqual("2020-03-25T03:52:32.187Z");
		expect(response.body.data.languages).toEqual(["english"]);
	});

	it("cannot update single user without oAuthId", async () => {
		const response = await supertest(app).put('/users/'+userId)
			.send({email: "newEmail@gmail.com"});

		expect(response.status).toBe(422);
	})
});
/*
describe("Testing the posts endpoint", () => {
    it("can add post successfully", async () => {
		const response = await supertest(app).post('/posts')
			.send({title: "Test Post",
				text: "testing wefn2. 2onwsn..fnd \n wrnd.",
                language: "english",
                dateCreated: "2020-03-25T03:52:32.187Z",
                userID: userIdtemp,
                tags: ["Test tag", "new tag"]})

		postId = response.body.data._id;

		expect(response.status).toBe(200);
		expect(response.body.message).toEqual("success!");
		expect(response.body.data.title).toEqual("Test Post");
		expect(response.body.data.text).toEqual("testing wefn2. 2onwsn..fnd \n wrnd.");
		expect(response.body.data.dateCreated).toEqual("2020-03-25T03:52:32.187Z");
		expect(response.body.data.language).toEqual("english");
        expect(response.body.data.userID).toEqual(userIdtemp);
        expect(response.body.data.tags).toEqual(["Test tag", "new tag"]);
	});
})*/

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