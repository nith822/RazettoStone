import { TextLine } from './textLine';
import { User } from '../../user/user';

export class Text {
	
	id: number = -1;
	textLines: TextLine[];
	comments: string[];
	user: User;
	title: string;
	language: string;
	
	constructor(text: string[], id?: number, user?: User, title?: string, language?: string) {
		if(user) {
			this.user = user;
		}
		
		if(id) {
			this.id = id;
		}
		
		if(title) {
			this.title = title;
		}
		
		if(language) {
			this.language = language;
		}
		
		if(!text || text.length == 0) {
			throw new Error('text is null or length = 0');
		}
		
		this.textLines = [];
		this.comments = [];
		
		for(let string of text) {
			this.textLines.push(new TextLine(string));
		}
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
	
	addComments(comments: string[]): void {
		for(let comment of comments) {
			this.comments.push(comment);
		}
	}
}