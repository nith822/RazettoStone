import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from "../../../user/user.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	color: string;
	
	constructor(public route: ActivatedRoute, public router: Router, public userService: UserService, public cookieService: CookieService) { }

	ngOnInit() {
		this.color = this.loadColor();
	}
	
	navigate(path: string): void {
		this.router.navigateByUrl(path);
	}

	canLogout(value): void {
		if (value == "logout")
			this.userService.logOut()
	}
	
	loadColor(): string {
		if(this.cookieService.check("color")) {
			var color = this.cookieService.get("color");
			this.changeBackgroundColor(color);
			return color;
		}
	}
	
	changeBackgroundColor(color): void {
		this.cookieService.set("color", color);
		document.body.style.backgroundColor = color;
	}
}
