import { User } from '../../user/user';

import { Interactible } from '../../interactible/interactible'

export class Comment extends Interactible {
	
	text: string;
	
	constructor(user?: User, title?: string, language?: string, comments?: Comment[], 
				upvotes?: number, downvotes?: number, 
				id?: string, dateCreated?: Date, 
				text?: string,
				enableProd?: boolean) {
		super(user, text, language, comments, upvotes, downvotes, id, dateCreated, enableProd);
		this.title = this.text;
		console.log(this.toString());
	}
	
	toString(): string {
		return super.toString() + "child";
	}
}