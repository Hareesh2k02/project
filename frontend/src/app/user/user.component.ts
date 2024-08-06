import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from '../_service/auth.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { OneBookComponent } from './one-book/one-book.component';
import { BookService } from '../_service/book.service';
import { MybookComponent } from './mybook/mybook.component';
import { FilterPipe } from '../pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,FilterPipe,FormsModule,CommonModule,OneBookComponent,MybookComponent,NotificationComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  submit=true
  book:Book[] = []
  id!:Number
  key = 1
  value:boolean=true
  borrowid!:String
  search:string=''

  constructor(private auth:AuthService,
              private bookService:BookService
              ){} 

  ngOnInit(): void {
      this.auth.canAccess()
      this.auth.canAuthenticate()
      this.bookService.getBook().subscribe({next:data=>{this.book.push(...data.book)},error:data=>{if (data.error.message == "Your account has suspended") {
        this.auth.suspend()
      } }})
      
      
  }
    

  getbookid(i:String){
    this.bookService.onebook(i)
    console.log(i);
    this.key = 2
  }

  nav(keys:any){
    return this.key = keys
  }

}


class Book{
  _id!:String
  name!:String
  discription!:String
  author!:String
  stock!:Number
}


