import { TestBed } from '@angular/core/testing';

import { User } from './user';



describe('User', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should create a valid user with all optional attributes', () => {
		
		let username: string = "bobsanders";
		let email: string = "bobsanders@gmail.com";
		let oAuthId: string = "123";
		let dateCreated: Date = new Date();
		let languages: string[] = ["English", "Japanese"];
		let id: string = "0xFF"
		let user: User = new User(username, email, oAuthId, dateCreated, languages, id);
		
		expect(user).toBeTruthy();
	});
	
	it('should create a valid user with only neccessary attributes', () => {
		
		let username: string = "bobsanders";
		let email: string = "bobsanders@gmail.com";
		let oAuthId: string = "123";
		let user: User = new User(username, email, oAuthId);
		
		expect(user).toBeTruthy();
	});
});
