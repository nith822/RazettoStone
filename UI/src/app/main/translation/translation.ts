import { Text } from './text/text';
import { TextLine } from './text/textLine';

import { Comment } from '../sidebar/comments/comment';
import { User } from '../user/user';

import { Interactible } from '../interactible/interactible'

export class Translation extends Interactible {	//Post
	
	
	tags: string[];
	
	originalText: Text;
	translations: Text[];
	 
	currentTranslatedText: Text;
	
	constructor(user?: User, title?: string, language?: string, comments?: Comment[], 
				upvotes?: string[], downvotes?: string[], 
				id?: string, dateCreated?: Date, 
				originalText?: Text, translations?: Text[], tags?: string[],
				enableProd?: boolean) {
			
		super(user, title, language, comments, upvotes, downvotes, id, dateCreated, enableProd);
		if(!originalText && enableProd) { throw new Error('No user for originalText Tranlsation Post'); } else { this.originalText = originalText;	};
		
		if(tags) { this.tags = tags; }
		
		
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
	
	encodeJSON(): any {
		let translationsJSON: any[] = [];
		for(let translation of this.translations) {
			if(translation) {
				translationsJSON.push(translation.encodeJSON());
			}
		}
		return Object.assign({}, super.encodeJSON(), {
			text: this.originalText.text,
			tags: this.tags,
			translations: translationsJSON,
		});
	}
	
	toString(): string {
		
		function buildString(tags: string[]): string {
			var str: string = "";
			str += "["
			for(let tag of tags) {
				str += tag + ", ";
			}
			str += "]"
			return str;
		}
		
		function buildTextsString(translatedTexts: Text[]): string {
			var str: string = "";
			str += "["
			for(let translatedText of translatedTexts) {
				str += translatedText.toString() + ", ";
			}
			str += "]"
			return str;
		}
		
		return "[" + "Attributes for Translation:: " + "\n" 
				+ super.toString() + "\n"
				+ "tags: " + buildString(this.tags) + "\n"
				+ "originalText: " + this.originalText.toString() + "\n"
				+ "translatedTexts: " + buildTextsString(this.translations) + "]" + "\n";
	}
}
