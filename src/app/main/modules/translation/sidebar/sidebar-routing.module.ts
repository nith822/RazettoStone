import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar.component';
import { CommentsComponent } from './comments/comments.component';
import { MetaDataComponent } from './meta-data/meta-data.component';

const routes: Routes = [
	{ 	path: '',
		redirectTo: 'sidebar',
	},
	{	
		path: 'sidebar',
		component: SidebarComponent,
		children: [
			{
				path: '', 
				outlet: 'inner',
				component: CommentsComponent,
			},
			{
				path: 'comments', 
				outlet: 'inner',
				component: CommentsComponent,
			},
			{
				path: 'about',
				outlet: 'inner',
				component: MetaDataComponent,
			},
		]
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
