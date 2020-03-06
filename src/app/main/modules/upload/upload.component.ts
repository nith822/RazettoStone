import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../upload/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

	constructor(private uploadService: UploadService) { }

	ngOnInit() {
		console.log("init upload component");
	}

}
