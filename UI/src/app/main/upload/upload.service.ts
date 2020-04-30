import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../user/user';
import { Text } from '../translation/text/text';
import { Comment } from '../sidebar/comments/comment';
import { Translation } from '../translation/translation';

import { UserService } from '../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

	private postsUrl: string = "/api/posts";
	headers: HttpHeaders  = new HttpHeaders(); 

	originalTextFile: File;
	translatedTextFile: File;
	
	originalTextString: string;
	translatedTextString: string; 
	
	originalText: Text;
	translatedText: Text; 
	
	tags: string;
	
	constructor(private http: HttpClient, private userService: UserService, private router: Router) { 
  
	}
	
	//COUPLED
	submit(postID?: string): void { 
		if(this.originalText) {
			var post: Translation = new Translation(this.originalText.user, this.originalText.title, this.originalText.language, this.originalText.comments, 
					this.originalText.upvotes, this.originalText.downvotes, 
					this.originalText.id, this.originalText.dateCreated, 
					this.originalText, [this.translatedText], this.tags.split(','));
			console.log(post.encodeJSON());
			this.uploadPost(post.encodeJSON());
		} else {
			this.translatedText.user = this.userService.getCurrentUser();
			this.addTranslationToPost(postID, this.translatedText);
		}
		this.router.navigateByUrl('/translations');
	}
	
	
	//refactor later
	//create post
	uploadPost(post): void {
		this.http.post(this.postsUrl, post, {headers: this.headers}).subscribe((data) => {
			console.log(data);
		}, (err) => {
			console.log(err);
		});		
	}
	
	//add translation to post
	addTranslationToPost(postID: string, translation): void {
		this.http.post(this.postsUrl + "/" + postID + "/" + "translations", {userID: translation.user.id,
																				title: translation.title,
																				language: translation.language,
																				text: translation.text}, {headers: this.headers}).subscribe((data) => {
			console.log(data);
		}, (err) => {
			console.log(err);
		});	
	}
	
	
	//don't create a text if the user has not uploaded a file yet
	saveText(isOriginal: boolean, title: string, language: string, tags: string): void {
		if(!isOriginal) {
			if(!this.translatedTextString) {
				return;
			}
			this.translatedText = new Text(this.userService.getCurrentUser(), title, language, [], [], [], undefined, new Date(), this.translatedTextString);
		} else {
			if(!this.originalTextString) {
				return;
			}
			this.originalText = new Text(this.userService.getCurrentUser(), title, language, [], [], [], undefined, new Date(), this.originalTextString);
			this.tags = tags;
			console.log(this.originalText.encodeJSON());
		}
		console.log("Text created");
	}
	
	//casting to string is crazy inefficient, but I have less than 50mb of data left...
	readFile(file: File, isOriginal: boolean): void {
		let fileReader = new FileReader();
		fileReader.onload = () => {
			console.log(fileReader.result);
			if(isOriginal) {
				this.originalTextFile = file;
				this.originalTextString = <string>(fileReader.result);
			} else {
				this.translatedTextFile = file;
				this.translatedTextString = <string>(fileReader.result);
			}
		};
		fileReader.readAsText(file);
	}
}
