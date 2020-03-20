import { TestBed } from '@angular/core/testing';

import { Comment } from './comment';
import { User } from '../../user/user';


describe('Comment', () => {
	beforeEach(() => TestBed.configureTestingModule({}));
	
	it('should create a valid Comment with all attributes', () => {
		let user: User = new User("420yoloswag", "bob.sanders@gmail.com", "123");
		let text: string = "hello world"
		let language: string = "Ok";
		let comments: Comment[] = [];
		
		let upvotes: string[] = [];
		let downvotes: string[] = [];
		
		let id: string = "123";
		let dateCreated: Date = new Date();
		
		let enableProd: boolean = true;
		
		let comment = new Comment(user, text, language, comments, upvotes, downvotes, id, dateCreated, enableProd);
		
		console.log(comment.toString());
		expect(comment).toBeTruthy();
	});

});