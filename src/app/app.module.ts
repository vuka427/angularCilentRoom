import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { SystemConstants } from './core/common/system.constants';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() { 
  return localStorage.getItem(localStorage.getItem(SystemConstants.CURRENT_USER)?? ""); 
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,

    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5135"],
        disallowedRoutes: []
      }
    })
    
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
