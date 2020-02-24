import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './main/modules/shared/shared.module';
import { UserService } from './main/user/user.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	SharedModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
