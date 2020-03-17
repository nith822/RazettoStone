import { User } from '../../user/user';

export class Comment {
	
	text: string;
	user: User
	dateCreated: Date;
	replies: Comment[];
	
	constructor(text: string, user: User, dateCreated: Date, replies: Comment[]) {
		
		if(text) { this.text = text; }
		if(user) { this.user = user; }
		if(dateCreated) { this.dateCreated = dateCreated; }
		if(replies) { this.replies = replies } else { this.replies = []; }
					
	}
	
	toString(): string {
		return "Attributes for comment:: " + "\n" 
			+ "text: " + this.text + "\n"
			+ "user: " + this.user + "\n"
			+ "dateCreated: " + this.dateCreated + "\n"
			+ "replies: " + this.replies + "\n";
	}
}