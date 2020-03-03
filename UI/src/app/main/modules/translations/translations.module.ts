import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationsRoutingModule } from './translations-routing.module';
import { TranslationsComponent } from './translations.component';

import { TranslationService } from '../../translation/translation.service';

@NgModule({
  declarations: [TranslationsComponent],
  imports: [
    CommonModule,
    TranslationsRoutingModule
  ],
  providers: [TranslationService],
})
export class TranslationsModule { }
