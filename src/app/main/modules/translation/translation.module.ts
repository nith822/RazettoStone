import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationRoutingModule } from './translation-routing.module';
import { TranslationComponent } from './translation.component';


@NgModule({
  declarations: [TranslationComponent],
  imports: [
    CommonModule,
    TranslationRoutingModule
  ]
})
export class TranslationModule { }
