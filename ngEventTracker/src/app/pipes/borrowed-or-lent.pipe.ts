import { Pipe, PipeTransform } from '@angular/core';
import { Borrow } from '../models/borrow';

@Pipe({
  name: 'borrowedOrLent'
})
export class BorrowedOrLentPipe implements PipeTransform {

  transform(borrows: Borrow[], showLent: boolean, showBorrowed: boolean): Borrow[] {
    const result: Borrow[] = [];
    // for (let i = 0; i < borrows.length; i++) {
    //   if (borrows[i].borrowed === true) {
    //     return showBorrowed;
    //   }
    //   if (borrows[i].lent === true) {
    //     return result.push(borrows[i])
    //   }
    // }
    return result;
  }
  }


