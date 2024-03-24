import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roomstatus'
})
export class RoomstatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value == "Empty") return "Trống";
    if(value == "Inhabited") return "Đã cho thuê";
    if(value == "Repair") return "Đang sửa chữa";
    if(value == "Deposit") return "Đã cọc";

    return value;
  }

}
