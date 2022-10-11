import { BookDetailComponent } from './../book-detail/book-detail.component';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  combineLatest,
  map,
  tap,
  catchError,
  EMPTY,
} from 'rxjs';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  errorMessage = '';

  books$ = this.bookService.books$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  booksTopPicks$ = this.bookService.books$.pipe(
    map((books) =>
      this.shuffle(books.filter((book) => book.likedPercent >= 97.0))
    ),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  booksHighlyRated$ = this.bookService.books$.pipe(
    map((books) => this.shuffle(books.filter((book) => book.rating >= 4.0))),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  booksAwardWinners$ = this.bookService.books$.pipe(
    map((books) =>
      this.shuffle(books.filter((book) => book.awards.length >= 400))
    ),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  booksGAdventure$ = this.bookService.books$.pipe(
    map((books) =>
      this.shuffle(books.filter((book) => book.genres.includes('Adventure')))
    ),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  booksGRomance$ = this.bookService.books$.pipe(
    map((books) =>
      this.shuffle(books.filter((book) => book.genres.includes('Romance')))
    ),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  booksGClassics$ = this.bookService.books$.pipe(
    map((books) =>
      this.shuffle(books.filter((book) => book.genres.includes('Classics')))
    ),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  booksGChildrens$ = this.bookService.books$.pipe(
    map((books) =>
      this.shuffle(books.filter((book) => book.genres.includes('Childrens')))
    ),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  selectedBook$ = this.bookService.selectedBook$;

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.bookService.selectBook('');
  }

  shuffle(a: any[]): any[] {
    return a.sort(() => Math.random() - 0.5);
  }

  bookSelected(bookId: string) {
    const confirmDialog = this.dialog.open(BookDetailComponent, {});
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
      }
    });
    this.bookService.selectBook(bookId);
  }
}
