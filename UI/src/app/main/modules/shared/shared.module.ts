import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'


import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [
	HeaderComponent,
	FooterComponent
  ],
  providers: [
	CookieService
  ]
})
export class SharedModule { }
