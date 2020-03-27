import { Comment } from '../sidebar/comments/comment';
import { User } from '../user/user';

export abstract class Interactible {
	
	user: User;
	title: string;
	language: string;
	comments: Comment[];
	 
	upvotes: string[];
	downvotes: string[];
	
	id: string;
	dateCreated: Date;
	
	constructor(user?: User, title?: string, language?: string, comments?: Comment[], 
				upvotes?: string[], downvotes?: string[], 
				id?: string, dateCreated?: Date, 
				enableProd?: boolean) {
					
		if(!user && enableProd) { throw new Error('No user for Text') } else { this.user = user }
		if(!title && enableProd) { throw new Error('No title for Text') } else { this.title = title }
		if(!language && enableProd) { throw new Error('No language for Text') } else { this.setLanguage(language) }
		if(comments) { this.comments = comments } else { this.comments = [] }
		
		if(upvotes) { this.upvotes = upvotes } else { this.upvotes = [] }
		if(downvotes) { this.downvotes = downvotes } else { this.downvotes = []}
		
		if(!id && enableProd) { throw new Error('No id for Text') } else { this.id = id  }
		if(dateCreated) { this.dateCreated = dateCreated; } else { this.dateCreated = new Date() }
	}
	
	setLanguage(language: string): void {
		this.language = language;
	}
	
	
	addComment(comment: Comment): void {
		this.comments.push(comment);
	}
	
	encodeJSON(): any {
		let commentsJSON: any[] = [];
		for(let comment of this.comments) {
			commentsJSON.push(comment.encodeJSON());
		}
		return {
			userID: this.user.id,
			title: this.title,
			language: this.language,
			comments: commentsJSON,
	
			upvotes: this.upvotes,
			downvotes: this.downvotes,
	
			id: this.id,
			dateCreated: this.dateCreated,
		}
	}
	
	toString(): string {
		
		function buildString(votes: string[]): string {
			var str: string = "";
			str += "["
			for(let vote of votes) {
				str += vote + ", ";
			}
			str += "]"
			return str;
		}
		
		return "[" + "Attributes for interactible:: " + "\n" 
			+ "user: " + this.user.toString() + "\n"
			+ "title: " + this.title + "\n"
			+ "language: " + this.language + "\n"
			+ "comments: " + this.comments + "\n"
			+ "upvotes: " + buildString(this.upvotes) +"\n"
			+ "downvotes: " + buildString(this.downvotes) + "\n"
			+ "id: " + this.id + "\n"
			+ "dateCreated: " + this.dateCreated + "]" + "\n";
	}
}