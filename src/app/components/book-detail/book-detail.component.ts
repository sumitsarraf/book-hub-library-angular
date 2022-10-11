import { ChangeDetectionStrategy, Component , Inject, OnInit} from '@angular/core';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { BookService } from '../../service/book.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent {
  amazonLink = "";
  errorMessage = "";

  book$ = this.bookService.selectedBook$
    .pipe(
      tap((book) => this.amazonBook(book?.title)),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    )

  clearBook(): void {
    this.bookService.selectBook("");
  }

  amazonBook(title?: string): void {
    this.amazonLink = "https://www.amazon.com/s?k=" + title?.split(" ").join("+").toLocaleLowerCase() + "&i=stripbooks-intl-ship";
  }

 
  title!: string;
  message!: string;
  constructor(private bookService: BookService, public dialogRef: MatDialogRef<BookDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}