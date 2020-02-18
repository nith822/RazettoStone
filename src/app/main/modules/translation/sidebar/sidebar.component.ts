import { Component, OnInit, Input } from '@angular/core';
import { Translation } from '../../../translation/translation'
import { Text } from '../../../translation/text/text'

import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { TranslationService } from '../../../translation/translation.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	@Input() translation: Translation;
	comments: string[];
	constructor(private translationService: TranslationService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		const translationID = this.route.snapshot.params['id'];
		this.translationService.getComments(translationID).subscribe(comments =>
			this.comments = comments
		);
	}

}
