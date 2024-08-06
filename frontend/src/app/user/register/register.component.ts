import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../_service/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent,FormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

 formdata = {name:"",email:"",password:""}
 submit = false
 loading = false
 errormessage = ""

 constructor(private auth:AuthService,
            private route:Router){}

 ngOnInit(): void {
  this.auth.canAuthenticate()
}

onsubmit(){
  this.loading =true

  this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password)
  .subscribe({
    next:value=>{
      this.route.navigate(["/login"])
      
    },
    error:value=>{
      if (value.error.message=="email already exist") {
        this.errormessage = "Already Email Exits!"
        }
      else{
        this.errormessage = "Unknown error occured when creating account"
      }
      
    }
  }
  ).add(()=>
    this.loading = false
  )
}
}