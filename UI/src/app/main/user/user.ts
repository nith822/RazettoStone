export class User {
	
	id: number;
	username: string;
	email: string;
	
	createdDate: Date;
	score: number;
	
	constructor(username: string, id?: number) {
		this.username = username;
		if(id) {
			this.id = id;
		}
	}
	
	toString(): string {
		return this.username;
	}
}