import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

	sideBarOpened: boolean = false;
	router: Router;
	route: ActivatedRoute;
	
	constructor() { }
	
	toggleSideBar(): void {
		this.sideBarOpened = !this.sideBarOpened;
		if(this.sideBarOpened) {
			this.router.navigate([{outlets: { sidebar: ['comments']}}], {relativeTo: this.route, skipLocationChange: false});
		} else {
			this.router.navigate([{outlets: { sidebar: null}}], {relativeTo: this.route, skipLocationChange: false});
		}
	}
	
	setRouterAndRoute(router: Router, route: ActivatedRoute) {
		this.router = router;
		this.route = route;
	}
	
	//route change listener
}
