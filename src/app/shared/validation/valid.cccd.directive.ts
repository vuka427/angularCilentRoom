import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[appValidCccd]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidCccdDirective, multi: true}]
})
export class ValidCccdDirective {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {

    if (!control.value) {
      return null;
    }
    const regex = new RegExp('^[0-9-]*$');
    const valid = regex.test(control.value);
    return valid ? null : { 'cccdinvalid': true };
}
}
