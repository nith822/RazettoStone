import { Injectable } from '@angular/core';
import { Translation } from './translation';
import { Observable, of } from 'rxjs';
import { Text } from './text/text';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

	
let hoveredIndex: number = -1;

@Injectable()
export class TranslationService {
	
	
	constructor(private userService: UserService) {   
	
	}
	
	
	getTranslations(translationIDs: number[]): Observable<Translation[]> {
		var translations: Translation[];
		return of(translations);
	}
	

	getTranslationText(translationID: number, translationTextIDs: number[]): Observable<Text[]> {
		var texts: Text[];
		return of(texts);
	}
	
}