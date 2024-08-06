import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
@Component({
  selector: 'app-suspend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suspend.component.html',
  styleUrl: './suspend.component.css'
})
export class SuspendComponent implements OnInit {

  constructor(private auth:AuthService){}

  ngOnInit(): void {
    this.auth.canAccess()  
  }

  remove(){
    this.auth.removeCookie()
    this.auth.canAccess()
  }
}
