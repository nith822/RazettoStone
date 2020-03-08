import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user';

import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	userName: string = "yoloswag420";
	email: string = "bob.sanders@gmail.com";
	oAuthId: string = "420"
	
	users: User[] ;
	
	constructor(public userService: UserService) { }

	ngOnInit(): void {
		this.userService.getAllUsers().subscribe((users) => {
			for(let user of users) {
				console.log(user.toString());
			}
			this.users = users;
		});
	}

	registerUser(): boolean {
		this.userService.createUser(new User(this.userName, this.email, this.oAuthId));
		this.userService.getAllUsers().subscribe((users) => {
			for(let user of users) {
				console.log(user.toString());
			}
			this.users = users;
		});
		return false;
	}
}
