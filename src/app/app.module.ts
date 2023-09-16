import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidUsernameDirective } from './shared/validation/valid.username.directive';
import { ValidEmailDirective } from './shared/validation/valid.email.directive';
import { ValidPasswordDirective } from './shared/validation/valid.password.directive';
import { ValidMatchpasswordDirective } from './shared/validation/valid.matchpassword.directive';
import { ValidPhoneDirective } from './shared/validation/valid.phone.directive';
import { ValidCccdDirective } from './shared/validation/valid.cccd.directive';
import { ValidDateofbirthDirective } from './shared/validation/valid.dateofbirth.directive';
import { OnlyNumberDirective } from './shared/validation/only.number.directive';




@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,

    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
