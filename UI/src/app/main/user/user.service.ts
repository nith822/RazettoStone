import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';



let user1: User = new User("Based boy", 111);
let user2: User = new User("Soy machine", 222);

let user3: User = new User("Gutenberg", 333);
let user4: User = new User("Sca-Ji", 444);

let allUsers: User[] = [user1, user2, user3, user4];

@Injectable()
export class UserService {

	constructor() {
	
	
	}
	
	//use a map
	getUsers(userIDs?: number[], textIDs?: number[]): Observable<User[]> {
		var users: User[] = [];
		if(userIDs) {
			for(let userID of userIDs) {
				for(let user of allUsers) {
					if(user.id == userID) {
						users.push(user);
					}
				}
			}
		}
		return of(users);
	}
}
