export class Post {
	title: string;
	language: string;
	originalText: string;
	userID: string;
	dateCreated: Date;
	upvotes: string[];
	downvotes: string[];
	translations: PostTranslation;
	tags: string[];
	
	constructor(title: string, language: string, originalText: string, userID: string, dateCreated: Date, upvotes: string[], downvotes: string[], tags: string[],
	translation?: PostTranslation,) {
		this.title = title;
		this.language = language;
		this.originalText = originalText;
		this.userID = userID;
		this.dateCreated = dateCreated;
		this.upvotes = upvotes;
		this.downvotes = downvotes;
		this.tags = tags;
		
		
		this.translations = translation;
    }
}

export class PostTranslation {
	title: string;
	language: string;
	text: string;
	userID: string;
	dateCreated: Date;
	upvotes: string[];
	downvotes: string[];
	
	constructor(title: string, language: string, text: string, userID: string, dateCreated: Date, upvotes: string[], downvotes: string[],) {
		this.title = title;
		this.language = language;
		this.text = text;
		this.userID = userID;
		this.dateCreated = dateCreated;
		this.upvotes = upvotes;
		this.downvotes = downvotes;
    }
	
}