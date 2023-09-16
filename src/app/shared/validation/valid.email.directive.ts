import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appValidEmail]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidEmailDirective, multi: true}]
})
export class ValidEmailDirective {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {

    if (!control.value) {
      return null;
    }
    const regex = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);
    const valid = regex.test(control.value);
    return valid ? null : { 'emailvalid': true };
}

}
