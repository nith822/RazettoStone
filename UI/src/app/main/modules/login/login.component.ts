import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user';

import { Observable, Subject } from 'rxjs';

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser} from "angularx-social-login";
import { stringify } from 'querystring';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


	user: SocialUser;
	loggedIn: boolean;

	//mock
	userName: string;
	email: string;
	oAuthId: string;
	
	users: User[] ;
	
	constructor(public userService: UserService, private authService: AuthService, private cookieService: CookieService) { }

	ngOnInit(): void {
		this.authService.authState.subscribe((user) => {
			this.user = user;
			this.loggedIn = (user != null);
			if(user) {
				console.log(user);
				this.userName = user.name;
				this.email = user.email;
				this.oAuthId = user.idToken;
				var result = this.registerUser(this.userName, this.email, this.oAuthId);
				if (result == false)
					this.loginUser(this.userName, this.email, this.oAuthId);
				this.cookieService.set('user_auth', this.oAuthId);
			}
		});
		
		//mock
		/*
		this.userService.getAllUsers().subscribe((users) => {
			for(let user of users) {
				console.log(user.toString());
			}
			this.users = users;
		});
		*/
		
	}
	// <------------------- register only if new, otherwise don't create user ---------------------------------->
	registerUser(userName, email, oAuthId): boolean {
		console.log("Attempting to register user");
		this.userService.createUser(new User(userName, email, oAuthId));

		this.userService.getAllUsers().subscribe((users) => {
			/*for(let user of users) {
				console.log(user.toString());
			}*/
			this.users = users;
		});
		return false;
	}

	loginUser(userName, email, oAuthId): boolean {
		console.log("Attempting to login existing user");
		var user_id;
		this.userService.getAllUsers().subscribe((users) => {
			for(let user of users) {
				if (user.userName == userName && user.email == email)
				{
					user_id = user.id
					console.log(user_id);
					this.userService.updateUser(new User(userName, email, oAuthId, null, null, user_id));
				}
			}
			this.users = users;
		});
		return false;
	}
	
	signInWithFB(): void {
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
	}
}
