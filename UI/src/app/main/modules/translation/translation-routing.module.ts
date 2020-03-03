import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslationComponent } from './translation.component';

import { TranslationPreviewComponent } from './translation-text/translation-preview.component';
import { SidebarComponent } from './sidebar/sidebar.component';


const routes: Routes = [
	{	
		path: ':id',
		component: TranslationComponent,
		children: [
			{	
				path: ':id',
				outlet: 'translations',
				loadChildren: () => import('./translation-text/translation-text.module').then(m => m.TranslationTextModule) 
			},
			{
				path: 'comments',
				outlet: 'sidebar',
				component: SidebarComponent,
			}
		]
	},
	
	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslationRoutingModule { }
