import { Borrow } from './../models/borrow';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  borrows: Borrow[] = [];
  newBorrow: Borrow = new Borrow();
  editBorrow: Borrow = null;
  borrow: any;
  private baseUrl = 'http://localhost:8084/';
  private url = this.baseUrl + 'api/borrows';

  constructor(private http: HttpClient) { }

index() {
  return this.http.get<Borrow[]>(this.url)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error - borrow Service Index');
      })
    );
}
create(borrow: Borrow) {
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }) };
  this.borrows.push(borrow);
  return this.http.post<any>(this.url, borrow, httpOptions)
    .pipe(
      catchError((err: any) => {
    console.log(err);
    return throwError('err in borrowservice');
    })
    );
}
update(id: number, borrow: Borrow) {
  const httpOptions = {headers: new HttpHeaders({
    'Content-Type':  'application/json',
}) };
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.borrows.length; i++) {
    if (this.borrows[i].id === borrow.id) {
      this.borrows[i].name = borrow.name;
      this.borrows[i].value = borrow.value;
      this.borrows[i].description = borrow.description;
      this.borrows[i].borrowedFrom = borrow.borrowedFrom;
      this.borrows[i].returned = borrow.returned;
    }
  }
  this.editBorrow = null;
  return this.http.put<any>(this.url + '/' + id, borrow, httpOptions);
}
destroy(id: number) {
  return this.http.delete(this.url + '/' + id)
  .pipe(
    catchError((err: any) => {
      console.log(err);
      return throwError('error in borrowservice destroy');
    })
  );
}
}
