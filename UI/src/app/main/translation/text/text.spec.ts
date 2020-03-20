import { Text } from './text';

import { TestBed } from '@angular/core/testing';

import { TextLine } from './textLine';
import { User } from '../../user/user';
import { Comment } from '../../sidebar/comments/comment'

describe('Text', () => {
	beforeEach(() => TestBed.configureTestingModule({}));
	
	it('should create a valid text with all attributes', () => {
		let user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		let title: string = "Bane";
		let language: string = "JP"
		let comments: Comment[] = [];
		
		let upvotes: string[] = [];
		let downvotes: string[] = [];
		
		let id: string = "123";
		let dateCreated: Date = new Date();
		
		let textString: string = "A big guy";
		
		let enableProd: boolean = true;
		
		let text = new Text(user, title, language, comments, upvotes, downvotes, id, dateCreated, textString, enableProd);
		expect(text).toBeTruthy();
		
	});
	
	it('should create a valid text with an empty text', () => {
		let user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		let title: string = "Bane";
		let language: string = "JP"
		let comments: Comment[] = [];
		
		let upvotes: string[] = [];
		let downvotes: string[] = [];
		
		let id: string = "123";
		let dateCreated: Date = new Date();
		
		let textString: string = undefined;
		
		let enableProd: boolean = true;
		
		let text = new Text(user, title, language, comments, upvotes, downvotes, id, dateCreated, textString, enableProd);
		expect(text).toBeTruthy();
		
	});
	
	it('should parse text properly', () => {
		let text = new Text();
		let correctStrings: string[] = ["If I pull that off will you die?", "It would be extremely painfull...", 
							"You're a big guy!", "For you."]; 
		
		//new line as \n
		var testString: string = "If I pull that off will you die?\nIt would be extremely painfull...\nYou're a big guy!\nFor you.";
		expect(convertTextLinesToStringArr(text.parseText(testString))).toEqual(correctStrings);
		
		
		//new line as \r\n 
		var testString: string = "If I pull that off will you die?\r\nIt would be extremely painfull...\r\nYou're a big guy!\r\nFor you.";
		expect(convertTextLinesToStringArr(text.parseText(testString))).toEqual(correctStrings);
		
		function convertTextLinesToStringArr(textLines: TextLine[]): string[] {
			var strArr: string[] = [];
			for(let textLine of textLines) {
				strArr.push(textLine.getText());
			}
			return strArr;
		}
	});
	
	it('should return valid textLine', () => {
		let user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		let title: string = "Bane";
		let language: string = "JP"
		let comments: Comment[] = [];
		
		let upvotes: string[] = [];
		let downvotes: string[] = [];
		
		let id: string = "123";
		let dateCreated: Date = new Date();
		
		let textString: string = "If I pull that off will you die?\nIt would be extremely painfull...\nYou're a big guy!\nFor you.";
		
		let enableProd: boolean = true;
		
		let text = new Text(user, title, language, comments, upvotes, downvotes, id, dateCreated, textString, enableProd);
		let correctStrings: string[] = ["If I pull that off will you die?", "It would be extremely painfull...", 
							"You're a big guy!", "For you."]; 
		//matching
		expect(text.getTextLine(2).getText()).toBe(correctStrings[2]);
		
		
		//overflow
		expect(() => { text.getTextLine(4) }).toThrow(new Error('OUB in textLines. Line:: ' + 4)); 
		
		//underflow
		expect(() => { text.getTextLine(-1) }).toThrow(new Error('OUB in textLines. Line:: ' + -1)); 
	});
	
	
	it('should return valid preview text', () => {
		
		let MAX_CHARACTERS: number = 150;
		
		let user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		let title: string = "Bane";
		let language: string = "JP"
		let comments: Comment[] = [];
		
		let upvotes: string[] = [];
		let downvotes: string[] = [];
		
		let id: string = "123";
		let dateCreated: Date = new Date();
		
		var textString: string = "If I pull that off will you die?\nIt would be extremely painfull...\nYou're a big guy!\nFor you.";
		
		let enableProd: boolean = true;
		
		
		//overflow
		var textString: string = "";
		for(var i = 1; i <= MAX_CHARACTERS + 10; i++) {
			textString += "@";
		}
		
		var correctString: string = "";
		for(var i = 1; i <= MAX_CHARACTERS; i++) {
			correctString += "@";
		}
		
		var text = new Text(user, title, language, comments, upvotes, downvotes, id, dateCreated, textString, enableProd);
		expect(flattenTextLinesIntoString(text.getPreviewText())).toBe(correctString);
		
		
		//underflow
		var textString: string = "";
		for(var i = 1; i <= MAX_CHARACTERS - 10; i++) {
			textString += "@";
		}
		
		var correctString: string = "";
		for(var i = 1; i <= MAX_CHARACTERS - 10; i++) {
			correctString += "@";
		}
		
		var text = new Text(user, title, language, comments, upvotes, downvotes, id, dateCreated, textString, enableProd);
		expect(flattenTextLinesIntoString(text.getPreviewText())).toBe(correctString);
		
		//exact 
		
		var textString: string = "";
		for(var i = 1; i <= MAX_CHARACTERS; i++) {
			textString += "@";
		}
		
		var correctString: string = "";
		for(var i = 1; i <= MAX_CHARACTERS; i++) {
			correctString += "@";
		}
		
		var text = new Text(user, title, language, comments, upvotes, downvotes, id, dateCreated, textString, enableProd);
		expect(flattenTextLinesIntoString(text.getPreviewText())).toBe(correctString);
		
		
		function flattenTextLinesIntoString(textLines: TextLine[]): string {
			var builtString: string = "";
			for(let textLine of textLines) {
				builtString += textLine.getText();
			}
			return builtString;
		}
	});
	
	it('should add a comment to comments', () => {
		let user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		let title: string = "Bane";
		let language: string = "JP"
		let comments: Comment[] = [];
		
		let upvotes: string[] = [];
		let downvotes: string[] = [];
		
		let id: string = "123";
		let dateCreated: Date = new Date();
		
		let textString: string = "If I pull that off will you die?\nIt would be extremely painfull...\nYou're a big guy!\nFor you.";
		
		let enableProd: boolean = true;
		
		let text = new Text(user, title, language, comments, upvotes, downvotes, id, dateCreated, textString, enableProd);
		
		//confirm precondition
		expect(text.comments.length).toEqual(0);
		
		//add a comment
		let sampleText: string = "hello"
		let testComment = new Comment(user, sampleText, language, comments, upvotes, downvotes, id, dateCreated, enableProd);
		text.addComment(testComment);
		expect(text.comments.length).toEqual(1);
		
		//is the comment 'valid'?
		expect(testComment.text).toBe(sampleText);
	});
});