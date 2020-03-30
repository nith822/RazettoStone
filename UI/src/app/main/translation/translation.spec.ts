import { TestBed } from '@angular/core/testing';

import { Translation } from './translation';

import { Text } from './text/text';
import { TextLine } from './text/TextLine';
import { Comment } from '../sidebar/comments/comment';
import { User } from '../user/user';


describe('Translation', () => {
	
	
	beforeEach(() => TestBed.configureTestingModule({}));
	/*
	it('should create a valid translationPost with all attributes', () => {
		
		let user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		let title: string = "Bane";
		let language: string = "JP"
		let comments: Comment[] = [];
		
		let upvotes: string[] = [];
		let downvotes: string[] = [];
		
		let id: string = "123";
		let dateCreated: Date = new Date();
		
		let originalText: Text = new Text();
		let translations: Text[] = [new Text()];
		let tags: string[] = ["bigTag", "guyTag"];
		let flags: string[][] = [["good content"], ["good grammar"]];
		
		let enableProd: boolean = true;
	
		
		let translation = new Translation(user, title, language, comments, 
			upvotes, downvotes, 
			id, dateCreated, 
			originalText, translations, tags, flags,
			enableProd);
		
		
		expect(translation).toBeTruthy();
	});
	
	
	
	it('should return the valid textLine', () => {
		
		var user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		var title: string = "Bane";
		var language: string = "JP"
		var comments: Comment[] = [];
		
		var upvotes: string[] = [];
		var downvotes: string[] = [];
		
		var id: string = "123";
		var dateCreated: Date = new Date();
		
		var tags: string[] = ["bigTag", "guyTag"];
		var flags: string[][] = [["good content"], ["good grammar"]];
		
		var enableProd: boolean = true;
		
		//create Texts
		var textString: string = "If I pull that off will you die?\nIt would be extremely painfull...\nYou're a big guy!\nFor you.";
		let originalText = new Text(user, title, language, comments, upvotes, downvotes, id, dateCreated, textString, enableProd);
		
		var textString: string = "gay1\ngay2\ngay3\nFor you.";
		let translatedText = new Text(user, title, language, comments, upvotes, downvotes, id, dateCreated, textString, enableProd);
		
		let translations: Text[] = [translatedText];
		
		let translation = new Translation(user, title, language, comments, 
			upvotes, downvotes, 
			id, dateCreated, 
			originalText, translations, tags, flags,
			enableProd);
		console.log(translation.toString());
		
		//test if returns original or translated && matching case
		let originalCorrectStrings: string[] = ["If I pull that off will you die?", "It would be extremely painfull...", 
							"You're a big guy!", "For you."]; 
							
		let translatedCorrectStrings: string[] = ["gay1", "gay2", "gay3", "For you."]; 
							
		var isOriginal: boolean = true;
		expect(translation.getTextLine(isOriginal, 1).getText()).toBe(originalCorrectStrings[1]);
		isOriginal = false;
		expect(translation.getTextLine(isOriginal, 1).getText()).toBe(translatedCorrectStrings[1]);
		
		//underflow
		var isOriginal: boolean = true;
		expect(() => translation.getTextLine(isOriginal, -1)).toThrow(new Error('OUB in text. isOriginal: ' + true + " line: " + -1)); 
		
		//overflow
		expect(() => translation.getTextLine(isOriginal, 4)).toThrow(new Error('OUB in text. isOriginal: ' + true + " line: " + 4)); 
	});
	*/
});
