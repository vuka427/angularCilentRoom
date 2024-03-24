import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appValidDateFuture]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidDateFutureDirective, multi: true}]
})
export class ValidDateFutureDirective {

  constructor() { }
  
  validate(control: AbstractControl): ValidationErrors | null {

    if (!control.value) {
      return null;
    }
    let today : Date = new Date();
    let selectDay : Date = new Date(control.value);
    today.setHours(0);
    selectDay.setHours(1);

    if (selectDay <= today)
        return { "dateisfuturevalid": true };

    return null;
  }

}
