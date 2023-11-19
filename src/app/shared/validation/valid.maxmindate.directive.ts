import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[appValidMaxMindate]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidMaxminDateDirective , multi: true}] 
})
export class ValidMaxminDateDirective {

 
  @Input('appValidMaxMindate') appForm : string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
  
    let maxDate = new Date(this.appForm[0]);
    let minDate = new Date(this.appForm[1]);
    if (new Date(control.value) > maxDate || new Date(control.value) < minDate )
      return { "datemaxmininvalid": true };
    return null;


  }

 

}
