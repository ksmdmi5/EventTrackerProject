import { ReturnedPipe } from './../../pipes/returned.pipe';
import { Borrow } from './../../models/borrow';
import { BorrowService } from './../../services/borrow.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  borrows: Borrow [] = [];
  selected: Borrow = null;
  newBorrow: Borrow = new Borrow();
  editBorrow: Borrow = null;
  showReturned = false;
  showBorrowed = false;
  showLent = false;

  constructor(private borrowService: BorrowService, private date: DatePipe,
              private returned: ReturnedPipe) { }

  ngOnInit() {
    this.reload();
  }
  getNumBorrows(): number {
    return this.returned.transform(this.borrows, false).length;
  }
  displayBorrow(borrow: Borrow) {
    this.selected = borrow;
  }
  displayTable() {
    this.selected = null;
  }
  addBorrow() {
    this.newBorrow.returned = false;
    this.newBorrow.description = '';
    this.borrowService.create(this.newBorrow).subscribe(
      lifeisGood => { console.log(this.newBorrow);
                      this.reload();
                      this.newBorrow = new Borrow();
      }, bad => {
      console.error('error in borrow add comp ' + bad);
    });
  }
  setEditBorrow(borrow: Borrow) {
    this.editBorrow = borrow;
    this.editBorrow = Object.assign({}, this.selected);
  }
  updateBorrow(borrow: Borrow) {
    console.log(borrow);
    // if (borrow.returned === true) {
    //   borrow.dateReturned = this.date.transform(Date.now(), 'shortDate');
    // } else {
    //   borrow.dateReturned = '';
    // }
    this.borrowService.update(borrow.id, borrow).subscribe(
      lifeisGood => {
                     this.reload();
                     this.editBorrow = null;
                     this.selected = null;
      }, bad => {
        console.error('error in borrow update comp ' + bad);
      });
}
delete(id: number) {
  this.borrowService.destroy(id).subscribe(lifeisGood => {
    this.reload();
}, bad => {
console.error('error in borrow update comp ' + bad);
});
}
reload() {
  this.borrowService.index().subscribe(
    lifeIsGood => {
      this.borrows = lifeIsGood;
      console.log(this.borrows);
    },
    whenThingsGoBad => {
      console.error('Error in Borrow List Component - reload()');
      console.error(whenThingsGoBad);
    }
  );
}
}
