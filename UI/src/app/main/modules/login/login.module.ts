import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { UserService } from '../../user/user.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  providers: [
	UserService,
  ]
})
export class LoginModule { }
