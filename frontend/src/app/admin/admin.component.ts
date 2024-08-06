import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  formdata ={email:"",password:""}
  loading=false
  submit=false
  errormessage=""

  constructor(private auth:AuthService,
              private route:Router,
              private cookie:CookieService){ }

  ngOnInit(): void {
    this.auth.canAuthenticate()
  }

  onSubmit(){
    this.loading = true

    this.auth.adminLogin(this.formdata.email,this.formdata.password).subscribe({
      next:data=>{
        const token = this.auth.encrypt('admin')
        this.cookie.set('auth-token',token,{expires: 1})
        this.route.navigate(['/admin-panel'])
      },
      error:data=>{
        if (data.error.message == "role is user") {
          this.errormessage = "you are not admin"
        }
        else if(data.error.message=="invalid Credential") {
          this.errormessage = "invalid Credential"
        }
        else{
          this.errormessage="Unknown error when logging into account"
        }
      }
    }).add(()=>{
      this.loading=false
    })
    
}
}
