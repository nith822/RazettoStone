import { Component, OnInit } from '@angular/core';
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
		console.log("init commentsComponent");
		this.commentsService.getComments(1).subscribe((comments) => {
			this.currentComments = comments;
		});
		this.routeParams = this.sidebarService.getCurrentRouteParams();
	}
	
	submitComment(text: string): void {
		this.commentsService.postComment(new Comment(this.userService.getCurrentUser(), text, "english"), this.routeParams.translationID, this.routeParams.translationTextID);
	}
}
 