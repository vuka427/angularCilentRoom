import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidMatchpasswordDirective, multi: true}]
})
export class ValidMatchpasswordDirective {
  @Input('appMatchPassword') matchPassword: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {


    return this.match(this.matchPassword[0], this.matchPassword[1])(formGroup);
  }

  match(controlName: string, checkControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const checkControl = formGroup.controls[checkControlName];

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        checkControl?.setErrors({ 'matching': true });
        return { 'matching': true };
      } else {
        checkControl?.setErrors(null);
        return null;
      }
    };
  }



}
