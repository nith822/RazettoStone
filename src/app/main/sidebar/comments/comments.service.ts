import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from './comment';

import { User } from '../../user/user';
import { UserService } from '../../user/user.service';


@Injectable()
export class CommentsService {
	comments: Comment[];
	
	constructor(private userService: UserService) { 
		let user1: User;
		this.userService.getUsers([111]).subscribe((users) => {
			user1 = users[0];
			let comment1: Comment = new Comment("OMEGALUL", user1, new Date(), null, 1, 1);
			this.comments = [comment1];
		});
	}
	
	getComments(translationID: number): Observable<Comment[]>{
		return of(this.comments);
	}
}

