import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';

let users: User[] = [];

@Injectable()
export class UserService {

	constructor() {
	
	
	}
	
	//use a map
	getUsers(userIDs?: number[], textIDs?: number[]): Observable<User[]> {
		return of(users);
	}
}
