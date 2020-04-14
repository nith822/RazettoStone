import { Injectable } from '@angular/core';
import { Translation } from './translation';
import { Observable, of } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Text } from './text/text';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

	
let hoveredIndex: number = -1;

@Injectable()
export class TranslationService {
	
	private postsUrl: string = "/api/posts/"
	//headers: HttpHeaders  = new HttpHeaders(); 

	originalTextString: string;
	translatedTextString: string; 

	originalText: Text;
	translatedText: Text; 

	translations: Translation[];
	
	constructor(private userService: UserService, private http: HttpClient) {   
	
	}
	
	getAllPosts(): Observable<Translation[]>{
		console.log('component getAllPosts');
		return this.http.get(this.postsUrl).pipe(
		map(res => {
		let response: any = res;
		return response.map((translation) => {
			var _translation = new Translation(null, 
					translation.title, 
					translation.language, 
					null,
					translation.upvotes,
					translation.downvotes,
					translation._id,
					translation.dateCreated,
					translation.previewText,
					null,
					translation.tags);
				return _translation;
			});
		}));
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
