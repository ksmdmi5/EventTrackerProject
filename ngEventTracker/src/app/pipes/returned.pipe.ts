import { Pipe, PipeTransform } from '@angular/core';
import { Borrow } from '../models/borrow';

@Pipe({
  name: 'returned'
})
export class ReturnedPipe implements PipeTransform {

  transform(borrows: Borrow[], showAll: boolean): Borrow[] {
    const result: Borrow[] = [];
    if (showAll === true) {
      return borrows;
    }
    for (let i = 0; i < borrows.length; i++) {
      if (borrows[i].returned === false) {
        result.push(borrows[i]);
      }
    }
    return result;
  }

}
