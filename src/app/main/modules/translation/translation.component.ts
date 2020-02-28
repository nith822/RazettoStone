import { Component, OnInit, HostListener} from '@angular/core';
import { Location } from '@angular/common';
import { Translation } from '../../translation/translation'
import { TranslationService } from '../../translation/translation.service';
import { Router, ActivatedRoute, Params, Data, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../sidebar/sidebar.service';

import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

	translation: Translation;
	
	hoveredIndex: number = -1;
	
	constructor(private route: ActivatedRoute, private router: Router, private location: Location, 
	public  translationService: TranslationService, private sidebarService: SidebarService) { }

	ngOnInit() {
		console.log("init TranslationComponent");
		const translationID = this.route.snapshot.params['id'];
		this.translationService.getTranslations([translationID]).subscribe(translations =>
			this.translation = translations[translationID - 1],
		);
		this.router.navigate([{outlets: { translations: [translationID]}}], {relativeTo: this.route, skipLocationChange: false});
		this.sidebarService.setRouterAndRoute(this.router, this.route);
	}
	
	@HostListener('window:popstate', ['$event'])
	onPopState(event) {
		let regexp = new RegExp('/translations/translation/d+/(translations:d+)');
		console.log(this.router.url);
		if(this.router.url.match(regexp)) {
			console.log('Back button pressed on target url');
			this.location.back();
		}
	}
	
	onClick(): void {
		this.sidebarService.toggleSideBar();
	}
}
