import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_service/book.service';

@Component({
  selector: 'app-book-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-status.component.html',
  styleUrl: './book-status.component.css'
})
export class BookStatusComponent implements OnInit {
  
  status:Status[]=[]

  constructor(private bookservice:BookService){}

  ngOnInit(): void {
    this.bookservice.bookStatus().subscribe({
      next:(val)=>{this.status.push(...val.books)}})
  }

  issuedBook(val:number){
    return val == 0 ?'-':val
  }
  
  refresh(){
    this.status.length = 0
    this.ngOnInit()
  }

}

class Status {
  name!:String
  stock!:number
  issuedBook!:number

}
