import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../upload/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

	title: string;
	language: string;
	tags: string;
	
	constructor(private uploadService: UploadService) { }

	ngOnInit() {
		console.log("init upload component");
	}

	fileChanged(event: any, isOriginal: boolean): void {
		this.uploadService.readFile(event.target.files[0], isOriginal);
	}
	
}
