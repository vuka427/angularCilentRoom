import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appComToEnd]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidComToEndDirective, multi: true}] 
})
export class ValidComToEndDirective {
  @Input('appComToEnd') dateComToEnd : string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {


    return this.match(this.dateComToEnd[0], this.dateComToEnd[1])(formGroup);
  }

  match(controlName: string, checkControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const checkControl = formGroup.controls[checkControlName];

      if (checkControl?.errors && !checkControl.errors['dateendinvald']) {
        return null;
      }
      if (control?.value > checkControl?.value) {
        checkControl?.setErrors({ 'dateendinvald': true });
        return { 'dateendinvald': true };
      } else {
        checkControl?.setErrors(null);
        return null;
      }
    };
  }



}
