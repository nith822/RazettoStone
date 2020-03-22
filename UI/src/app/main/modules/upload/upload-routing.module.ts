import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadComponent } from './upload.component';
import { UploadPreviewComponent } from './upload-preview/upload-preview.component';

const routes: Routes = [
	{ 
		//add an originalText only
		path: '', 
		component: UploadComponent,
	},
	{ 
		//add a translation to an originalText
		//-1 signals that the user is also adding an originalText
		path: ':id', 
		component: UploadComponent,
	},
	{ 
		//the user must submit through a preview
		path: ':id/preview', 
		component: UploadPreviewComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
