import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule } from '@angular/forms';
import { LandlordComponent } from './landlord/landlord.component';
import { TenantComponent } from './tenant/tenant.component';
import { ValidUsernameDirective } from '../shared/validation/valid.username.directive';
import { ValidEmailDirective } from '../shared/validation/valid.email.directive';
import { ValidPasswordDirective } from '../shared/validation/valid.password.directive';
import { ValidMatchpasswordDirective } from '../shared/validation/valid.matchpassword.directive';
import { ValidDateofbirthDirective } from '../shared/validation/valid.dateofbirth.directive';
import { ValidCccdDirective } from '../shared/validation/valid.cccd.directive';
import { ValidPhoneDirective } from '../shared/validation/valid.phone.directive';
import { OnlyNumberDirective } from '../shared/validation/only.number.directive';


@NgModule({
  declarations: [
    LandlordComponent,
    TenantComponent,
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
    RegisterRoutingModule,
    FormsModule
  ]
})
export class RegisterModule { }
