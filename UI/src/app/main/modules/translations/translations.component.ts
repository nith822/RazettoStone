import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Translation } from '../../translation/translation'
import { TranslationService } from '../../translation/translation.service';
import { Router, ActivatedRoute, Params, Data, NavigationEnd } from '@angular/router';

@Component({
  selector: 'translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent implements OnInit {

	translations: Translation[] = [];
	page: number;
	
	constructor(public  translationService: TranslationService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		console.log("init TranslationsComponent");
		this.page = 0;
		const translationID = this.route.snapshot.params['id'];
		this.retrievePosts();
	}

	
	navigate(path): void {
		this.router.navigate(['translation' + "\/" + path], {relativeTo: this.route, skipLocationChange: false});
	}

	retrievePosts(): void {
		this.translationService.search(this.page).subscribe((translations_list) => {
			console.log(translations_list);
			this.translations = translations_list;
		});
	}

	getAllPosts(): Translation[] {
		this.retrievePosts();
		return this.translations;
	}

	nextPage(): void {
		this.page = this.page + 1;
		console.log("Fetching page " + this.page);
		this.retrievePosts();
	}

	prevPage(): void {
		this.page = this.page - 1;
		console.log("Fetching page " + this.page);
		this.retrievePosts();
	}
}
