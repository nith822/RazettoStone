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

	isAddingTranslation: boolean = false;
	title: string;
	language: string;
	file: File;

	constructor(private route: ActivatedRoute, private router: Router, private location: Location, 
	public  translationService: TranslationService, public sidebarService: SidebarService) { }

	ngOnInit() {
		console.log("init TranslationComponent");
		const translationID = this.route.snapshot.params['id'];
		this.translationService.getPost(translationID).subscribe((translation) => {
			this.translation = translation;
			console.log(this.translation.getOriginalText(true).getTextLines());
		});
		
		this.sidebarService.setRouterAndRoute(this.router, this.route);
		
		if(!this.matchEndRoute(this.router.url)) {
			this.router.navigate([{outlets: { translations: [translationID]}}], {relativeTo: this.route, skipLocationChange: false});
		}
		
		this.router.events.subscribe((val) => {
			if(val instanceof NavigationEnd) {
				//console.log(val.url);
				if(val.url.indexOf('sidebar') != -1) {
					this.sidebarService.sideBarOpened = true;
				} else {
					this.sidebarService.sideBarOpened = false;
				}
			}
		});
	}
	
	@HostListener('window:popstate', ['$event'])
	onPopState(event) {
		let regexp = new RegExp('translations/translation/.*/[(]translations:.*[)]');
		if(this.router.url.match(regexp)) {
			console.log('Back button pressed on target url');
			this.location.back();
		}
	}
	
	matchEndRoute(url: string) {
		var endRegExp =  new RegExp('/translations/translation/.*/[(][^]*translations:.*/[(].*[)][)]');
		return url.match(endRegExp);
	}
	
	onClick(): void {
		this.sidebarService.toggleSideBar();
	}

	toggleTranslationForm(): void {
		this.isAddingTranslation = true;
		this.file = undefined
		this.translationService.emptyFile();
	}

	fileChanged(event: any): void {
		this.file = event.target.files[0];
		this.translationService.readFile(event.target.files[0]);
	}

	addTranslation(): void {
		console.log('Attempting to add translation to post')
		this.translationService.saveText(this.title, this.language);
		this.translationService.addTranslationToPost(this.translation.id, this.translationService.translatedText);
		this.isAddingTranslation = false;
		this.translationService.getPost(this.translation.id).subscribe((translation) => {
			this.translation = translation;
			console.log(this.translation.getOriginalText(true).getTextLines());
		});
	}
}
