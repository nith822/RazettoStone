import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [ 
	{ 
		path: '', 
		loadChildren: () => import('./main/modules/translations/translations.module').then(m => m.TranslationsModule) 
	},
	{ 
		path: 'translations', 
		loadChildren: () => import('./main/modules/translations/translations.module').then(m => m.TranslationsModule) 
	},
	{ 
		path: 'upload', 
		loadChildren: () => import('./main/modules/upload/upload.module').then(m => m.UploadModule) 
	},
	{ 
		path: 'login', 
		loadChildren: () => import('./main/modules/login/login.module').then(m => m.LoginModule) 
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
