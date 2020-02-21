import { Component, OnInit } from '@angular/core';
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
	
	constructor(private translationService: TranslationService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		const translationID = this.route.snapshot.params['id'];
		this.translationService.getTranslations([translationID]).subscribe(translations =>
			this.translations = translations,
		);
	}

	
	navigate(path: number): void {
		this.router.navigate(['translation' + "\/" + path], {relativeTo: this.route, skipLocationChange: false});
	}
}
