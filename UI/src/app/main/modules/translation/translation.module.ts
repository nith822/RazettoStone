import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationComponent } from './translation.component';
import { TranslationRoutingModule } from './translation-routing.module';
import { SidebarService } from '../../sidebar/sidebar.service';



@NgModule({
  declarations: [	
		TranslationComponent, 
	],
  imports: [
		CommonModule,
		TranslationRoutingModule
  ],
  providers: [SidebarService],
})
export class TranslationModule { }
