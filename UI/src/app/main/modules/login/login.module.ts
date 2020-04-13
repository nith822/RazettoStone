import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { UserService } from '../../user/user.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  providers: [
  UserService,
  CookieService
  ]
})
export class LoginModule { }
