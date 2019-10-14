export class Borrow {
  id: number;
  name: string;
  value: number;
  description: string;
  returned: boolean;
  borrowedFrom: string;
  borrowed: boolean;
  lent: boolean;
  dateBorrowed: string;
  dateReturned: string;

  constructor(
    id?: number,
    name?: string,
    value?: number,
    description?: string,
    returned?: boolean,
    borrowedFrom?: string,
    borrowed?: boolean,
    lent?: boolean,
    dateBorrowed?: string,
    dateReturned?: string
  ) {
    this.id = id;
    this.name =  name;
    this.value =  value;
    this.description =  description;
    this.returned =  returned;
    this.borrowedFrom =  borrowedFrom;
    this.borrowed =  borrowed;
    this.lent =  lent;
    this.dateBorrowed = dateBorrowed;
    this.dateReturned = dateReturned;
  }

}
