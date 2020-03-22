import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {map, filter, catchError, mergeMap} from 'rxjs/operators'

@Injectable()
export class UserService {

	
	private usersUrl: string = "/api/users";
	headers: HttpHeaders  = new HttpHeaders(); 
	
	currentUser: User;
	
	
	constructor(private http: HttpClient,) {
	}
	
	getCurrentUser(): User {
		return this.currentUser;
	}
	
	//use a map
	getUsers(userIDs?: number[], textIDs?: number[]): Observable<User[]> {
		var users = [];
		return of(users);
	}
	 
	createUser(user: User): Observable<boolean> {
		var userCreated: boolean; 
		this.headers.set('Content-Type', 'application/json');
		this.http.post(this.usersUrl, user, {headers: this.headers}).subscribe((data) => {
			console.log(data);
			userCreated = true;
		}, (err) => {
			userCreated = false;
		});		
		return of(userCreated);
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
				var _user = new User(user.userName, user.email, user.oAuthId, user.dateCreated, user.languages, user.id);
				return _user;
			});
		}));
	}
}
