import { Component, OnInit } from '@angular/core';
import { Translation } from '../../translation/translation'
import { TranslationService } from '../../translation/translation.service';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

	translation: Translation;
	
	hoveredIndex: number = -1;
	sideBarOpened = false; 
	
	constructor(private translationService: TranslationService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		//translation/:id, translationID = ":id" param
		const translationID = this.route.snapshot.params['id'];
		this.translationService.getTranslations([translationID]).subscribe(translations =>
			this.translation = translations[0],
		);
		
		this.router.navigate([{outlets: {translations: ['previews']}}], {relativeTo: this.route, skipLocationChange: true});
	}

}
