import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationComponent } from './translation.component';
import { TranslationRoutingModule } from './translation-routing.module';
import { SidebarService } from '../../sidebar/sidebar.service';

import { TranslationTextModule } from './translation-text/translation-text.module';



@NgModule({
  declarations: [	
		TranslationComponent, 
	],
  imports: [
		CommonModule,
		TranslationRoutingModule,
		TranslationTextModule,
  ],
  providers: [SidebarService],
  exports: [TranslationComponent],
})
export class TranslationModule { }
