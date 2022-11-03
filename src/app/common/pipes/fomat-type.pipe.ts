import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'fomatType'})
export class FomatTypePipe implements PipeTransform {
  transform(value:unknown, ...args: unknown[]): string {
    if(value === 'percent') {
        return '%';
    }
  }
}