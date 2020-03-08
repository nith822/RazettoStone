export class User {
	
	
	private id: string;
	userName: string;
	private email: string;
	
	dateCreated: Date;
	languages: string[];
	
	private oAuthId: string;
	
	constructor(userName: string, email: string, oAuthId: string,
		dateCreated?: Date, languages?: string[], id?: string ) {
		this.userName = userName;
		this.setOAuthID(oAuthId);
		this.setEmail(email);
		
		if(dateCreated)	{	this.dateCreated = dateCreated	};
		if(languages)	{	this.languages = languages	};
		if(id)			{	this.setID(id)	};
	}
	
	setID(id: string): void {
		this.id = id;
	}
	
	getID(): string {
		return this.id;
	}
	
	setEmail(email: string): void {
		this.email = email;
	}
	
	getEmail(): string {
		return this.email;
	}
	
	setOAuthID(oAuthId: string): void {
		this.oAuthId = oAuthId
	}
	
	getOAuthID(): string {
		return this.oAuthId;
	}
	
	toString(): string {
		return "username:: " + this.userName + "\n"
			+ "id:: " + this.id  + "\n"
			+ "email:: " + this.email  + "\n"
			+ "dateCreated on" + this.dateCreated + "\n"
			+ "languages" + this.languages;
			+ "oAuthId" + this.oAuthId;
	}
}