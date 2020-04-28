import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UploadRoutingModule } from './upload-routing.module';

import { UploadComponent } from './upload.component';
import { UploadService } from '../../upload/upload.service';
import { UploadPreviewComponent } from './upload-preview/upload-preview.component';


@NgModule({
  declarations: [UploadComponent, UploadPreviewComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
	SharedModule
  ],
})
export class UploadModule { }
