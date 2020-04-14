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
	
	constructor(public  translationService: TranslationService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		console.log("init TranslationsComponent");
		const translationID = this.route.snapshot.params['id'];
		this.translationService.getTranslations([translationID]).subscribe(translations =>
			this.translations = translations,
		);

		this.retrievePosts();
	}

	
	navigate(path: number): void {
		this.router.navigate(['translation' + "\/" + path], {relativeTo: this.route, skipLocationChange: false});
	}

	retrievePosts(): void {
		this.translationService.getAllPosts().subscribe((translations_list) => {
			console.log(translations_list);
			this.translations = translations_list;
		});
	}

	getAllPosts(): Translation[] {
		//this.retrievePosts();
		return this.translations;
	}
}
