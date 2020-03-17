import { TextLine } from './textLine';
import { User } from '../../user/user';
import { Comment } from '../../sidebar/comments/comment'

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
		if(!language && enableProd) { throw new Error('No language for Text') } else { this.language = language }
		if(!user && enableProd) { throw new Error('No user for Text') } else { this.user = user }
		if(dateCreated) { this.dateCreated = dateCreated; }
		if(comments) { this.comments = comments; }
		
	}
	
	parseText(text: string): TextLine[] {
		var textLines: TextLine[] = [];
		//remove \r from \n\r
		var splitStrings: string[] = text.replace("\r", "").split("\n");
		
		for(let splitString of splitStrings) {
			textLines.push(new TextLine(splitString));
		}
		
		return textLines;
	}
	
	getTextLines(): TextLine[] {
		return this.textLines;
	}
	
	getTextLine(line: number): TextLine {
		if(this.textLines.length < line || line < 0) {
			throw new Error('OUB in textLines. Line:: ' + line); 
		}
		return this.getTextLines()[line];
	}
	
	getPreviewTextLines(): TextLine[] {
		var previewTextLines: TextLine[] = [];
		var maxPreviewLength: number = 3;
		
		if(this.textLines.length < 3) {
			maxPreviewLength = this.textLines.length;
		}
		
		for(var i = 0; i < maxPreviewLength; i++) {
			previewTextLines.push(this.getTextLine(i));
		}
		return previewTextLines;
	}
	
	addComments(comments: Comment[]): void {
		for(let comment of comments) {
			this.comments.push(comment);
		}
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