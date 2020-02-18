import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslationComponent } from './translation.component';


const routes: Routes = [
	{	
		path: ':id',
		component: TranslationComponent
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslationRoutingModule { }
