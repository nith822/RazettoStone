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
	
	
	constructor(private http: HttpClient,private cookieService: CookieService) {
		this.getUserFromCookies().subscribe((user) => {
			this.setCurrentUser(user);
			console.log("Set current user from cookies");
			console.log(user.toString());
		});
	}
	
	//currentUser is set to undefined if cookie="userId" && "_oAuthId" are not set
	getUserFromCookies(): Observable<User> {
		if(this.cookieService.check("userId") && this.cookieService.check("_oAuthId")) {
			var userId: string = this.cookieService.get("userId");
			var oAuthId: string = this.cookieService.get("_oAuthId");
			return this.getUser(userId);
		} else {
			return of(undefined);
		}
	}
	
	//clear all cookies as well
	logOut(): void {
		this.currentUser = undefined;
		this.cookieService.deleteAll('/');
	}
	
	getUser(userID: string): Observable<User> {
		return this.http.get(this.usersUrl + "/" + userID).pipe(map((res: any) => {
			console.log(res);
			if(res.status == 500) {
				return of(undefined);
			}
			var user = res.data
			var _user = new User(user.userName, user.email, user.oAuthId, user.dateCreated, user.languages, user._id);
			return _user;
		}));
	}
	
	setCurrentUser(user: User): void {
		this.currentUser = user;
	}
	
	getCurrentUser(): User {
		return this.currentUser;
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
	getUser(user: User): Observable<User> {
		return of(null);
		
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
