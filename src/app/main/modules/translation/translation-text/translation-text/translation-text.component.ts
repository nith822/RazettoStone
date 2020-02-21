import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

@Component({
  selector: 'app-translation-text',
  templateUrl: './translation-text.component.html',
  styleUrls: ['./translation-text.component.css']
})
export class TranslationTextComponent implements OnInit {

	constructor(private route: ActivatedRoute, private router: Router) {
	}

  ngOnInit() {
		console.log("init TranslationTextComponent");
		this.router.events.subscribe((val) => {
				console.log(val);
		});
  }

}
