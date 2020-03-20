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
		let user: User = new User("420yoloswag", "bobsanders@gmail.com", "123");
		let dateCreated: Date = new Date();
	
		let upvotes: number = 10;
		let downvotes: number = 1;
	
		let tags: string[] = ["bigTag", "guyTag"];
		let comments: Comment[] = [];
		let flags: string[][] = [["good content"], ["good grammar"]];
		
		let originalText: Text = new Text();
		let translations: Text[] = [new Text()];
		
		let translation: Translation = new Translation(originalText, translations, id, language, title, user,
			dateCreated, upvotes, downvotes, tags, comments, flags);
		
		expect(translation).toBeTruthy();
	});
	
	
	
	it('should return the valid textLine', () => {
		
		var id: number = 1;
		var language: string = "Japanese";
		var title: string = "Bane";
		var user: User = new User("420yoloswag", "bobsanders@gmail.com", "123");
		var dateCreated: Date = new Date();
	
		var upvotes: number = 10;
		var downvotes: number = 1;
	
		var tags: string[] = ["bigTag", "guyTag"];
		var comments: Comment[] = [];
		var flags: string[][] = [["good content"], ["good grammar"]];
		
		
		//create Texts
		var title: string = "Bane";
		var textId: string = "123";
		var textString: string = "If I pull that off will you die?\nIt would be extremely painfull...\nYou're a big guy!\nFor you.";
		var language: string = "JP"
		var dateCreated: Date = new Date();
		var user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		var comments: Comment[] = [];
		var enableProd: boolean = true;
		
		let originalText: Text = new Text(title, textId, textString, language, dateCreated, user, comments, enableProd);
		
		var textString: string = "gay1\ngay2\ngay3\nFor you.";
		let translatedText: Text = new Text(title, textId, textString, language, dateCreated, user, comments, enableProd);
		let translations: Text[] = [translatedText];
		
		
		
		let translation: Translation = new Translation(originalText, translations, id, language, title, user,
			dateCreated, upvotes, downvotes, tags, comments, flags);
		
		
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
});
