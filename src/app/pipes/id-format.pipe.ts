import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idFormat'
})
export class IdFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return 'ID-'+value;
  }

}
