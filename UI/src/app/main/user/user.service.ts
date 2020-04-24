import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {map, filter, catchError, mergeMap} from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

	
	private usersUrl: string = "/api/users";
	headers: HttpHeaders  = new HttpHeaders(); 
	
	currentUser: User;
	num: number = 0;
	
	
	constructor(private http: HttpClient,) {
		
	}
	
	setCurrentUser(user: User): void {
		this.currentUser = user;
		this.num = 1;
		console.log(this.num);
	}
	
	getCurrentUser(): User {
		console.log(this.num);
		return this.currentUser;
	}
	
	//use a map
	getUsers(userIDs?: number[], textIDs?: number[]): Observable<User[]> {
		var users = [];
		return of(users);
	}
	 
	createUser(user: User): Observable<boolean> {
		var userCreated = false; 
		this.headers.set('Content-Type', 'application/json');
		this.http.post(this.usersUrl, user, {headers: this.headers}).subscribe((data) => {
			console.log(data);
			this.setCurrentUser(user);
			userCreated = true;
		}, (err) => {
			userCreated = false;
		});		
		return of(userCreated);
	}

	updateUser(user: User): Observable<boolean> {
		var userUpdated: boolean;
		this.headers.set('Content-Type', 'application/json');
		this.http.put(this.usersUrl+'/'+user.getID(), user, {headers: this.headers}).subscribe((data) => {
			console.log("mydata+ " + data);
			userUpdated = true;
		}, (err) => {
			userUpdated = false;
		});
		return of(userUpdated);
	}
	
	/*
	getAllUsers(): Observable<any> {
		return this.http.get(this.usersUrl);
	}
	*/
	
	getAllUsers(): Observable<User[]> {
		return this.http.get(this.usersUrl).pipe(
			map(res => {
			let response: any = res;
			return response.data.map((user) => {
				var _user = new User(user.userName, user.email, user.oAuthId, user.dateCreated, user.languages, user._id);
				return _user;
			});
		}));
	}
}
