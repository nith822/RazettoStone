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

	originalTextString: string | ArrayBuffer;
	translatedTextString: string | ArrayBuffer; 
	
	constructor(private userService: UserService) { 
  
	}
  
	readFile(file: File, isOriginal: boolean): void {
		let fileReader = new FileReader();
		fileReader.onload = () => {
			console.log(fileReader.result);
			if(isOriginal) {
				this.originalTextString = fileReader.result;
			} else {
				this.translatedTextString = fileReader.result;
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
