import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timepipe'
})
export class TimepipePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let hour = Math.floor(value/60)
    let min = value % 60
    let time = `${hour}h${min}min`
    return time;
  }

}
