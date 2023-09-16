import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appValidDateofbirth]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidDateofbirthDirective, multi: true}]
})
export class ValidDateofbirthDirective {

  constructor() { }
  
  validate(control: AbstractControl): ValidationErrors | null {

    if (!control.value) {
      return null;
    }
    let today : Date = new Date();

    if (new Date(control.value) > today)
        return { "dateofbirthinvalid": true };

    return null;
}

}
