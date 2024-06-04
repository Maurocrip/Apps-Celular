import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teimpo',
  standalone: true
})
export class TeimpoPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown 
  {

    let hours: number = Math.floor(value / 3600000);
    let minutes: number = Math.floor((value % 3600000) / 60000);
    let seconds: number = Math.floor((value % 60000) / 1000);
    let remainingMilliseconds: number = value % 1000;

    return `${hours.toString()}:${minutes.toString()}:${seconds.toString()}:${remainingMilliseconds.toString()}`;
  }

}
