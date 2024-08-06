import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../_service/book.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit {
  data:data[]=[]
  value!:Boolean

  constructor(private bookservice:BookService){}

ngOnInit(): void {
  this.bookservice.record()
  .subscribe({
    next:(val)=>{this.data.push(...val.data);this.value = this.data.length==0?false:true}})
}
  refresh(){
    this.data.length = 0;
    this.ngOnInit()

  }
}

class data{
  book!:String
  user!:String
  email!:String
  issuedDate!:Date
  dueDate!:Date
  returnDate!:Date
  status!:String
}