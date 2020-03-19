import { TextLine } from './textLine';
import { User } from '../../user/user';
import { Comment } from '../../sidebar/comments/comment'

const MAX_CHARACTERS: number = 150;
	
export class Text {	//Translations
	
	title: string;
	id: string;		//TranslationID
	textLines: TextLine[];	//Text
	language: string;
	dateCreated: Date;
	user: User;
	comments: Comment[];
	
	
	constructor(title?: string, id?: string, text?: string, language?: string, 
		dateCreated?: Date,  user?: User, comments?: Comment[], enableProd?: boolean) {
		
		if(!title && enableProd) { throw new Error('No title for Text') } else { this.title = title }
		if(!id && enableProd) { throw new Error('No id for Text') } else { this.id = id  }
		if(!text) { this.textLines = []	} else { this.textLines = this.parseText(text) };		
		if(!language && enableProd) { throw new Error('No language for Text') } else { this.setLanguage(this.language) }
		if(!user && enableProd) { throw new Error('No user for Text') } else { this.user = user }
		if(dateCreated) { this.dateCreated = dateCreated; }
		if(comments) { this.comments = comments; }
		
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
	
	setLanguage(language: string): void {
		this.language = language;
	}
	
	addComment(comment: Comment): void {
		this.comments.push(comment);
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