import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

	sideBarOpened = false;
	
	constructor() { }
	
	toggleSideBar(): void {
		this.sideBarOpened = !this.sideBarOpened;
	}
}
