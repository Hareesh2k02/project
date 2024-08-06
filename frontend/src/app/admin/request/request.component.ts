import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../_service/book.service';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent implements OnInit{

request:req[] = []
value!:boolean
constructor(private bookservice:BookService){}


ngOnInit(){this.bookservice.getRequest().subscribe({next:data=>{this.request.push(...data.details);this.value = this.request.length==0?false:true;console.log(this.request[0].user);
}})}

accept(i:number,userid:String,id:String,bookid:String,due:Number){
  this.bookservice.approveReq(id,userid,bookid,due).subscribe({next:data=>{
    this.request.splice(i,1)
    if(this.request.length == 0){
      this.value = false
    }
  }})
}

cancel(i:number){
  let id = this.request[i].id
  this.bookservice.cancelRequest(id).subscribe({next:data=>{
    this.request.splice(i,1)
    if(this.request.length == 0){
      this.value = false
    }
  }})
}
refresh(){
  this.request.length = 0
  this.ngOnInit()
}

}


class req{
  id!:String
  bookId!:String
  userId!:String
  book!:String
  user!:String
  email!:String
  due!:Number
  issueDate!:Date
  returnDate!:Date
}