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
		//translation/:id, translationID = ":id" param
		const translationID = this.route.snapshot.params['id'];
		this.translationService.getTranslations([translationID]).subscribe(translations =>
			this.translation = translations[translationID - 1],
		);
		//http://localhost:4200/translation/1/(translations:previews/(0))
		//jank
		//http://localhost:4200/translations/translation/1/(translations:previews//sidebar:comments)
		this.router.navigate([{outlets: { translations: [translationID]}}], {relativeTo: this.route, skipLocationChange: false});
	}
	
	@HostListener('window:popstate', ['$event'])
	onPopState(event) {
		console.log(this.router.url);
		if(this.router.url === '\/translations\/translation\/1\/(translations:previews)') {
			console.log('Back button pressed on target url');
			this.location.back();
		}
	}
	
	isValidTranslationTextEndpoint(url: string): boolean {
		let regexp = new RegExp('');
		console.log(url);
		if(url.charAt(url.length - 3) == '0') {	
			return true;
		}
		return false;
	}
	
	onClick(): void {
		this.router.navigate([{outlets: { sidebar: ['comments']}}], {relativeTo: this.route, skipLocationChange: true});
		this.sidebarService.toggleSideBar();
		console.log(this.sidebarService.sideBarOpened);
	}
}
