import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';
import { CommentsComponent } from './comments/comments.component';
import { MetaDataComponent } from './meta-data/meta-data.component';


@NgModule({
  declarations: [SidebarComponent, CommentsComponent, MetaDataComponent],
  imports: [
    CommonModule,
    SidebarRoutingModule
  ]
})
export class SidebarModule { }
