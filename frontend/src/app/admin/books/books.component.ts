import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_service/book.service';
import { FormsModule } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  book:Book[]=[]
  editbook!:Book 
  key=1
  disabled:Boolean = true
  submit:boolean= false
  loading:boolean = false
  errormessage:String =''
  bookdata = {_id:"",name:'',discription:'',author:"",stock:1}

  
  constructor(private bookService:BookService,
              private route:Router){}

  ngOnInit(): void {this.bookService.getBook().subscribe({next:data=>{this.book.push(...data.book)}})}

  bookid(id:number){
    if (id==-1) {
      this.key=3
    }
    else{
      this.key=2
      this.disabled = false
      this.editbook = this.book[id]
    }
    
  }

  //-----Modify Book---//

  onSubmit(){
    this.loading=true
    this.bookService.updateBook(this.editbook._id,this.editbook.name,this.editbook.author,this.editbook.discription,this.editbook.stock)
    .subscribe({
      next:val=>{
        this.loading=false
        this.key=1
      },
      error:err=>{
        this.errormessage="Unknown error when logging into account"
      }
    }).add(()=>{
        this.disabled=true
    })
  }

//----Create Book---//

  submitBook(){
    this.bookService.createBook(this.bookdata.name,this.bookdata.author,this.bookdata.discription,this.bookdata.stock)
      .subscribe({
        next:val=>{
          this.loading=false
          this.route.navigate(['/admin'])
        },
        error:err=>{
          this.errormessage="Unknown error when logging into account"
        }
      }).add(()=>{
        this.disabled=true
      })
  }

//----Delete Book----//

  delete(_id:String){
    this.bookService.deleteBook(_id).subscribe({
      next:val=>{
        let index = this.book.findIndex(prop=> prop._id == _id)
        this.book.splice(index,1)
        
      }
    })
  }

  refresh(){
    this.book.length = 0
    this.ngOnInit()
  }
}

class Book{
  _id!:String
  name!:String
  discription!:String
  author!:String
  stock!:Number
}
