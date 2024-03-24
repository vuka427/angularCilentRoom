import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatVndPipe'
})
export class FormatVndPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

}
