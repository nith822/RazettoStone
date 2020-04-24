import { Component, OnInit } from '@angular/core';
import { Observable, of, fromEventPattern } from 'rxjs';
import { Translation } from '../../translation/translation'
import { TranslationService } from '../../translation/translation.service';
import { Router, ActivatedRoute, Params, Data, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent implements OnInit {

	translations: Translation[] = [];
	page: number;
	userID: string;
	
	constructor(public  translationService: TranslationService, private cookieService : CookieService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		console.log("init TranslationsComponent");
		this.page = 0;
		const translationID = this.route.snapshot.params['id'];
		this.retrievePosts();
		this.userID = this.cookieService.get("userId");
	}

	
	navigate(path): void {
		this.router.navigate(['translation' + "\/" + path], {relativeTo: this.route, skipLocationChange: false});
	}

	retrievePosts(): void {
		this.translationService.search(this.page).subscribe((translations_list) => {
			console.log(translations_list);
			this.translations = translations_list;
		});
	}

	getAllPosts(): Translation[] {
		this.retrievePosts();
		return this.translations;
	}

	nextPage(): void {
		this.page = this.page + 1;
		console.log("Fetching page " + this.page);
		this.retrievePosts();
	}

	prevPage(): void {
		this.page = this.page - 1;
		console.log("Fetching page " + this.page);
		this.retrievePosts();
	}

	upvotePost(translationID: string): void {
		console.log("Attempting to upvote post.")
		this.translationService.votePost(translationID, this.userID, true).subscribe();
		this.retrievePosts();
	}

	downvotePost(translationID: string): void {
		console.log("Attempting to downvote post.")
		this.translationService.votePost(translationID, this.userID, false).subscribe((success) => {
		});
		this.retrievePosts()
	}
}
