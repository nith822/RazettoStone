const supertest = require('supertest');
const app = require('../');

describe("Testing the users endpoint", () => {

	it("fetch all users and returns true for status", async () => {

		const response = await supertest(app).get('/users');

		expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("Users retrieved successfully")

	});

	/*it("tests the get movies endpoint and have message property", async () => {

		const response = await supertest(app).get('/movies');

		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body).toHaveProperty('message');

	});*/

});