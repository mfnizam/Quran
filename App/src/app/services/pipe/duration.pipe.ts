import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
 transform(d: any): any {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    return (h < 1? '' : h < 9? '0' + h + ':' : h + ':') + (m < 9? '0' + m : m) + ':' + (s < 9? '0' + s : s); 
  }
}