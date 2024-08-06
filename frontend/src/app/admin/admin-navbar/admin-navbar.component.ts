import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  constructor(private auth:AuthService,
              private route:Router){}

  logout(){
    this.auth.logOut().subscribe(
      {next:val=>{this.auth.removeCookie(); this.route.navigate(['/admin'])}}
    )
    
  }
}
