import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [ 
	{ 
		path: 'translation', 
		loadChildren: () => import('./main/modules/translation/translation.module').then(m => m.TranslationModule) 
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
