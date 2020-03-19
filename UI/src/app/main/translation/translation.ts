import { Text } from './text/text';
import { TextLine } from './text/textLine';

import { Comment } from '../sidebar/comments/comment';
import { User } from '../user/user';

export class Translation {	//Post
	
	id: number;
	language: string;
	title: string;
	user: User;
	dateCreated: Date;
	
	//only send total # of votes for now
	upvotes: number;
	downvotes: number;
	
	tags: string[];
	comments: Comment[];
	
	//[flagIndex][userName]
	flags: string[][];
	
	originalText: Text;
	translations: Text[];
	 
	currentTranslatedText: Text;
	
	constructor(originalText?: Text, translations?: Text[], 
		id?: number, language?: string, title?: string, user?: User, dateCreated?: Date,
		upvotes?: number, downvotes?: number, 
		tags?: string[], comments?: Comment[], flags?: string[][], enableProd?: boolean) {
		if(!originalText && enableProd) { throw new Error('No user for originalText Tranlsation Post'); } else { this.originalText = originalText;	};
		if(!id && enableProd) { throw new Error('No id for Tranlsation Post'); } else { this.id = id;  }
		if(!language && enableProd) { throw new Error('No language for Tranlsation Post'); } else { this.language = language; }
		if(!title && enableProd) { throw new Error('No title for Tranlsation Post'); } else { this.title = title; }
		if(!user && enableProd) { throw new Error('No user for Tranlsation Post'); } else { this.user = user; }
		if(dateCreated) { this.dateCreated = dateCreated; }
		if(upvotes) { this.upvotes = upvotes; } else { this.upvotes = 0; }
		if(downvotes) { this.downvotes = downvotes; } else { this.downvotes = 0; }
		if(tags) { this.tags = tags; }
		if(comments) { this.comments = comments; }
		if(flags) { this.flags = flags; }
		
		
		this.translations = translations;
		if(this.translations) {
			this.currentTranslatedText = translations[0];
		}
	}
	
	getOriginalText(isOriginal: boolean): Text {
		if(isOriginal) {
			return this.originalText;
		} else {
			return this.currentTranslatedText;
		}
	}
	
	getTextLine(isOriginal: boolean, line: number): TextLine {
		if(this.getOriginalText(isOriginal).getTextLines().length <= line && line < 0) {
			throw new Error('OUB in text. isOriginal: ' + isOriginal + " line: " + line); 
		}
		return this.getOriginalText(isOriginal).getTextLine(line);
	}
	
	//edit to use toStrings
	toString(): string {
		return "Attributes for translationPost:: " + "\n" 
			+ "id: " + this.id + "\n"
			+ "language: " + this.language + "\n"
			+ "title: " + this.title + "\n"
			+ "user: " + this.user + "\n"
			+ "dateCreated: " + this.dateCreated + "\n"
			+ "upvotes: " + this.upvotes +"\n"
			+ "downvotes: " + this.downvotes + "\n"
			+ "tags: " + this.tags + "\n"
			+ "comments: " + this.comments + "\n"
			+ "flags: " + this.flags + "\n"
			+ "originalText: " + this.originalText + "\n"
			+ "translations: " + this.translations + "\n"
			+ "currentTranslatedText: " + this.currentTranslatedText + "\n";
	}
}
