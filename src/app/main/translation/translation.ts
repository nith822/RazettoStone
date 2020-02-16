export class Translation {
	originalText: string[];
	translatedText: string[];
	
	constructor(originalText: string[], translatedText: string[]) {
		if(!originalText || originalText.length == 0) {
			throw new Error('originalText is null or length = 0');
		}
		if(!translatedText || translatedText.length == 0) {
			throw new Error('translatedText is null or length = 0');
			
		}
		this.originalText = originalText;
		this.translatedText = translatedText;
	}
	
	getOriginalText(isOriginal: boolean): string[] {
		if(isOriginal) {
			return this.originalText;
		} else {
			return this.translatedText;
		}
	}
	
	getLine(isOriginal: boolean, line: number): string {
		if(this.getOriginalText(isOriginal).length < line || line < 0) {
			throw new Error('OUB in text. isOriginal: ' + isOriginal); 
		}
		return this.getOriginalText(isOriginal)[line];
	}
}
