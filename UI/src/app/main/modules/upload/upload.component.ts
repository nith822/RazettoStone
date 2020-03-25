import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UploadService } from '../../upload/upload.service';

import { Router, ActivatedRoute, Params, Data, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

	uploadOriginalText: boolean;
	
	title: string;
	language: string;
	tags: string[];
	
	file: File;
	
	constructor(private route: ActivatedRoute, public router: Router,
		public uploadService: UploadService, public location: Location, ) { 
	}

	ngOnInit() {
		console.log("init upload component");
		
		const translationID = this.route.snapshot.params['id'];
		if(translationID) {
			this.uploadOriginalText = false;
			this.title = this.uploadService.translatedText.title;
			this.language = this.uploadService.translatedText.language;
			//this.file = this.uploadService.translatedTextFile;
		} else {
			this.uploadOriginalText = true;
			this.title = this.uploadService.originalText.title;
			this.language = this.uploadService.originalText.language;
			this.tags = this.uploadService.tags;
			//this.file = this.uploadService.translatedTextFile;
		}
	}

	fileChanged(event: any): void {
		this.uploadService.readFile(event.target.files[0], this.uploadOriginalText);
	}
	
	getCurrentScreenTitle(): string {
		if(this.uploadOriginalText) {
			return "Creating a new Post";
		} else if(!this.uploadOriginalText) {
			return "Creating a new translation for a Post"
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
