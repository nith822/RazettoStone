import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslationComponent } from './translation.component';

import { TranslationPreviewComponent } from './translation-text/translation-preview.component';


const routes: Routes = [
	{	
		path: ':id',
		component: TranslationComponent,
		children: [
			{	
				path: 'previews',
				outlet: 'translations',
				loadChildren: () => import('./translation-text/translation-text.module').then(m => m.TranslationTextModule) 
			},
			{
				path: 'comments',
				outlet: 'sidebar',
				loadChildren: () => import('./translation-text/translation-text.module').then(m => m.TranslationTextModule) 
			}
		]
	},
	
	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslationRoutingModule { }
