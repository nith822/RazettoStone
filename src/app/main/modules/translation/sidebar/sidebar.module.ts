import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [SidebarComponent, CommentsComponent],
  imports: [
    CommonModule,
    SidebarRoutingModule
  ]
})
export class SidebarModule { }
