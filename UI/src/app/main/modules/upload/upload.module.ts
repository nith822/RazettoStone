import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UploadRoutingModule } from './upload-routing.module';
import { TranslationModule } from '../translation/translation.module';

import { TranslationService } from '../../translation/translation.service';

import { UploadComponent } from './upload.component';
import { UploadService } from '../../upload/upload.service';
import { UploadPreviewComponent } from './upload-preview/upload-preview.component';


 
@NgModule({
  declarations: [UploadComponent, UploadPreviewComponent,],
  imports: [
    CommonModule,
    UploadRoutingModule,
	SharedModule,
	TranslationModule,
  ],
  
  providers: [TranslationService],
})
export class UploadModule { }
