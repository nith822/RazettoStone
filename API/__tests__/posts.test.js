// Temporary DB for Unit tests
const existingMongoUri = process.env.MONGO_URI
process.env.MONGO_URI = 'mongodb://localhost/RazettoStoneUnitTests'

jest.mock('../auth')
const supertest = require('supertest');
const app = require('../');
const mongoose = require('mongoose')

var userIdtemp = "9e8b43be9887fc05a3ad852e";
var postId;
var commentId;
var translationId;
var translationCommentId;
var commentReplyId;
var transalationCommentReplyId;

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
    
    it("cannot add post without title", async () => {
		const response = await supertest(app).post('/posts')
			.send({text: "testing wefn2. 2onwsn..fnd \n wrnd.",
                language: "english",
                dateCreated: "2020-03-25T03:52:32.187Z",
                userID: userIdtemp,
                tags: ["Test tag", "new tag"]})

		expect(response.status).toBe(422);
        expect(response.body.message).toEqual("Need title. ");
        expect(response.body.status).toEqual("failed");
    });
    
    it("cannot add post without all required input", async () => {
		const response = await supertest(app).post('/posts/'+userIdtemp)
			.send({dateCreated: "2020-03-25T03:52:32.187Z"})

		expect(response.status).toBe(422);
        expect(response.body.message).toEqual("Need title. Need language. Need text. Need userID. Need tags. ");
        expect(response.body.status).toEqual("failed");
    });

    /*it("can fetch single post successfully", async () => {
		const response = await supertest(app).get('/posts')

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("success!");
        expect(response.body.data.title).toEqual("Test Post");
        expect(response.body.data.language).toEqual("english");
        expect(response.body.data.tags).toEqual(["Test tag", "new tag"]);
        expect(response.body.data.text).toEqual("testing wefn2. 2onwsn..fnd \n wrnd.");
        expect(response.body.data.userID).toEqual(userIdtemp);
        expect(response.body.data.dateCreated).toEqual("2020-03-25T03:52:32.187Z");
    });*/
})

// Tear Down stage
afterAll(() => {
    app.close();
	mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true});
	var db = mongoose.connection

	// Emptying collections created from unit testing
	if(db)
		db.dropDatabase();
	console.log('deleting db')
	process.env.MONGO_URI = existingMongoUri
  });