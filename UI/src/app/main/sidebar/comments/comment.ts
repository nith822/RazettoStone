import { User } from '../../user/user';

export class Comment {
	
	translationID: number;
	translationTextID: number;
	
	text: string;
	user: User
	dateCreated: Date;
	replies: Comment[];
	
	constructor(text: string, user: User, dateCreated: Date, replies: Comment[], 
				translationID: number, translationTextID?: number) {
		
		if(text) { this.text = text; }
		if(user) { this.user = user; }
		if(dateCreated) { this.dateCreated = dateCreated; }
		if(replies) { this.replies = replies } else { this.replies = []; }
		if(translationID) { this.translationID = translationID }
		if(translationTextID) { this.translationTextID = translationTextID; } else { this.translationTextID = -1; }
					
					
	}
	
}