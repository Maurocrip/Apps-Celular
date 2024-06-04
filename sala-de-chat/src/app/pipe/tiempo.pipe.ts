import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempo',
  standalone: true
})
export class TiempoPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    let fecha = new Date(value);

    return `${fecha.getHours().toString()}:${fecha.getMinutes().toString()}`;
  }

}
