import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_service/book.service';

@Component({
  selector: 'app-issuebook',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './issuebook.component.html',
  styleUrl: './issuebook.component.css'
})
export class IssuebookComponent implements OnInit {
  borrow:Borrow[]=[]
  value!:Boolean
  constructor(private bookservice:BookService){}

  ngOnInit(): void {
    this.bookservice.allBorrow().subscribe({next:(val)=>{this.borrow.push(...val.borrow);this.value = this.borrow.length == 0 ? false:true}})
  }

  remove(id:String){
    this.bookservice.removeBorrow(id).subscribe({
      next:()=>{
        let index = this.borrow.findIndex(prop =>{prop._id == id})
        this.borrow.splice(index,1)
        if(this.borrow.length == 0){
          this.value = false
        }
      }
    })
  }
  refresh(){
    this.borrow.length = 0
    this.ngOnInit()
  }
}

class Borrow{
  _id!:String
  userId!:{email:String,name:String}
  bookId!:{name:String}
  issuedDate!:Date
  dueDate!:Date
}
