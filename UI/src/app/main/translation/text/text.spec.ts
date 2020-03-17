import { Text } from './text';

import { TestBed } from '@angular/core/testing';

import { TextLine } from './textLine';
import { User } from '../../user/user';
import { Comment } from '../../sidebar/comments/comment'

describe('Text', () => {
	beforeEach(() => TestBed.configureTestingModule({}));
	
	it('should create a valid text with all attributes', () => {
		let title: string = "Bane";
		let id: string = "123";
		let textString: string = "A big guy";
		let language: string = "JP"
		let dateCreated: Date = new Date();
		let user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		let comments: Comment[] = [];
		let enableProd: boolean = true;
		
		let text = new Text(title, id, textString, language, dateCreated, user, comments, enableProd);
		expect(text).toBeTruthy();
		
	});
	
	it('should create a valid text with an empty text', () => {
		let title: string = "Bane";
		let id: string = "123";
		let textString: string = undefined;
		let language: string = "JP"
		let dateCreated: Date = new Date();
		let user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		let comments: Comment[] = [];
		let enableProd: boolean = true;
		
		let text = new Text(title, id, textString, language, dateCreated, user, comments, enableProd);
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
	
	
	
	
	it('should return proper preview text', () => {
		
		let MAX_CHARACTERS: number = 150;
		
		let title: string = "Bane";
		let id: string = "123";
		let language: string = "JP"
		let dateCreated: Date = new Date();
		let user: User = new User("420yoloswag","bobsanders@gmail.com","o123",new Date(), ["Japanese", "English"], "123");
		let comments: Comment[] = [];
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
		
		var text = new Text(title, id, textString, language, dateCreated, user, comments, enableProd);
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
		
		var text = new Text(title, id, textString, language, dateCreated, user, comments, enableProd);
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
		
		var text = new Text(title, id, textString, language, dateCreated, user, comments, enableProd);
		expect(flattenTextLinesIntoString(text.getPreviewText())).toBe(correctString);
		
		
		function flattenTextLinesIntoString(textLines: TextLine[]): string {
			var builtString: string = "";
			for(let textLine of textLines) {
				builtString += textLine.getText();
			}
			return builtString;
		}
	});
});