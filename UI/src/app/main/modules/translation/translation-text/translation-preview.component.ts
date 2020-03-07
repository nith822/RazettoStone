import { Component, OnInit } from '@angular/core';
import { Translation } from '../../../translation/translation'
import { TextLine } from '../../../translation/text/textLine'
import { TranslationService } from '../../../translation/translation.service';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

@Component({
  selector: 'app-translation-preview',
  templateUrl: './translation-preview.component.html',
  styleUrls: ['./translation-preview.component.css']
})
export class TranslationPreviewComponent implements OnInit {

	translation: Translation;
	translationID: number = -1;
	
	constructor(public  translationService: TranslationService, private route: ActivatedRoute, private router: Router) {

	}

	ngOnInit() {	
		
		console.log("init TranslationPreviewComponent");
		//subscribe
		this.translationID = this.route.parent.parent.snapshot.params['id'];
		this.translationService.getTranslations([this.translationID]).subscribe((translations) => {
			this.translation = translations[this.translationID-1];
		});
	}
	
	navigate(path: number): void {
		this.router.navigate([{outlets: {primary: [path]}}], {relativeTo: this.route.parent, skipLocationChange: false});
	}

  
	//helper class
	convertToStringArray(textLines: TextLine[]): string[] {
		var stringArray: string[] = [];
		for(let textLine of textLines) {
			stringArray.push(textLine.getText());
		}
		return stringArray;
	}
}
