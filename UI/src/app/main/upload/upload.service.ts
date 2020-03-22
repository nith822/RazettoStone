import { Injectable } from '@angular/core';

import { User } from '../user/user';
import { Text } from '../translation/text/text';
import { Comment } from '../sidebar/comments/comment';
import { Translation } from '../translation/translation';

import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {


	originalTextFile: File;
	translatedTextFile: File;
	
	originalTextString: string;
	translatedTextString: string; 
	
	originalText: Text;
	translatedText: Text;
	
	tags: string;
	
	constructor(private userService: UserService) { 
  
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
