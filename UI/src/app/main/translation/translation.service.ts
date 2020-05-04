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

	searchString: string;
	
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
		return this.http.get(this.postsUrl + translationID).pipe(map((translation: any) => {
			console.log(translation);
			var _translation = new Translation(
					this.createUserFromJSON(translation.data.user_object), 
					translation.data.title, 
					translation.data.textLanguage, 
					null,
					translation.data.upvotes,
					translation.data.downvotes,
					translation.data._id,
					translation.data.dateCreated,
					new Text(this.createUserFromJSON(translation.user_object), 
						translation.data.title, 
						translation.data.textLanguage, 
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
		return this.http.get(this.postsUrl + translationID + "/translations").pipe(
		map(res => {
		let response: any = res;
		return response.map((_text) => {
			console.log(_text);
			var _text_ = new Text(
					this.createUserFromJSON(_text.user_object), 
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
		return this.http.get(this.postsUrl + translationID + "/translations/" + translationTextID).pipe(map((_text: any) => {
			console.log(_text);
			var _text_ = new Text(
					this.createUserFromJSON(_text.user_object), 
					_text.title, 
					_text.textLanguage, 
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
    search(page?: number): Observable<Translation[]> {
		console.log('search string = '+this.searchString)
		if (this.searchString != undefined && this.searchString.trim())
		{
		  return this.http.get(this.searchUrl+this.searchString).pipe(
			map(res => {
			let response: any = res;
			return response.data.map((translation) => {
					  var _translation = new Translation(this.createUserFromJSON(translation.user_object), 
														  translation.title, 
														  translation.textLanguage, 
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
		let params: HttpParams;
		if (page != undefined)
			params = new HttpParams().set('page', page.toString());
		return this.http.get(this.postsUrl, { params }).pipe(
		  map(res => {
		  let response: any = res;
		  return response.map((translation) => {
					//console.log(translation);
					//first null is comments
					//second null is texts
					var _translation = new Translation(this.createUserFromJSON(translation.user_object), 
														translation.title, 
														translation.textLanguage, 
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

	votePost(postID: string, userID: string, vote: boolean): Observable<any> {
		return this.http.put(this.postsUrl + postID + "/vote", {"vote": vote, "userID": userID}).pipe(map(res => {
			console.log(res)
		}));
	}

	voteTranslation(postID: string, translationID: string, userID: string, vote: boolean): Observable<any> {
		return this.http.put(this.postsUrl + postID + "/translations/" + translationID + "/vote", {"vote": vote, "userID": userID})
	}
	
	//user sends as an array
	createUserFromJSON(_userJSON: any): User {
		if(_userJSON) {
			var userJSON = _userJSON[0];
			return new User(userJSON.userName, null, null, userJSON.dateCreated, null, userJSON.id);
		} else {
			return new User("Anonymous", null, null, null, null, null);
		}
	}
}
