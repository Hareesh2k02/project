import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formdata = {email:"",password:""  }
  submit=false
  loading=false
  errormessage=""
  
  
  constructor(private auth:AuthService,
              private cookie:CookieService,
              private route:Router){}

  ngOnInit(): void {
    this.auth.canAuthenticate()
  }


  onSubmit(){
    this.loading=true

    this.auth.login(this.formdata.email,this.formdata.password).subscribe({
      next:data=>{
        const token = this.auth.encrypt('user')
        this.cookie.set('auth-token',token,{expires: 1})
        this.route.navigate(['/'])
      },
      error:data=>{
        if(data.error.message=="email or password invalid") {
          this.errormessage = "Invalid Credentials!"
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
