import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslationPreviewComponent } from './translation-preview.component';
import { TranslationTextComponent } from './translation-text/translation-text.component';

const routes: Routes = [
		{	
			path: '',
			component: TranslationPreviewComponent,
		},
		
		{	
			path: ':transTextID',
			component: TranslationTextComponent,
		},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslationTextRoutingModule { }
