import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_service/book.service';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  message:message[] = []
  value!:boolean

  constructor(private bookservice:BookService,private auth:AuthService){}

  ngOnInit(): void {
    this.bookservice.mynotify().subscribe({next:data=>{this.message.slice();this.message.push(...data.value);this.value = this.message.length==0?false:true
    },error:data=>{if (data.error.message == "Your account has suspended") {this.auth.suspend()}}})}} 

class message{
  book!:String
  status!:String
}