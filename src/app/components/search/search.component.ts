import { HttpClient } from '@angular/common/http';
import { Component, Directive, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{

  title = "Angular Grid Card View";
  gridColumns = 3;

  formGroup!: FormGroup;
  post: any = '';
  totalAngularPackages: any;
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'bookname': [null, Validators.required],
    });
  }

  onSubmit(post: any) {
    this.post = post;
    console.log(this.post);
    this.http.get<any>('https://api.itbook.store/1.0/search/'+this.post.bookname).subscribe(data => {
        this.totalAngularPackages = data.books;
    })
  }

}
