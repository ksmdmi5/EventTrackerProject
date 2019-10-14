import { BorrowService } from './services/borrow.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { BorrowComponent } from './components/borrow/borrow.component';
import { FormsModule } from '@angular/forms';
import { ReturnedPipe } from './pipes/returned.pipe';
import { DatePipe } from '@angular/common';
import { BorrowedOrLentPipe } from './pipes/borrowed-or-lent.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    BorrowComponent,
    ReturnedPipe,
    BorrowedOrLentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    BorrowService,
    DatePipe,
    ReturnedPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
