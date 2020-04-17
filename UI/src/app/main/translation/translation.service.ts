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
	private searchUrl: string = "/api/posts/search/";
	//headers: HttpHeaders  = new HttpHeaders(); 

	originalTextString: string;
	translatedTextString: string; 

	originalText: Text;
	translatedText: Text; 

	searchString: string;
	translations: Translation[];
	
	constructor(private userService: UserService, private http: HttpClient) {   
	
	}
	/*
	getAllPosts(): Observable<Translation[]>{
		console.log('component getAllPosts');
		return this.http.get(this.postsUrl).pipe(
		map(res => {
		let response: any = res;
		return response.map((translation) => {
			var _translation = new Translation(
					null, 
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
	}*/
	
	getPost(translationID: string): Observable<Translation> {
		var translation: Translation;
		return this.http.get(this.postsUrl + "/" + translationID).pipe(map((translation: any) => {
			//console.log(translation);
			var _translation = new Translation(
					null, 
					translation.data.title, 
					translation.data.language, 
					null,
					translation.data.upvotes,
					translation.data.downvotes,
					translation.data._id,
					translation.data.dateCreated,
					new Text(null, 
						translation.data.title, 
						translation.data.language, 
						null,
						translation.data.upvotes,
						translation.data.downvotes,
						translation.data._id,
						translation.data.dateCreated,
						translation.data.text,
						null),
					null,
					translation.data.tags);
				
				return _translation;
			}));
	}
	
	getTranslationPreview(translationID: string): Observable<Text[]> {
		return this.http.get(this.postsUrl + "/" + translationID + "/translations").pipe(
		map(res => {
		let response: any = res;
		return response.map((_text) => {
			console.log(_text);
			var _text_ = new Text(
					null, 
					_text.title, 
					_text.language, 
					null,
					_text.upvotes,
					_text.downvotes,
					_text._id,
					_text.dateCreated,
					_text.text,
					null,
					_text.tags);
				return _text_
			});
		}));
	}

	getTranslationText(translationID: string, translationTextID: string): Observable<Text> {
		return this.http.get(this.postsUrl + "/" + translationID + "/translations/" + translationTextID).pipe(map((_text: any) => {
			console.log(_text);
			var _text_ = new Text(
					null, 
					_text.title, 
					_text.language, 
					null,
					_text.upvotes,
					_text.downvotes,
					_text._id,
					_text.dateCreated,
					_text.text,
					null,
					_text.tags);
				return _text_
			}));
	}
	
	// map user id and comments and translation array
    search(): Observable<Translation[]> {
		console.log('search string = '+this.searchString)
		if (this.searchString != undefined && this.searchString.trim())
		{
		  return this.http.get(this.searchUrl+this.searchString).pipe(
			map(res => {
			let response: any = res;
			return response.data.map((translation) => {
					  var _translation = new Translation(null, 
														  translation.title, 
														  translation.language, 
														  null,
														  translation.upvotes,
														  translation.downvotes,
														  translation._id,
														  translation.dateCreated,
														  translation.text,
														  null,
														  translation.tags);
			  return _translation;
		  });
		}));
	  }
	  else
	  {
		//let param = new HttpParams()
		//param.append('postsPerPage', '20');
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
	}
}
