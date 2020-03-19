import { User } from '../../user/user';

export class Comment {
	
	text: string;
	user: User
	dateCreated: Date;
	replies: Comment[];
	
	//only send total # of votes for now
	upvotes: number;
	downvotes: number;
	
	constructor(text?: string, user?: User, dateCreated?: Date, replies?: Comment[], upvotes?: number, downvotes?: number) {
		
		if(text) { this.text = text; }
		if(user) { this.user = user; }
		if(dateCreated) { this.dateCreated = dateCreated; }
		if(replies) { this.replies = replies } else { this.replies = []; }
		if(upvotes) { this.upvotes = upvotes }
		if(downvotes) { this.downvotes = downvotes }
	}
	
	toString(): string {
		return "Attributes for comment:: " + "\n" 
			+ "text: " + this.text + "\n"
			+ "user: " + this.user + "\n"
			+ "dateCreated: " + this.dateCreated + "\n"
			+ "replies: " + this.replies + "\n";
	}
}