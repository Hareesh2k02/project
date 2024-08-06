import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { UsersComponent } from '../users/users.component';
import { BookStatusComponent } from '../book-status/book-status.component';
import { IssuebookComponent } from '../issuebook/issuebook.component';
import { BooksComponent } from '../books/books.component';
import { RequestComponent } from '../request/request.component';
import { FineaccountComponent } from '../fineaccount/fineaccount.component';
import { RecordsComponent } from '../records/records.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule,AdminSidebarComponent,AdminNavbarComponent,UsersComponent,BookStatusComponent,IssuebookComponent,BooksComponent,RequestComponent,FineaccountComponent,RecordsComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {

  constructor(private auth:AuthService){}
  keys:Number = 1
  ngOnInit(): void {
    this.auth.canAccess()
    this.auth.canAuthenticate()
  }
  keyvalue(val:any){
    return this.keys = val
  }
}
