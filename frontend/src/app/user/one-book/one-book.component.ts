import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../_service/book.service';
import { AuthService } from '../../_service/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-one-book',
  standalone: true,
  imports: [CommonModule,NavbarComponent,SidebarComponent,FormsModule],
  templateUrl: './one-book.component.html',
  styleUrl: './one-book.component.css'
})
export class OneBookComponent implements OnInit{

  @Output() key:EventEmitter<any> = new EventEmitter

  book:Book[] = []
  due:Number=1
  req = 1
  disabled:Boolean = true
  submit:boolean= false
  loading:boolean = false
  message:String=''
  

  constructor(private bookservice:BookService,private auth:AuthService){
  }

  ngOnInit ():void {
    this.book =  this.bookservice.bookInfo()
  }
  
  onclick(id:number){
    this.key.emit(id)
  }

  borrow(){
    this.req=2
  }

  onSubmit(){
    this.loading=true
    this.bookservice.requestBook(this.book[0]._id,this.due).subscribe({
      next:(val)=>{
        this.loading=false
        this.onclick(1)
      },
      error:(err)=>{
        if (err.error.message == 'Already you have a book') {
          this.loading=false
          this.message = 'Already you have a book'
          }  
          else if (err.error.message == 'Book copies not available now') {
            this.loading=false
            this.message = 'Book copies not available now'
          }
          else if (err.error.message == 'Already you sended request') {
            this.loading=false
            this.message = 'Already you sended request'
          }
          else{
            this.loading=false
             this.message="Unknown error when borrow book"
            }
        }
  }).add(()=>{
    this.due=1
    this.disabled=true
})
}
}

class Book{
  _id!:String
  name!:String
  discription!:String
  author!:String
}

