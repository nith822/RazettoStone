import { Component, OnInit } from '@angular/core';
import { Translation } from '../../../translation/translation'
import { Text } from '../../../translation/text/Text'
import { TextLine } from '../../../translation/text/textLine'
import { TranslationService } from '../../../translation/translation.service';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

@Component({
  selector: 'app-translation-preview',
  templateUrl: './translation-preview.component.html',
  styleUrls: ['./translation-preview.component.css']
})
export class TranslationPreviewComponent implements OnInit {

	translationTexts: Text[];
	
	constructor(public  translationService: TranslationService, private route: ActivatedRoute, private router: Router) {

	}

	ngOnInit() {	
		
		console.log("init TranslationPreviewComponent");
		
		var translationID = this.route.parent.parent.snapshot.params['id'];
		this.translationService.getTranslationPreview(translationID).subscribe((texts) => {
			this.translationTexts = texts;
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
