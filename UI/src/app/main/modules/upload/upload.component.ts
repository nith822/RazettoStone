import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UploadService } from '../../upload/upload.service';
import { TranslationService } from '../../translation/translation.service';

import { Router, ActivatedRoute, Params, Data, NavigationEnd } from '@angular/router';
import { UserService } from "../../user/user.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

	uploadOriginalText: boolean;
	
	title: string;
	textLanguage: string;
	tags: string;
	
	file: File;
	
	constructor(private route: ActivatedRoute, public router: Router,
		public uploadService: UploadService, public location: Location, public userService: UserService, public translationService: TranslationService) { 
	}

	ngOnInit() {
		console.log("init upload component");
		console.log(this.userService.getCurrentUser());
		if(!this.userService.isLoggedIn())  {
			this.router.navigateByUrl("login");
			alert("Must be logged in to upload translations");
		}
		
		const translationID = this.route.snapshot.params['id'];
		console.log(translationID);
		if(translationID) {
			this.uploadOriginalText = false;
			if(translationID != -1) {
				this.translationService.getPost(translationID).subscribe((translation) => {
					this.uploadService.originalText = translation.originalText;
				});
			}
			if(this.uploadService.translatedText) {
				if (this.uploadService.translatedText.user == null || this.uploadService.translatedText.user.id == null)
					this.uploadService.translatedText.user = this.userService.getCurrentUser();
				console.log('setting user ' + this.uploadService.translatedText.user.id)
				this.title = this.uploadService.translatedText.title;
				this.textLanguage = this.uploadService.translatedText.textLanguage;
				this.file = this.uploadService.translatedTextFile;
			}
		} else {
			this.uploadOriginalText = true;
			if(this.uploadService.originalText) {
				if (this.uploadService.originalText.user == null || this.uploadService.originalText.user.id == null)
					this.uploadService.originalText.user = this.userService.getCurrentUser();
				this.title = this.uploadService.originalText.title;
				this.textLanguage = this.uploadService.originalText.textLanguage;
				this.tags = this.uploadService.tags;
				this.file = this.uploadService.originalTextFile;
			}
		}
	}

	fileChanged(event: any): void {
		this.file = event.target.files[0];
		this.uploadService.readFile(event.target.files[0], this.uploadOriginalText);
	}
	
	getCurrentScreenTitle(): string {
		if(this.uploadOriginalText) {
			return "Create a new Post";
		} else if(!this.uploadOriginalText) {
			return "Create a new translation for the Post"
		} else {
			return "Eye see you";
		}
	}
	
	navigate(path: string):void {
		//file is saved asynch when it is uploaded in fileChanged function
		this.uploadService.saveText(this.uploadOriginalText, this.title, this.textLanguage, this.tags);
		if(path === "back") {
			this.location.back();
			return;
		}
		this.router.navigate([path], {relativeTo: this.route, skipLocationChange: false});
	}
	
	
}
