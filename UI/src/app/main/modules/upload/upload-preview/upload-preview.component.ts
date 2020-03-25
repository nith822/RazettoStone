import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { UploadService } from '../../../upload/upload.service';

import { Router, ActivatedRoute, Params, Data, NavigationEnd } from '@angular/router';

@Component({
  selector: 'upload-preview',
  templateUrl: './upload-preview.component.html',
  styleUrls: ['./upload-preview.component.css']
})
export class UploadPreviewComponent implements OnInit {

	
	constructor(private route: ActivatedRoute, public router: Router,
		public uploadService: UploadService, public location: Location, ) {

	}		

	ngOnInit() {
		console.log("init upload-preview component");
	}
	
}
