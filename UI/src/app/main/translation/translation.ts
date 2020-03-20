import { Text } from './text/text';
import { TextLine } from './text/textLine';

import { Comment } from '../sidebar/comments/comment';
import { User } from '../user/user';

import { Interactible } from '../interactible/interactible'

export class Translation extends Interactible {	//Post
	
	
	tags: string[];
	
	//should flags go into post? don't they go into translation?
	//[flagIndex][userName]
	flags: string[][];
	
	originalText: Text;
	translations: Text[];
	 
	currentTranslatedText: Text;
	
	constructor(user?: User, title?: string, language?: string, comments?: Comment[], 
				upvotes?: number, downvotes?: number, 
				id?: string, dateCreated?: Date, 
				originalText?: Text, translations?: Text[], tags?: string[], flags?: string[][],
				enableProd?: boolean) {
			
		super(user, title, language, comments, upvotes, downvotes, id, dateCreated, enableProd);
		if(!originalText && enableProd) { throw new Error('No user for originalText Tranlsation Post'); } else { this.originalText = originalText;	};
		
		if(tags) { this.tags = tags; }
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
		if(this.getOriginalText(isOriginal).getTextLines().length <= line ||line < 0) {
			throw new Error('OUB in text. isOriginal: ' + isOriginal + " line: " + line); 
		}
		return this.getOriginalText(isOriginal).getTextLine(line);
	}
	
	addTag(tag: string): void {
		this.tags.push(tag);
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
