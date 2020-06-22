import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromseconds'
})
export class FromsecondsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let min = Math.floor(value/60)
    let s = value%60
    return (`${min}min ${s}s`)
  }

}
