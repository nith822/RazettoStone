// Temporary DB for Unit tests
const existingMongoUri = process.env.MONGO_URI
process.env.MONGO_URI = 'mongodb://localhost/RazettoStoneUnitTests2'

jest.mock('../auth')
jest.mock('../GetCookie')
const supertest = require('supertest');
const app = require('../');
const mongoose = require('mongoose')

// userId and oAuthId are from mock of GetCookie.js
var userId = 'exampleuserid';
var postId;
var commentId;
var translationId;
var translationCommentId;
var commentReplyId;
var transalationCommentReplyId;

describe("Testing the posts endpoint", () => {

    it("can add post successfully without translation", async () => {
		const response = await supertest(app).post('/posts')
			.send({title: "Test Post",
				text: "testing wefn2. 2onwsn..fnd \n wrnd.",
                textLanguage: "english",
                dateCreated: "2020-03-25T03:52:32.187Z",
                userID: userId,
                tags: ["Test tag", "new tag"]})

		postId = response.body.data._id;

		expect(response.status).toBe(200);
		expect(response.body.message).toEqual("success!");
		expect(response.body.data.title).toEqual("Test Post");
		expect(response.body.data.text).toEqual("testing wefn2. 2onwsn..fnd \n wrnd.");
		expect(response.body.data.dateCreated).toEqual("2020-03-25T03:52:32.187Z");
		expect(response.body.data.textLanguage).toEqual("english");
        expect(response.body.data.userID).toEqual(userId);
        expect(response.body.data.tags).toEqual(["Test tag", "new tag"]);
    });

    it("can add post successfully with translation", async () => {
        translations = [{title: 'Test translation 2',
                        textLanguage: 'French',
                        text: 'newtranslationtext.',
                        userID: userId}]
		const response = await supertest(app).post('/posts')
			.send({title: "Test Post 2",
				text: "newpost \n wrnd.",
                textLanguage: "english",
                dateCreated: "2020-04-25T03:52:32.187Z",
                userID: userId,
                tags: ["Test tag", "new tag"],
                translations: translations})

		expect(response.status).toBe(200);
		expect(response.body.message).toEqual("success!");
		expect(response.body.data.title).toEqual("Test Post 2");
		expect(response.body.data.text).toEqual("newpost \n wrnd.");
		expect(response.body.data.dateCreated).toEqual("2020-04-25T03:52:32.187Z");
		expect(response.body.data.textLanguage).toEqual("english");
        expect(response.body.data.userID).toEqual(userId);
        expect(response.body.data.tags).toEqual(["Test tag", "new tag"]);
        expect(response.body.data.translations[0].textLanguage).toEqual('French');
        expect(response.body.data.translations[0].text).toEqual('newtranslationtext.');
        expect(response.body.data.translations[0].title).toEqual('Test translation 2');
        expect(response.body.data.translations[0].userID).toEqual(userId);
    });

    it("can add translation to existing post", async () => {
        translations = {title: 'Test translation 1',
                        textLanguage: 'French',
                        text: 'randomtranslationtext.',
                        userID: userId}
		const response = await supertest(app).post('/posts/'+postId+'/translations')
            .send(translations);

        translationId = response.body.translations[0]._id;
            
        expect(response.status).toBe(200);
        expect(response.body.title).toEqual('Test Post');
        expect(response.body.translations[0].textLanguage).toEqual('French');
        expect(response.body.translations[0].text).toEqual('randomtranslationtext.');
        expect(response.body.translations[0].title).toEqual('Test translation 1');
        expect(response.body.translations[0].userID).toEqual(userId);
    })

    it("can fetch single post", async () => {
        const response = await supertest(app).get('/posts/'+postId);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("success!");
        expect(response.body.data.title).toEqual("Test Post");
		expect(response.body.data.text).toEqual("testing wefn2. 2onwsn..fnd \n wrnd.");
		expect(response.body.data.dateCreated).toEqual("2020-03-25T03:52:32.187Z");
		expect(response.body.data.textLanguage).toEqual("english");
        expect(response.body.data.userID).toEqual(userId);
        expect(response.body.data.tags).toEqual(["Test tag", "new tag"]);
    })

    it("can search for post", async () => {
        const response = await supertest(app).get('/posts/search/testing')

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("success!");
        expect(response.body.data[0].title).toEqual("Test Post");
		expect(response.body.data[0].text).toEqual("testing wefn2. 2onwsn..fnd \n wrnd.");
		expect(response.body.data[0].dateCreated).toEqual("2020-03-25T03:52:32.187Z");
		expect(response.body.data[0].textLanguage).toEqual("english");
        expect(response.body.data[0].userID).toEqual(userId);
        expect(response.body.data[0].tags).toEqual(["Test tag", "new tag"]);
    })

    it("can fetch single translation from post", async () => {
        const response = await supertest(app).get('/posts/'+postId+'/translations/'+translationId);
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body.textLanguage).toEqual('French');
        expect(response.body.text).toEqual('randomtranslationtext.');
        expect(response.body.title).toEqual('Test translation 1');
        expect(response.body.userID).toEqual(userId);
    })

    it("can list posts", async () => {
        const response = await supertest(app).get('/posts');

        expect(response.status).toBe(200);
        expect(response.body[0].title).toEqual('Test Post 2');
        expect(response.body[1].title).toEqual('Test Post');
    })

    it("can list translations", async () => {
        const response = await supertest(app).get('/posts/'+postId+'/translations');

        expect(response.status).toBe(200);
        expect(response.body[0].title).toEqual('Test translation 1');
    })

    it("can add comment to post", async () => {
        const response = await supertest(app).post('/posts/'+postId+'/comments')
                                    .send({textLanguage: "English",
                                            text: "example of comment."});

        commentId = response.body.comments[0]._id;

        expect(response.status).toBe(200);
        expect(response.body.title).toEqual('Test Post');
        expect(response.body.comments[0].text).toEqual('example of comment.');
    })

    it("can fetch comment from post", async () => {
        const response = await supertest(app).get('/posts/'+postId+'/comments');

        expect(response.status).toBe(200);
        expect(response.body[0].text).toEqual("example of comment.");
        expect(response.body[0].textLanguage).toEqual('English');
    })

    it("can add comment to translation", async () => {
        const response = await supertest(app).post('/posts/'+postId+'/translations/'+translationId+'/comments')
                                            .send({textLanguage: 'English',
                                                    text: "example of comment on translation"});

        translationCommentId = response.body.translations[0].comments[0]._id;

        expect(response.status).toBe(200);
        expect(response.body.title).toEqual('Test Post');
        expect(response.body.translations[0].comments[0].text).toEqual('example of comment on translation');
    })

    it("can list comments from translation", async () => {
        const response = await supertest(app).get('/posts/'+postId+'/translations/'+translationId+'/comments')

        expect(response.status).toBe(200);
        expect(response.body[0].text).toEqual('example of comment on translation');
    })

    it("can upvote on post", async () => {
        const response = await supertest(app).put('/posts/'+postId+'/vote')
                                        .send({vote: true});

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual(userId+' upvoted post '+postId);
    })

    it("can downvote on post", async () => {
        const response = await supertest(app).put('/posts/'+postId+'/vote')
                                        .send({vote: false});

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual(userId+' downvoted post '+postId);
    })

    it("can upvote on translation", async () => {
        const response = await supertest(app).put('/posts/'+postId+'/translations/'+translationId+'/vote')
                                        .send({vote: true});

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual(userId+' upvoted translation '+translationId);
    })

    it("can downvote on translation", async () => {
        const response = await supertest(app).put('/posts/'+postId+'/translations/'+translationId+'/vote')
                                        .send({vote: false});

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual(userId+' downvoted translation '+translationId);
    })

    it("can upvote on post comment", async () => {
        const response = await supertest(app).put('/posts/'+postId+'/comments/'+commentId+'/vote')
                                        .send({vote: true});

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual(userId+' upvoted post comment '+commentId);
    })

    it("can downvote on post comment", async () => {
        const response = await supertest(app).put('/posts/'+postId+'/comments/'+commentId+'/vote')
                                        .send({vote: false});

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual(userId+' downvoted post comment '+commentId);
    })

    it("can upvote on post comment", async () => {
        const response = await supertest(app).put('/posts/'+postId+'/translations/'+translationId+'/comments/'+translationCommentId+'/vote')
                                        .send({vote: true});

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual(userId+' upvoted translation comment '+translationCommentId);
    })

    it("can downvote on post comment", async () => {
        const response = await supertest(app).put('/posts/'+postId+'/translations/'+translationId+'/comments/'+translationCommentId+'/vote')
                                        .send({vote: false});

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual(userId+' downvoted translation comment '+translationCommentId);
    })
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