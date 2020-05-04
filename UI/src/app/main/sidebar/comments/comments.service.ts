import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from './comment';
import { Translation } from '../../translation/translation'

import { User } from '../../user/user';
import { UserService } from '../../user/user.service';


@Injectable()
export class CommentsService {
	
	private postsUrl: string = "/api/posts";
	headers: HttpHeaders  = new HttpHeaders(); 
	
	comments: Comment[];
	
	constructor(private http: HttpClient, private userService: UserService) { 
	}
	
	getComments(postID: string): Observable<Comment[]>{
		console.log("GET COMMENTS " + postID);
		//if(!translationID) {
			return this.http.get(this.postsUrl + "/" + postID + "/comments", {headers: this.headers}).pipe(
				map(function(res) {
					let response: any = res;
					console.log("ASDF");
					console.log("response: " + response);
					this.comments = response.map(comment => {
						if (comment.user_object) {
							return new Comment(comment.user_object, comment.text, comment.language);
						} else {
							console.log('that comment didn\'t have a user');
							return new Comment(null, comment.text, comment.language);
						}
					});
					return this.comments;
				}));
			/*}, (err) => {
				console.log(err);
			});*/
		/*} else {
			this.http.post(this.postsUrl + "/" + postID + "/translations" + "/" + translationID + "/comments", {headers: this.headers}).subscribe((data) => {
				console.log("comments: " + data);
				this.comments = data;
			}, (err) => {
				console.log(err);
			});	
		}*/

		//console.log(this.comments);
		//return of(this.comments);
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

