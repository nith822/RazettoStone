import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationComponent } from './translation.component';
import { TranslationRoutingModule } from './translation-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';




@NgModule({
  declarations: [	
		TranslationComponent, 
		SidebarComponent,
	],
  imports: [
		CommonModule,
		TranslationRoutingModule
  ],
  
})
export class TranslationModule { }
