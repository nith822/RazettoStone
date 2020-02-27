import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationComponent } from './translation.component';
import { TranslationRoutingModule } from './translation-routing.module';


@NgModule({
  declarations: [TranslationComponent],
  imports: [
    CommonModule,
    TranslationRoutingModule
  ]
})
export class TranslationModule { }
