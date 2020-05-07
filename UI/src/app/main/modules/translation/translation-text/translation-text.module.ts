import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationTextRoutingModule } from './translation-text-routing.module';
import { TranslationPreviewComponent } from './translation-preview.component';
import { TranslationTextComponent } from './translation-text/translation-text.component';


@NgModule({
  declarations: [TranslationPreviewComponent, TranslationTextComponent],
  imports: [
    CommonModule,
    TranslationTextRoutingModule
  ],
  
  exports: [TranslationTextComponent],
})
export class TranslationTextModule { }
