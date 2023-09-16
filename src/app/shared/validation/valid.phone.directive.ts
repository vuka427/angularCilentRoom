import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appValidPhone]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidPhoneDirective, multi: true}]
})
export class ValidPhoneDirective {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {

    if (!control.value) {
      return null;
    }
    const regex = new RegExp(/^(84|0[3|5|7|8|9])+([0-9]{8})\b$/);
    const valid = regex.test(control.value);
    return valid ? null : { 'phoneinvalid': true };
}

}
