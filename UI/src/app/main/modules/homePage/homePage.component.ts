  
import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../../homePage/homePage.service';
import { Translation } from '../../translation/translation'

import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {

    searchString: string;
    translations: Translation[];
	
	constructor(public homePageService: HomePageService) { }

	ngOnInit(): void {
        console.log('init homePage component')
		this.searchString = this.homePageService.searchString;
		//this.homePageService.searchString = this.searchString;
	}

	submit(): void {
		this.homePageService.search().subscribe((translations_list) => {
			console.log(translations_list);
			this.translations = translations_list;
			this.homePageService.translations = translations_list;
		})
	}
	/*
	registerUser(userName, email, oAuthId): boolean {
		this.userService.createUser(new User(userName, email, oAuthId));
		this.userService.getAllUsers().subscribe((users) => {
			for(let user of users) {
				console.log(user.toString());
			}
			this.users = users;
		});
		return false;
	}*/
}