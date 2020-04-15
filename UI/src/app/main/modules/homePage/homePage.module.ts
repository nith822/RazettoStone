  
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './homePage.component';
import { HomePageRoutingModule } from './homePage-routing.module';
import { HomePageService } from '../../homePage/homePage.service';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ],
  providers: [
	HomePageService,
  ]
})
export class HomePageModule { }