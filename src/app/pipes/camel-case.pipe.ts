import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: string): string {
     if (!value) return '';

    // Split the string by spaces and convert each word's first letter to uppercase
    return value
      .split(' ')
      .map((word, index) => {
        // Convert the first word to lowercase and the rest to uppercase
        if (index === 0) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('');;
  }

}
