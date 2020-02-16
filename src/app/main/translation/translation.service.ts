import { Injectable } from '@angular/core';
import { Translation } from './translation';
import { Observable, of } from 'rxjs';

let mockTranslation: Translation = new Translation(['java','int','bad','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \n aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a', 'a','a','a','a','a','a','a','a','a','a','a',],['typescript','number','good']);
	
@Injectable()
export class TranslationService {
	
	constructor() {   
	}
  
	getTranslations(translationIDs: number[]): Observable<Translation[]> {
		var translations: Translation[] = [];
		translations.push(mockTranslation);
		return of(translations);
	}
}
