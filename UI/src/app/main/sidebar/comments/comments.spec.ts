import { TestBed } from '@angular/core/testing';

import { Comment } from './comment';
import { User } from '../../user/user';


describe('Comment', () => {
	beforeEach(() => TestBed.configureTestingModule({}));
	
	it('should create a valid Comment with all attributes', () => {
		let text: string = "hello world"
		let user: User = new User("420yoloswag", "bob.sanders@gmail.com", "123");
		let dateCreated: Date = new Date();
		let replies: Comment[] = [];
		
		let comment: Comment = new Comment(text, user, dateCreated, replies);
		
		console.log(comment.toString());
		expect(comment).toBeTruthy();
	});

});