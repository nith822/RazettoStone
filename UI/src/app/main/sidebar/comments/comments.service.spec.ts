import { TestBed } from '@angular/core/testing';

import { Comment } from './comment'
import { CommentsService } from './comments.service';

import { User } from '../../user/user';
import { UserService } from '../../user/user.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('CommentsService', () => { 

	let httpClient: HttpClient;
	let commentsService: CommentsService;
	
	beforeEach(() => { 
		TestBed.configureTestingModule({
			imports: [ HttpClientModule ],
			providers: [UserService, CommentsService,]
		});
		

		httpClient = TestBed.inject(HttpClient);
		
		commentsService = TestBed.get(CommentsService);
	});
	
	it('should comment on a post', () => {
		let user: User = new User("420yoloswag", "bob.sanders@gmail.com", "123", new Date(), [], "123");
		let text: string = "hello world"
		let language: string = "Ok";
		let comments: Comment[] = [];
		
		let upvotes: string[] = [];
		let downvotes: string[] = [];
		
		let id: string = "123";
		let dateCreated: Date = new Date();
		
		let enableProd: boolean = true;
		
		let postID = "5e7e7eec02288e09c8f4a5fa";
		let comment = new Comment(user, text, language, comments, upvotes, downvotes, id, dateCreated, enableProd);
		commentsService.postComment(comment, postID);
	});
	
	it('should comment on a translation', () => {
		let user: User = new User("420yoloswag", "bob.sanders@gmail.com", "123", new Date(), [], "123");
		let text: string = "hello world"
		let language: string = "Ok";
		let comments: Comment[] = [];
		
		let upvotes: string[] = [];
		let downvotes: string[] = [];
		
		let id: string = "123";
		let dateCreated: Date = new Date();
		
		let enableProd: boolean = true;
		
		let postID = "5e7e7eec02288e09c8f4a5fa";
		let translationID = "5e7e7eec02288e09c8f4a5fb";
		let comment = new Comment(user, text, language, comments, upvotes, downvotes, id, dateCreated, enableProd);
		commentsService.postComment(comment, postID, translationID);
	});
});
