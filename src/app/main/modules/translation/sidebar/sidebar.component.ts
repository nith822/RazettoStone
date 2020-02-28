import { Component, OnInit, Input } from '@angular/core';
import { Translation } from '../../../translation/translation'
import { Text } from '../../../translation/text/text'

import { Router, ActivatedRoute, Params, Data, NavigationEnd  } from '@angular/router';

import { TranslationService } from '../../../translation/translation.service';
import { SidebarService } from '../../../sidebar/sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	@Input() translation: Translation;
	comments: string[];
	constructor(private route: ActivatedRoute, private router: Router, 
	private sidebarService: SidebarService, public  translationService: TranslationService,) { }

	ngOnInit() {
		console.log("SidebarComponent init");
		const translationID = this.route.snapshot.params['id'];
		console.log(translationID);
	}

}
