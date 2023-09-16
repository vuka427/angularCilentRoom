import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appValidUsername]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidUsernameDirective, multi: true}]


})

export class ValidUsernameDirective {

  constructor() { }


  validate(control: AbstractControl): ValidationErrors | null {

      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[a-zA-Z0-9-]*$');
      const valid = regex.test(control.value);
      return valid ? null : { 'usernamevalid': true };
  }
}
