import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roomstatus'
})
export class RoomstatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value == "Empty") return "Trống";

    return value;
  }

}
