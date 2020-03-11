import { TestBed } from '@angular/core/testing';

import { Translation } from './translation';

import { Text } from './text/text';
import { TextLine } from './text/TextLine';
import { Comment } from '../sidebar/comments/comment';
import { User } from '../user/user';


describe('Translation', () => {
	
	
	beforeEach(() => TestBed.configureTestingModule({}));
	
	it('should create a valid translationPost with all attributes', () => {
		
		let id: number = 1;
		let language: string = "Japanese";
		let title: string = "Bane";
		let userID: string = "2";
		let createdDate: Date = new Date();
	
		let upvotes: number = 10;
		let downvotes: number = 1;
	
		let tags: string[] = ["bigTag", "guyTag"];
		let comments: Comment[] = [new Comment("for you", new User("yoloswag420", "bobsanders@gmail.com", "123"), createdDate, [], -1, -1)];
	
		let flags: string[][] = [["good content"], ["good grammar"]];
		
		let originalText: Text = new Text(["You're a big guy.."]);
		let translatedTexts: Text[] = [new Text(["For you"])];
		
		let translation: Translation = new Translation(originalText, translatedTexts, id, language, title, userID,
			createdDate, upvotes, downvotes, tags, comments, flags);
		
		console.log(translation.toString());
		expect(translation).toBeTruthy();
	});
});
