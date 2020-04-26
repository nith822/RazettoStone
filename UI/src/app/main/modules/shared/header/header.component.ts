import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from "../../../user/user.service";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(public route: ActivatedRoute, public router: Router, public userService: UserService) { }

	ngOnInit() {
	
	}
	
	navigate(path: string): void {
		this.router.navigateByUrl(path);
	}
}
