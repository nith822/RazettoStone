import { Component, OnInit, Input } from '@angular/core';
import { Translation } from '../../../translation/translation'
import { Text } from '../../../translation/text/text'

import { Router, ActivatedRoute, Params, Data, NavigationEnd  } from '@angular/router';

import { TranslationService } from '../../../translation/translation.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	@Input() translation: Translation;
	comments: string[];
	constructor(public  translationService: TranslationService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		const translationID = this.route.snapshot.params['id'];
		this.router.events.subscribe((val) => {
			if(val instanceof NavigationEnd) {
				console.log(val.url);
			}
		});
	}

}
