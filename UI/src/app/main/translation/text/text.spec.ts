import { Text } from './text';

import { TestBed } from '@angular/core/testing';

import { TextLine } from './textLine';
import { User } from '../../user/user';
import { Comment } from '../../sidebar/comments/comment'

describe('Text', () => {
	beforeEach(() => TestBed.configureTestingModule({}));
	
	it('should create a valid text with all attributes', () => {
		let id: string = "123";
		let textString: string = "A big guy";
		let language: string = "JP"
		let createdDate: Date = new Date();
		let user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		let comments: Comment[] = [];
		let enableProd: boolean = true;
		
		let text = new Text(id, textString, language, createdDate, user, comments, enableProd);
		console.log(text.toString());
		expect(text).toBeTruthy();
		
	});
	
	it('should create a valid text with an empty text', () => {
		let id: string = "123";
		let textString: string = undefined;
		let language: string = "JP"
		let createdDate: Date = new Date();
		let user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		let comments: Comment[] = [];
		let enableProd: boolean = true;
		
		let text = new Text(id, textString, language, createdDate, user, comments, enableProd);
		console.log(text.toString());
		expect(text).toBeTruthy();
		
	});
});