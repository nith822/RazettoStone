import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UploadService } from '../../upload/upload.service';

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
	language: string;
	tags: string;
	
	file: File;
	
	constructor(private route: ActivatedRoute, public router: Router,
		public uploadService: UploadService, public location: Location, public userService: UserService) { 
	}

	ngOnInit() {
		console.log("init upload component");
		console.log(this.userService.getCurrentUser());
		if(!this.userService.isLoggedIn())  {
			this.router.navigateByUrl("login");
			alert("Must be logged in to upload translations");
		}
		
		const translationID = this.route.snapshot.params['id'];
		if(translationID) {
			this.uploadOriginalText = false;
			if(this.uploadService.translatedText) {
				this.title = this.uploadService.translatedText.title;
				this.language = this.uploadService.translatedText.language;
				this.file = this.uploadService.translatedTextFile;
			}
		} else {
			this.uploadOriginalText = true;
			if(this.uploadService.originalText) {
				this.title = this.uploadService.originalText.title;
				this.language = this.uploadService.originalText.language;
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
		this.uploadService.saveText(this.uploadOriginalText, this.title, this.language, this.tags);
		if(path === "back") {
			this.location.back();
			return;
		}
		this.router.navigate([path], {relativeTo: this.route, skipLocationChange: false});
	}
	
	
}
