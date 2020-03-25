import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../user/user';
import { Text } from '../translation/text/text';
import { Comment } from '../sidebar/comments/comment';
import { Translation } from '../translation/translation';

import { UserService } from '../user/user.service';

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
	
	tags: string[];
	
	constructor(private http: HttpClient, private userService: UserService) { 
  
	}
	
	//COUPLED
	submit(originalText?: Text, translatedText?: Text, tags?: string[]): void { 
		var post: Translation = new Translation(this.originalText.user, this.originalText.title, this.originalText.language, this.originalText.comments, 
				this.originalText.upvotes, this.originalText.downvotes, 
				this.originalText.id, this.originalText.dateCreated, 
				this.originalText, [this.translatedText], this.tags);
		console.log(post.encodeJSON());
		this.uploadPost(post.encodeJSON());
	}
	
	
	//refactor later
	uploadPost(post): void {
		this.http.post(this.postsUrl, post, {headers: this.headers}).subscribe((data) => {
			console.log(data);
		}, (err) => {
			
		});		
	}
	
	
	saveText(isOriginal: boolean, title: string, language: string, tags: string[]): void {
		if(!isOriginal) {
			this.translatedText = this.createText(this.userService.getCurrentUser(), title, language, [], [], [], undefined, new Date(), 
									this.translatedTextString);
		} else {
			this.originalText = this.createText(this.userService.getCurrentUser(), title, language, [], [], [], undefined, new Date(), 
									this.originalTextString);
									
			this.tags = tags;
		}
		console.log(this.originalText.encodeJSON());
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
	
	createTranslation(user?: User, title?: string, language?: string, comments?: Comment[], 
				upvotes?: string[], downvotes?: string[], 
				id?: string, dateCreated?: Date, 
				originalText?: Text, translations?: Text[], tags?: string[]): Translation {
					
		return new Translation(user, title, language, comments, upvotes, downvotes, id, dateCreated, originalText, translations, tags);
		
	}
	
	createText(user?: User, title?: string, language?: string, comments?: Comment[], 
				upvotes?: string[], downvotes?: string[], 
				id?: string, dateCreated?: Date, 
				text?: string, flags?: string[][]): Text {
					
		return new Text(user, title, language, comments, upvotes, downvotes, id, dateCreated, text, flags);			
					
	}
	
}
