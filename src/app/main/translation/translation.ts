import { Text } from './text/text';
import { TextLine } from './text/textLine';

export class Translation {
	
	originalText: Text;
	translatedTexts: Text[];
	
	currentTranslatedText: Text;
	
	constructor(originalText: Text, translatedTexts: Text[]) {
		if(!originalText) {
			throw new Error('originalText is null');
		}
		if(!translatedTexts || translatedTexts.length == 0) {
			throw new Error('translatedText is null');
			
		}
		this.originalText = originalText;
		this.translatedTexts = translatedTexts;
		this.currentTranslatedText = translatedTexts[0];
	}
	
	getOriginalText(isOriginal: boolean): Text {
		if(isOriginal) {
			return this.originalText;
		} else {
			return this.currentTranslatedText;
		}
	}
	
	getTextLine(isOriginal: boolean, line: number): TextLine {
		if(this.getOriginalText(isOriginal).getTextLines().length < line || line < 0) {
			throw new Error('OUB in text. isOriginal: ' + isOriginal); 
		}
		return this.getOriginalText(isOriginal).getTextLine(line);
	}
}
