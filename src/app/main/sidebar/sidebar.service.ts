import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

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
		console.log(this.getCurrentRouteParams().toString());
		if(this.sideBarOpened) {
			this.router.navigate([{outlets: { sidebar: ['comments']}}], {relativeTo: this.route, skipLocationChange: false});
		} else {
			this.router.navigate([{outlets: { sidebar: null}}], {relativeTo: this.route, skipLocationChange: false});
		}
	}
	
	setRouterAndRoute(router: Router, route: ActivatedRoute) {
		this.router = router;
		this.route = route;
		if(router.url.indexOf('sidebar') != -1) {
			console.log("sidebarToggled");
			this.sideBarOpened = true;
		}
	}
	
	getCurrentRouteParams(): RouteParams {
		//translations/translation/1/(translations:1/(0))
		var routeParamsArr: any[] = this.router.url.match(/\d+/g);
		if(routeParamsArr.length == 2) {
			return new RouteParams(routeParamsArr[1]);
		}
		if(routeParamsArr.length == 3) {
			return new RouteParams(routeParamsArr[1], routeParamsArr[2]);
		}
		return undefined;
	}
}

export class RouteParams {
	
	
		translationID: number = undefined;
		translationTextID: number = undefined;
		translationTextLineID: number = undefined;
		
		ids: number[];
		
		constructor(translationID?: number, translationTextID?: number, translationTextLineID?: number) {
			if(translationID) { this.translationID = translationID; }
			if(translationTextID) { this.translationTextID = translationTextID; }
			if(translationTextLineID) { this.translationTextLineID = translationTextLineID; }
			this.ids = [this.translationID, this.translationTextID, this.translationTextLineID];
		}
		
		getID(position: number): number {
			return this.ids[position];
		}
		
		toString(): string {
			return "translationID:: " + this.translationID + "\n"
					+ "translationTextID:: " + this.translationTextID + "\n"
					+ "translationTextLineID:: " + this.translationTextLineID;
		}
}