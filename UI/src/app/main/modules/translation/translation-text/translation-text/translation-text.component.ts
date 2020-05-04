import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment} from '@angular/router';
import { TranslationService } from '../../../../translation/translation.service';

import { Text } from '../../../../translation/text/text';
import { TextLine } from '../../../../translation/text/textLine'

import { Observable, combineLatest } from 'rxjs'; 

import { Input } from '@angular/core';

@Component({
  selector: 'translation-text',
  templateUrl: './translation-text.component.html',
  styleUrls: ['./translation-text.component.css'],
})
export class TranslationTextComponent implements OnInit {

	translationID: string;
	translationTextID: string;
	translationText: Text;
	
	@Input() previewTranslationText: Text;
	
	constructor(private route: ActivatedRoute, private router: Router, public  translationService: TranslationService) {
	}

	ngOnInit() {
		console.log("init TranslationTextComponent");
		
		if(this.previewTranslationText) {
			this.translationText = this.previewTranslationText;
			return;
		}
		
		combineLatest(this.route.url, this.route.parent.parent.url).subscribe(([translationTextIDUrl, translationIDUrl]) => {
			this.translationID = translationIDUrl[0].path;
			this.translationTextID = translationTextIDUrl[0].path;
			
			console.log(this.translationID);
			console.log(this.translationTextID);
			
			this.translationService.getTranslationText(this.translationID, this.translationTextID).subscribe((translationText) => {
				this.translationText = translationText;
			});
		});
		
	}
	
	convertToStringArray(textLines: TextLine[]): string[] {
		var stringArray: string[] = [];
		for(let textLine of textLines) {
			stringArray.push(textLine.getText());
		}
		return stringArray;
	}
}
