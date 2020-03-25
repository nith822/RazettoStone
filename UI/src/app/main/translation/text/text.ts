import { TextLine } from './textLine';
import { User } from '../../user/user';
import { Comment } from '../../sidebar/comments/comment'

import { Interactible } from '../../interactible/interactible'

const MAX_CHARACTERS: number = 150;
	
export class Text extends Interactible {	//Translations
	
	text: string;
	textLines: TextLine[];	//Text
	//not in toString yet
	flags: string[][];
	
	constructor(user?: User, title?: string, language?: string, comments?: Comment[], 
				upvotes?: string[], downvotes?: string[], 
				id?: string, dateCreated?: Date, 
				text?: string, flags?: string[][], 
				enableProd?: boolean) {
		
		super(user, title, language, comments, upvotes, downvotes, id, dateCreated, enableProd);
		if(!text) { this.textLines = []	} else { this.text = text; this.textLines = this.parseText(text) };		
		if(flags) { this.flags = flags; }
		
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
	
	encodeJSON(): any {
		return Object.assign({}, super.encodeJSON(), {
			text: this.text,
		});
	}
	
	toString(): string {
		
		function buildString(textLines: TextLine[]): string {
			var str: string = "";
			str += "["
			for(let textLine of textLines) {
				str += textLine.toString() + ", ";
			}
			str += "]"
			return str;
		}
		
		return "[" + "Attributes for Text:: " + "\n" 
				+ super.toString() + "\n"
				+ "textLines: " + buildString(this.textLines) + "]" + "\n";
	}
}