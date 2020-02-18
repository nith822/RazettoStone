import { Injectable } from '@angular/core';
import { Translation } from './translation';
import { Observable, of } from 'rxjs';
import { Text } from './text/text';


let originalStrings: string[] = ['java','int','this'];
let translatedStrings: string[] = ['typescript','number','this'];

let comments: string[] = ["epic","wow","cringe"];

let originalText: Text = new Text(originalStrings);
let translatedText: Text = new Text(translatedStrings);
let translatedTexts: Text[] = [translatedText];

let mockTranslation: Translation = new Translation(originalText, translatedTexts);
	
@Injectable()
export class TranslationService {
	
	
	constructor() {   
	
	}
	
	getTranslations(translationIDs: number[]): Observable<Translation[]> {
		var translations: Translation[] = [];
		translations.push(mockTranslation);
		return of(translations);
	}
	
	
	getComments(translationID: number): Observable<string[]>{
		return of(comments);
	}
}
