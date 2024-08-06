import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  user:User[]=[]
  edituser!:User 
  key=1
  submit:boolean= false
  loading:boolean = false
  errormessage:String =''
  userdata = {name:'',email:'',password:"",role:''}

  constructor(private auth:AuthService){}

  ngOnInit(): void {
          this.auth.allUser().subscribe({next:data=>{this.user.push(...data.user)}})
  }

  userid(id:number){
    if (id==-1) {
      this.key=3
    }
    else{
      this.key=2
      this.edituser = this.user[id]
    }
    
  }

  //-----Modify Book---//
  onSubmit(){
    this.loading=true
    this.auth.updateUser(this.edituser._id,this.edituser.name,this.edituser.email,this.edituser.role)
    .subscribe({
      next:val=>{
        this.loading=false
        this.key=1
      },
      error:err=>{
        this.errormessage="Unknown error when logging into account"
      }
    })
  }

//----Create User---//
  submitUser(){
    this.auth.createUser(this.userdata.name,this.userdata.email,this.userdata.password,this.userdata.role)
      .subscribe({
        next:val=>{
          this.loading=false
          this.user.length = 0
          this.key=1
          this.ngOnInit()
        },
        error:err=>{
          this.errormessage="Unknown error when logging into account"
        }
      }).add(()=>{
         this.userdata = {name:'',email:'',password:"",role:''}
      })
  }

//----Delete Book----//
  delete(_id:String){
    this.auth.removeUser(_id).subscribe({
      next:val=>{
        let index = this.user.findIndex(prop=> prop._id == _id)
        this.user.splice(index,1)
      }
    })
  }

  refresh(){
    this.user.length = 0;
    this.ngOnInit()
  }

}

class User{
  _id!:String
  name!:String
  email!:String
  role!:String
}
