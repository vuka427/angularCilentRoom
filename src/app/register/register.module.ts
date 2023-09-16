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


@NgModule({
  declarations: [
    LandlordComponent,
    TenantComponent,
    ValidUsernameDirective,
    ValidEmailDirective,
    ValidPasswordDirective,
    ValidMatchpasswordDirective,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule
  ]
})
export class RegisterModule { }
