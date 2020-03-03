import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
	{	
		path: '',
		redirectTo: 'comments',
	},
	
	{	
		path: 'comments',
		component: CommentsComponent,
	},
	
	{	
		path: 'henlo',
		component: SidebarComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
