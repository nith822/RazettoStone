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

	file: File;
	fileContent: string;
	
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
		return this.http.get(this.postsUrl + translationID + "/translations").pipe(
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
		return this.http.get(this.postsUrl + translationID + "/translations/" + translationTextID).pipe(map((_text: any) => {
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
    search(page?: number): Observable<Translation[]> {
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
		let params: HttpParams;
		if (page != undefined)
			params = new HttpParams().set('page', page.toString());
		return this.http.get(this.postsUrl, { params }).pipe(
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

	votePost(postID: string, userID: string, vote: boolean): Observable<any> {
		return this.http.put(this.postsUrl + postID + "/vote", {"vote": vote, "userID": userID}).pipe(map(res => {
			console.log(res)
		}));
	}

	voteTranslation(postID: string, translationID: string, userID: string, vote: boolean): Observable<any> {
		return this.http.put(this.postsUrl + postID + "/translations/" + translationID + "/vote", {"vote": vote, "userID": userID})
	}

	readFile(file: File): void {
		let fileReader = new FileReader();
		fileReader.onload = () => {
			console.log(fileReader.result);
			this.file = file;
			this.fileContent = <string>(fileReader.result);
		};
		fileReader.readAsText(file);
	}

	saveText(title: string, language: string): void {
		this.translatedText = new Text(this.userService.getCurrentUser(), title, language, [], [], [], undefined, new Date(), this.fileContent);
		console.log(this.translatedText.encodeJSON());
		console.log("Text created");
	}

	addTranslationToPost(postID: string, translation): void {
		this.http.post(this.postsUrl + postID + "/" + "translations",
				{userID : this.userService.getCurrentUser().id,
					title: translation.title,
					language: translation.language,
					text: translation.text}).subscribe((data) => {
			console.log(data);
		}, (err) => {
			console.log(err);
		});	
	}

	emptyFile(): void {
		this.file = undefined;
		this.fileContent = "";
	}
}
