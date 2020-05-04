import { User } from '../../user/user';

import { Interactible } from '../../interactible/interactible'

export class Comment extends Interactible {
	
	text: string;
	
	constructor(user?: User, text?: string, textLanguage?: string, comments?: Comment[], 
				upvotes?: string[], downvotes?: string[], 
				id?: string, dateCreated?: Date, 
				enableProd?: boolean) {
		super(user, text, textLanguage, comments, upvotes, downvotes, id, dateCreated, enableProd);
		this.text = text;
	}
	
	encodeJSON(): any {
		return Object.assign({}, super.encodeJSON(), {
			title: undefined,
			text: this.text,
		});
	}
	
	toString(): string {
		return "[" + "Attributes for comment:: " + "\n" 
				+ super.toString() + "\n"
				+ "text: " + this.text + "]" + "\n";
	}
}