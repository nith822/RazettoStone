import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../user/user';
import { Text } from '../translation/text/text';
import { Comment } from '../sidebar/comments/comment';
import { Translation } from '../translation/translation';

import { UserService } from '../user/user.service';
import { Post, PostTranslation } from './serializer';

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
	
	constructor(private http: HttpClient, private userService: UserService) { 
  
	}
	
	//COUPLED
	//why is the string a seperate variable
	submit(originalText?: Text, originalTextString?: string, 
			tags?: string, 
			translatedText?: Text, translatedTextString?: string): void { 
		var post: Post;
		var translation: PostTranslation = undefined;
		if(this.translatedText) {
			translation = new PostTranslation(this.translatedText.title, this.translatedText.language, this.translatedTextString, this.translatedText.user.id, this.translatedText.dateCreated, 
									this.translatedText.upvotes, this.translatedText.downvotes, );
		} 
		post = new Post(this.originalText.title, this.originalText.language, this.originalTextString, this.originalText.user.id, this.originalText.dateCreated, 
									this.originalText.upvotes, this.originalText.downvotes, this.tags.split(","), translation,);
		this.uploadPost(post);
	}
	
	
	//refactor later
	uploadPost(post): void {
		this.http.post(this.postsUrl, post, {headers: this.headers}).subscribe((data) => {
			console.log(data);
		}, (err) => {
			
		});		
	}
	
	
	saveText(isOriginal: boolean, title: string, language: string, tags: string): void {
		if(!isOriginal) {
			this.translatedText = this.createText(this.userService.getCurrentUser(), title, language, [], [], [], undefined, new Date(), 
									this.translatedTextString);
		} else {
			this.originalText = this.createText(this.userService.getCurrentUser(), title, language, [], [], [], undefined, new Date(), 
									this.originalTextString);
									
			this.tags = tags;
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
