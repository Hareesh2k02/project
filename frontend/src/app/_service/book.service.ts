import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient,private auth:AuthService) { }

  book:Book[] = []
  val:Boolean= true
  
  getBook(){
    return this.http.get<{book:Array<{_id:String,name:String,author:String,discription:String,stock:Number}>}>("http://127.0.0.1:1800/api/v1/books",{withCredentials: true})
  }
  
  oneBook(){
    return this.http.get<{_id:String,name:String,author:String,discription:String,stock:Number}>("http://127.0.0.1:1800/api/v1/books/",{withCredentials:true})
  }

  onebook(i:String){
    this.getBook().subscribe({next:data=>{
      const value =  data.book.find((val,index)=>{
        this.book.length = 0
        return i == val._id
      }) 
      if(value)
      this.book.push(value)
    },error:data=>{if (data.error.message == "Your account has suspended") {
      this.auth.suspend()
    } }})
  }

  bookInfo(){
    return this.book
  }
  
  requestBook(bookid:String,due:Number){
    return this.http.post('http://127.0.0.1:1800/api/v3/req/',{
      bookid,
      due
    },{withCredentials:true})
  }

  myBook(){
    return this.http.get<{book:{_id:String,bookId:{_id:String,name:String,author:String,discription:String}}}>("http://127.0.0.1:1800/api/v3/mybook",{withCredentials:true})
  }

  returnBook(id:String){
    return this.http.delete('http://127.0.0.1:1800/api/v3/return/'+id,{withCredentials:true})
  }
  
  mynotify(){
    return this.http.get<{value:Array<{book:String,status:String}>}>('http://127.0.0.1:1800/api/v3/mynotify',{withCredentials:true})
  }


  //-----------Admin Request------------//

  createBook(name:String,author:String,discription:String,stock:Number){
    return this.http.post<{book:Array<{_id:String,name:String,author:String,discription:String,stock:Number}>}>("http://127.0.0.1:1800/api/v1/books/new",{name,author,discription,stock},{withCredentials:true})
  }
  
  updateBook(_id:String,name:String,author:String,discription:String,stock:Number){
    return this.http.put<{book:Array<{_id:String,name:String,author:String,discription:String,stock:Number}>}>("http://127.0.0.1:1800/api/v1/books/"+_id,{name,author,discription,stock},{withCredentials:true})
  }

  deleteBook(_id:String){
    return this.http.delete("http://127.0.0.1:1800/api/v1/books/"+_id,{withCredentials:true})
  }

  allBorrow(){
    return this.http.get<{borrow:Array<{_id:String,userId:{name:String,email:String},bookId:{name:String},issuedDate:Date,dueDate:Date}>}>("http://127.0.0.1:1800/api/v3/admin/allbook",{withCredentials:true})
  }

  removeBorrow(id:String){
    return this.http.delete('http://127.0.0.1:1800/api/v3/admin/remove/'+id,{withCredentials:true})
  }

  bookStatus(){
    return this.http.get<{books:Array<{name:String,stock:number,issuedBook:number}>}>('http://127.0.0.1:1800/api/v3/admin/bookstatus',{withCredentials:true})
  }

  fine(){
    return this.http.get<{data:Array<{book:String,user:String,email:String,issuedDate:Date,dueDate:Date,fine:Number}>}>('http://127.0.0.1:1800/api/v3/admin/fine/',{withCredentials:true})
  }

  getRequest(){
    return this.http.get<{details:Array<{id:String,bookId:String,userId:String,book:String,user:String,email:String,due:Number,issueDate:Date,returnDate:Date}>}>('http://127.0.0.1:1800/api/v3/admin/getreq',{withCredentials:true})
  }

  approveReq(id:String,userid:String,bookid:String,due:Number){
    return this.http.post('http://127.0.0.1:1800/api/v3/admin/approve/',{id,userid,bookid,due},{withCredentials:true})
  }

  cancelRequest(id:String){
    return this.http.get('http://127.0.0.1:1800/api/v3/admin/cancel/'+id,{withCredentials:true})
  }
  record(){
    return this.http.get<{data:Array<{book:String,user:String,email:String,issuedDate:Date,dueDate:Date,returnDate:Date,status:String}>}>('http://127.0.0.1:1800/api/v3/admin/record',{withCredentials:true})
  }


}


class Book{
  _id!:String
  name!:String
  discription!:String
  author!:String
  stock!:Number
}