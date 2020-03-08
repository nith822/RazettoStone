import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {

	private usersUrl: string = "/api/users";
	headers: HttpHeaders  = new HttpHeaders(); 
	
	constructor(private http: HttpClient,) {
	}
	
	//use a map
	getUsers(userIDs?: number[], textIDs?: number[]): Observable<User[]> {
		let users = [];
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
	
}
