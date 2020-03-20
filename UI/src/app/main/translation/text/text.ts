import { TextLine } from './textLine';
import { User } from '../../user/user';
import { Comment } from '../../sidebar/comments/comment'

import { Interactible } from '../../interactible/interactible'

const MAX_CHARACTERS: number = 150;
	
export class Text extends Interactible {	//Translations
	
	textLines: TextLine[];	//Text
	
	constructor(user?: User, title?: string, language?: string, comments?: Comment[], 
				upvotes?: number, downvotes?: number, 
				id?: string, dateCreated?: Date, 
				text?: string,
				enableProd?: boolean) {
		
		super(user, title, language, comments, upvotes, downvotes, id, dateCreated, enableProd);
		if(!text) { this.textLines = []	} else { this.textLines = this.parseText(text) };		
		
	}
	
	parseText(text: string): TextLine[] {
		var textLines: TextLine[] = [];
		//remove \r from \n\r
		var splitStrings: string[] = text.replace(/\r/gm, "").split("\n");
		
		for(let splitString of splitStrings) {
			textLines.push(new TextLine(splitString));
		}
		
		return textLines;
	}
	
	getTextLines(): TextLine[] {
		return this.textLines;
	}
	
	getTextLine(line: number): TextLine {
		if(this.textLines.length <= line || line < 0) {
			throw new Error('OUB in textLines. Line:: ' + line); 
		}
		return this.getTextLines()[line];
	}
	
	//returns text as TextLine[] up to MAX_CHARACTERS
	//loop through each textLine of this.textLines
	//add current textLine to output_textLines
	//if totalLength exceeds MAX_CHARACTERS then trim current line and return
	getPreviewText(): TextLine[] {
		var textLines: TextLine[] = [];
		var totalLength: number = 0;
		for(let textLine of this.textLines) {
			if((textLine.getText().length + totalLength) > MAX_CHARACTERS) {
				var availableCharSlots: number = MAX_CHARACTERS - totalLength;
				textLines.push(new TextLine(textLine.getText().substring(0, availableCharSlots)));
			} else {
				textLines.push(textLine);
				totalLength += textLine.getText().length;
			}
		}
		return textLines;
	}
	
	toString(): string {
		return "Attributes for text:: " + "\n" 
			+ "id: " + this.id + "\n"
			+ "textLines: " + this.textLines + "\n"
			+ "language: " + this.language + "\n"
			+ "user: " + this.user + "\n"
			+ "dateCreated: " + this.dateCreated + "\n"
			+ "comments: " + this.comments + "\n"
	}
}