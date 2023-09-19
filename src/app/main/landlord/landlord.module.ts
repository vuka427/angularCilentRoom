import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandlordRoutingModule } from './landlord-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ValidUsernameDirective } from 'src/app/shared/validation/valid.username.directive';
import { ValidEmailDirective } from 'src/app/shared/validation/valid.email.directive';
import { ValidPasswordDirective } from 'src/app/shared/validation/valid.password.directive';
import { ValidMatchpasswordDirective } from 'src/app/shared/validation/valid.matchpassword.directive';
import { ValidPhoneDirective } from 'src/app/shared/validation/valid.phone.directive';
import { ValidDateofbirthDirective } from 'src/app/shared/validation/valid.dateofbirth.directive';
import { ValidCccdDirective } from 'src/app/shared/validation/valid.cccd.directive';
import { OnlyNumberDirective } from 'src/app/shared/validation/only.number.directive';





@NgModule({
  declarations: [
    ProfileComponent,
    ValidUsernameDirective,
    ValidEmailDirective,
    ValidPasswordDirective,
    ValidMatchpasswordDirective,
    ValidPhoneDirective,
    ValidCccdDirective,
    ValidDateofbirthDirective,
    OnlyNumberDirective,
  ],
  imports: [
    CommonModule,
    LandlordRoutingModule,
    FormsModule
  ]
})
export class LandlordModule { }
