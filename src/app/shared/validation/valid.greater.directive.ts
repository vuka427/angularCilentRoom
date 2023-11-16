import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appValidGreater]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidGreaterDirective, multi: true}] 
})
export class ValidGreaterDirective {

  @Input('appValidGreater') appForm : string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return this.match(this.appForm[0], this.appForm[1])(formGroup);
  }

  match(controlName: string, checkControlName: string) {
    console.log("v1");
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const checkControl = formGroup.controls[checkControlName];

      if (checkControl?.errors && !checkControl.errors['greater']) {
        return null;
      }
      if (control?.value > checkControl?.value) {
        control?.setErrors({ 'greater': true });
        checkControl?.setErrors({ 'greater': true });
        return { 'greater': true };
      } else {
        checkControl?.setErrors(null);
        control?.setErrors(null);
        return null;
      }
    };
  }

}
