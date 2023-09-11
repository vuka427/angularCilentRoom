import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { UtilityService } from '../core/services/utility.service';
import { MenuSidebarComponent } from '../shared/menu.sidebar/menu.sidebar.component';





@NgModule({
  declarations: [
    MainComponent,
    MenuSidebarComponent
   
  ],
  imports: [
    CommonModule,
    MainRoutingModule
    
  ],
  providers: [
    UtilityService
  ],
  
})
export class MainModule { }
