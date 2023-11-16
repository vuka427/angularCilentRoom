import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appValidGreaterTwo]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidGreaterTwoDirective , multi: true}] 
})
export class ValidGreaterTwoDirective {

  @Input('appValidGreaterTwo') appForm : string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return this.match(this.appForm[0], this.appForm[1])(formGroup);
  }

  match(controlName: string, checkControlName: string) {
    console.log("v2");
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
