import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  val:String =''
  constructor(private http:HttpClient,
              private route:Router,
              private cookie:CookieService) { }

  encrypt(value:string){
    const encrypt = CryptoJS.AES.encrypt(value,"mKXI6LHMRhXK2Ng").toString()
    return encrypt
  }

  decrypt(){
    let cookies = this.cookie.get('auth-token')
    const decrypt=  CryptoJS.AES.decrypt(cookies,"mKXI6LHMRhXK2Ng")
    return decrypt.toString(CryptoJS.enc.Utf8);

  }
  
  isAuthenticated():Boolean{
    const id = this.decrypt()
    if (this.cookie.check('auth-token')==false){
      return false
    }
    return true
  }
  canAccess(){
    if (!this.isAuthenticated()) {
      this.route.navigate(["/login"])
    }
  }
  
  canAuthenticate(){
    const id = this.decrypt()

    if (id == 'user'){
      this.route.navigate(["/"])
    }
    if (id == "admin"){
      this.route.navigate(['/admin-panel'])
    }
  }

  suspend(){
    this.route.navigate(['/suspend'])
  }

  register(name:String,email:String,password:String){
    return this.http.post("http://127.0.0.1:1800/api/v2/register",{
      name,email,password
    },{withCredentials: true})

  }
  removeCookie(){
    this.cookie.delete('auth-token')
    this.cookie.delete('token')
  }

  login(email:string,password:String){
    return this.http.post<{user:object}>("http://127.0.0.1:1800/api/v2/loginuser",{
      email,password
    },{withCredentials: true})
  }
  userName(){
    return this.http.get<{names:String}>("http://127.0.0.1:1800/api/v2/username",{withCredentials:true})
  }

  logOut(){
    return this.http.get("http://127.0.0.1:1800/api/v2/logout",{withCredentials:true})
  }

  //----------------Admin----------------//

  //----Admin Login----//

  adminLogin(email:string,password:String){
    return this.http.post("http://127.0.0.1:1800/api/v2/adminlogin",{
      email,password
    },{withCredentials: true})
  }

  //------All User------//
  allUser(){
    return this.http.get<{user:Array<{_id:String,name:String,email:String,role:String}>}>("http://127.0.0.1:1800/api/v2/getuser",{withCredentials:true})
  }

  //-----UpdateUser-----//
  updateUser(_id:String,name:String,email:String,role:String){
    return this.http.put("http://127.0.0.1:1800/api/v2/user/"+_id,{name,email,role},{withCredentials:true})
  }

  //-----CreateUser-----//
  createUser(name:String,email:String,password:String,role:String){
    return this.http.post<{user:Array<{_id:String,name:String,email:String,password:String,role:String}>}>("http://127.0.0.1:1800/api/v2/user/add",{name,email,password,role},{withCredentials:true})
  }

  //------RemoveUser----//
  removeUser(_id:String){
    return this.http.delete("http://127.0.0.1:1800/api/v2/user/"+_id,{withCredentials:true})
  }

}