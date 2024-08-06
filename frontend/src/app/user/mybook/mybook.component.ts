import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookService } from '../../_service/book.service';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-mybook',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mybook.component.html',
  styleUrl: './mybook.component.css'
})
export class MybookComponent implements OnInit{
  book:Book[]=[]
  value:Boolean =true
  borrowid!:String
  @Output() key:EventEmitter<Number> = new EventEmitter

  constructor(private bookservice:BookService,private auth:AuthService){}

  ngOnInit(): void {
    this.bookservice.myBook().subscribe({next:(val)=>{this.value = false;this.book.push(val.book.bookId);this.borrowid=val.book._id},error:data=>{if (data.error.message == "Your account has suspended") {this.auth.suspend()}}})
  }

  remove(id:String){
    this.bookservice.returnBook(this.borrowid).subscribe({
      next:(val)=>{
        this.nav()
      }
    })
  }

  nav(){
    this.key.emit(1)
  }


}
class Book{
  _id!:String
  name!:String
  author!:String
  discription!:String
}