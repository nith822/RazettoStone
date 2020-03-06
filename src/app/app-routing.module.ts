import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [ 
	{ 
		path: 'translations', 
		loadChildren: () => import('./main/modules/translations/translations.module').then(m => m.TranslationsModule) 
	},
	{ 
		path: 'upload', 
		loadChildren: () => import('./main/modules/upload/upload.module').then(m => m.UploadModule) 
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
