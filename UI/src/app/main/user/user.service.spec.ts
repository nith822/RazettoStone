import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UserService } from './user.service';
import { User } from './user';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('UserService', () => {
	
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;
	let userService: UserService;
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [UserService]
		});

		httpClient = TestBed.inject(HttpClient);
		httpTestingController = TestBed.inject(HttpTestingController);
		
		userService = TestBed.get(UserService);
		
	});
	
	it('should create a valid user', async() => {
		let username: string = "bobsanders";
		let email: string = "bobsanders@gmail.com";
		let oAuthId: string = "123";
		let dateCreated: Date = new Date();
		let languages: string[] = ["English", "Japanese"];
		let id: string = "0xFF" 
		let user: User = new User(username, email, oAuthId, dateCreated, languages, id);
		expect(userService.createUser(user)).toBeTruthy();
		
		// If no requests or multiple requests matched that URL
		// `expectOne()` would throw.
		const req = httpTestingController.expectOne('/api/users');

		// Assert that the request is a POST.
		expect(req.request.method).toEqual('POST');

		// Respond with mock data, causing Observable to resolve.
		// Subscribe callback asserts that correct data was returned.
		req.flush({"status":"success", "message": 'New user created!'});

		// Finally, assert that there are no outstanding requests.
		httpTestingController.verify();
		
	});
	
	it('should create an invalid user', async() => {
		let username: string = undefined;
		let email: string = "bobsanders@gmail.com";
		let oAuthId: string = "123";
		let dateCreated: Date = new Date();
		let languages: string[] = ["English", "Japanese"];
		let id: string = "0xFF" 
		let user: User = new User(username, email, oAuthId, dateCreated, languages, id);
		expect(!userService.createUser(user)).toBeTruthy();
		
		
		const req = httpTestingController.expectOne('/api/users');
		expect(req.request.method).toEqual('POST');
		
		const mockError = new ErrorEvent('Network error', {
			message: "invalid user",
		});
		req.flush(mockError);
		
		httpTestingController.verify();
	});
});
