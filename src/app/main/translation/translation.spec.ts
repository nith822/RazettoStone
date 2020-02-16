import { Translation } from './translation';

let originalText : string[];
let translatedText : string[];
let translation: Translation;

describe('Translation', () => {
	
	beforeEach(() => {
		originalText = ['java','int','this'];
		translatedText = ['typescript','number','this'];
		translation = new Translation(originalText, translatedText);
	});
	
	it('should create an instance', () => {
		expect(new Translation(originalText, translatedText)).toBeTruthy();
	});
	
	it('should throw a constructor error', () => {
		var originalTextNull: string[] = null;
		var translatedTextNull: string[] = null;
		var originalTextEmpty: string[] = [];
		var translatedTextEmpty: string[] = [];
		Promise.all([
			expect(() => new Translation(originalTextEmpty, translatedText)).toThrow(new Error('originalText is null or length = 0')),
			expect(() => new Translation(originalText, translatedTextEmpty)).toThrow(new Error('translatedText is null or length = 0')),
			expect(() => new Translation(originalTextNull, translatedText)).toThrow(new Error('originalText is null or length = 0')),
			expect(() => new Translation(originalText, translatedTextNull)).toThrow(new Error('translatedText is null or length = 0')),
		]).then(() => {
				
		}).catch(() => {
				
		});
	});
	
	it('should grab the proper text', () => {
		var lineNumber = 0;
		Promise.all([
			expect(translation.getLine(true, lineNumber) === originalText[lineNumber]).toBeTruthy(),
			expect(translation.getLine(false, lineNumber) === translatedText[lineNumber]).toBeTruthy(),
		]).then(() => {
			
		}).catch(() => {
			
		});
	});
	
	it('should throw a getOriginalText error', () => {
		let lineNumber = originalText.length + 1;
		Promise.all([
			expect(() => translation.getLine(true, lineNumber)).toThrow(new Error('OUB in text. isOriginal: ' + true)),
		]).then(() => {
			lineNumber = -1;
			expect(() => translation.getLine(true, lineNumber)).toThrow(new Error('OUB in text. isOriginal: ' + true));
		}).catch(() => {
			
		});
	});
});
