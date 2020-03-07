import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(public route: ActivatedRoute, public router: Router) { }

	ngOnInit() {
	
	}
	
	navigate(path) {
		this.router.navigate([{outlets: {primary: ['translation'],}}], {relativeTo: this.route.root, skipLocationChange: false});
	}
}
