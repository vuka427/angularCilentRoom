import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appValidPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidPasswordDirective, multi: true}]
})
export class ValidPasswordDirective {
  validate(control: AbstractControl): ValidationErrors | null {

    if (!control.value) {
      return null;
    }
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,50}$/);
    const valid = regex.test(control.value);
    return valid ? null: { 'passwordvalid': true };
  }
}
  


