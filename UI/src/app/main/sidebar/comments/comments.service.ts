import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from './comment';

import { User } from '../../user/user';
import { UserService } from '../../user/user.service';


@Injectable()
export class CommentsService {
	
	private postsUrl: string = "/api/posts";
	headers: HttpHeaders  = new HttpHeaders(); 
	
	comments: Comment[];
	
	constructor(private http: HttpClient, private userService: UserService) { 
	}
	
	getComments(translationID: number): Observable<Comment[]>{
		return of(this.comments);
	}
	
	postComment(comment: Comment, postID: string, translationID?: string): void {
		if(!translationID) {
			this.http.post(this.postsUrl + "/" + postID + "/comments", comment.encodeJSON(), {headers: this.headers}).subscribe((data) => {
				console.log(data);
			}, (err) => {
				console.log(err);
			});	
		} else {
			this.http.post(this.postsUrl + "/" + postID + "/translations" + "/" + translationID + "/comments", comment.encodeJSON(), {headers: this.headers}).subscribe((data) => {
				console.log("translation");
				console.log(data);
			}, (err) => {
				console.log(err);
			});	
		}
	}
}

