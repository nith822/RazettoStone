import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslationsComponent } from './translations.component'

import { TranslationService } from '../../translation/translation.service';

const routes: Routes = [
	
	{
		path: '',
		component: TranslationsComponent,
	},
	{	
		path: 'translation',
		loadChildren: () => import('../translation/translation.module').then(m => m.TranslationModule) 
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TranslationService],
})
export class TranslationsRoutingModule { }
