import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [ 
	{ 
		path: 'translations', 
		loadChildren: () => import('./main/modules/translations/translations.module').then(m => m.TranslationsModule) 
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
