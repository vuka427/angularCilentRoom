import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidUsernameDirective } from './valid.username.directive';
import { ValidEmailDirective } from './valid.email.directive';
import { ValidPasswordDirective } from './valid.password.directive';
import { ValidMatchpasswordDirective } from './valid.matchpassword.directive';
import { ValidPhoneDirective } from './valid.phone.directive';
import { ValidCccdDirective } from './valid.cccd.directive';
import { ValidDateofbirthDirective } from './valid.dateofbirth.directive';
import { OnlyNumberDirective } from './only.number.directive';
import { ValidDateFutureDirective } from './valid.dateisfuture.directive';
import { ValidComToEndDirective } from './valid.commingend.directive';



@NgModule({
  declarations: [
    ValidUsernameDirective,
    ValidEmailDirective,
    ValidPasswordDirective,
    ValidMatchpasswordDirective,
    ValidPhoneDirective,
    ValidCccdDirective,
    ValidDateofbirthDirective,
    OnlyNumberDirective,
    ValidDateFutureDirective,
    ValidComToEndDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ValidUsernameDirective,
    ValidEmailDirective,
    ValidPasswordDirective,
    ValidMatchpasswordDirective,
    ValidPhoneDirective,
    ValidCccdDirective,
    ValidDateofbirthDirective,
    OnlyNumberDirective,
    ValidDateFutureDirective,
    ValidComToEndDirective

  ]
})
export class ValidationModule { }
