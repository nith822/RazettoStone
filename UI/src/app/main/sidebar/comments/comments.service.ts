import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from './comment';

import { User } from '../../user/user';
import { UserService } from '../../user/user.service';


@Injectable()
export class CommentsService {
	comments: Comment[];
	
	constructor(private userService: UserService) { 
	}
	
	getComments(translationID: number): Observable<Comment[]>{
		return of(this.comments);
	}
}

