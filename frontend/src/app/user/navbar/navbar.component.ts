import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
  
  name:String=''

  constructor(private auth:AuthService){}

  ngOnInit(): void {
    this.auth.userName().subscribe({next:(val)=>{this.name = val.names}})
  }

  logout(){
    this.auth.logOut().subscribe(
      {next:val=>{this.auth.removeCookie(); this.auth.canAccess()}}
    )
  }

}
