import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'housetype'
})
export class HousetypePipe implements PipeTransform {

  transform(value: unknown, lowercase: unknown): unknown {
    
    if(value == "row") return lowercase? "Dãy" :"dãy";
    if(value == "floor") return lowercase? "Tầng" : "tầng";
    return null;
  }

}
