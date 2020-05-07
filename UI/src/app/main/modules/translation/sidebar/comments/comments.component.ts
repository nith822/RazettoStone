import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from '../../../../sidebar/comments/comment';
import { CommentsService } from '../../../../sidebar/comments/comments.service';
import { UserService } from '../../../../user/user.service';

 
import { SidebarService, RouteParams } from '../../../../sidebar/sidebar.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

	currentCommentText: string;
	
	currentComments: Comment[];
	routeParams: RouteParams;
	
	constructor(private userService: UserService, private commentsService: CommentsService, private sidebarService: SidebarService,
				) { } 

	ngOnInit() {
		this.routeParams = this.sidebarService.getCurrentRouteParams();
		//console.log("init commentsComponent");
		this.retrieveComments();
	}
	
	submitComment(text: string): void {
		this.commentsService.postComment(new Comment(this.userService.getCurrentUser(), text, "english"), this.routeParams.translationID, this.routeParams.translationTextID).subscribe((success)=> {this.retrieveComments()});
    //setTimeout(null, 500); we need to wait for the post request to go through
    //this.retrieveComments();
	}

	retrieveComments(): Comment[] {
		let commentsObservable = this.commentsService.getComments(this.routeParams.translationID);
		commentsObservable.subscribe(comments => this.currentComments = comments);
		return this.currentComments;
	}
}
 
