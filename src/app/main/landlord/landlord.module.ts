import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandlordRoutingModule } from './landlord-routing.module';
import { ProfileComponent } from './profile/profile.component';





@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    LandlordRoutingModule,
    FormsModule
  ]
})
export class LandlordModule { }
