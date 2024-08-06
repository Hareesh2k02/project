const Borrow = require("../models/borrowModel")
const User =require("../models/userModel")
const Book = require("../models/bookModel")
const Reqbook = require("../models/requestModel")
const Record = require("../models/recordsModel")

//Request Api - /api/v3/req - POST
exports.requestBook = async (req,res,next)=>{
    const {bookid,due} = req.body

    const borrow = await Borrow.findOne({userId:req.user.id})
    if (borrow) {
        return res.status(400).json({
            success:false,
            message:"Already you have a book"
        })
    }

    const val = await Reqbook.findOne({user:req.user.id})
    if (val && val.status === "pending"){
        return res.status(400).json({
            success:false,
            message:"Already you sended request"
        })
    }
    
    const book = await Book.findById(bookid)
    if(book.stock<2){
        return res.status(400).json({
            success:false,
            message:"Book copies not available now"
        })
    } 

    await Reqbook.create({
        user:req.user.id,
        bookId:bookid,
        book:book.name,
        due
    })
    res.status(200).json({
        success:true
    })
}

//myNodify - api/v3/mynotify - GET
exports.myNotify = async (req,res,next)=>{
    let data = await Reqbook.find({user:req.user.id})

    if(data.length == 0){
        return res.status(200).json({
            success:false,
            message:"no request"
        })
    }
    const value = []
    data.map((data)=>{
        add=async()=>{
        value.push({book:data.book,status:data.status})
        if(data.status == "approved" ||data.status == 'canceled'||data.status == 'Book Removed'){
            await Reqbook.findByIdAndDelete(data.id)
        }
    }
    add()
    }) 
    res.status(200).json({
        success:true,
        value
    })
}

//My Borrowed Book - /api/v3/mybook - GET
exports.myBook = async (req,res,next) =>{
    let book = await Borrow.findOne({userId:req.user.id}).populate('bookId','name author discription')
    
    if(!book){
        return res.status(404).json({
            success:false,
            message:"no books borrowed"
    })}
    
    res.status(200).json({
        success:true,
        book
    })
}

//Return Book - /api/v3/return/:id
exports.returnBook = async (req,res,next)=>{
    const borrow = await Borrow.findById(req.params.id)

    if(!borrow){
        return res.status(404).json({
            success:false,
            message:"book not found"
    })}

    let book = await Book.findById(borrow.bookId)
    book.stock +=1
    await Book.findByIdAndUpdate(borrow.bookId,{stock:book.stock})
    await Record.findOneAndUpdate({borrowId:borrow.id},{status:'returned',returnDate:Date.now()})
    await Borrow.deleteOne()

    res.status(200).json({
        success:true
    })
}


//---------------Admin Controller ----------------//


//Admin Get All BorrowedBooks - /api/v3/admin/allbook - GET
exports.borrowedBooks = async (req,res,next) => {
    const borrow = await Borrow.find().populate('userId').populate('bookId','name')
    if(borrow == 0){
        return res.status(201).json({
            success:true,
            message:"no borrowed books"
        })
    }
    res.status(201).json({
        success:true,
        count:borrow.length,
        borrow
    })
}

//admin Approve Book - /api/v3/approve -POST
exports.approveBook = async(req,res,next)=>{
    const {id,userid,bookid,due} = req.body
    const dueDate = new Date(Date.now() + due*1000*60*60*24)

    const user =await User.findById(userid)
    let book = await Book.findById(bookid)
    book.stock -=1
    await Book.findByIdAndUpdate(bookid,{stock:book.stock})
    

    await Borrow.create({
        userId:userid,
        bookId:bookid,
        dueDate
    })
    let borrow = await Borrow.findOne({userId:userid})
    await Reqbook.findByIdAndUpdate(id,{status:"approved"})
    await Record.create({
        userId:user.id,
        bookId:book.id,
        borrowId:borrow.id,
        user:user.name,
        email:user.email,
        book:book.name,
        dueDate
    })

    res.status(200).json({
        success:true,
    })
}


//Admin remove Borrowedbook - api/v3/admin/remove/:id DELETE
exports.removeBook = async (req,res,next) =>{
    const borrow = await Borrow.findById(req.params.id) 

    if(!borrow){
        return res.status(404).json({
            success:false,
            message:"id not found"
    })}

    let book = await Book.findById(borrow.bookId)
    book.stock += 1
    await Book.findByIdAndUpdate(borrow.bookId,{stock:book.stock})
    await Record.findOneAndUpdate({borrowId:borrow.id},{status:'returned',returnDate:Date.now()})
    await Borrow.findByIdAndDelete(borrow.id)

    res.status(200).json({
        success:true
    })

}

//getRequest Api - /api/v3/getreq  POST

exports.getReq = async (req,res,next)=>{
    let data = await Reqbook.find({status:'pending'}).populate('user','name email').populate('bookId','name')

    const details = []
    for (const [index ,value] of data.entries()) {
        
        let user = await User.findById(value.user)
        let book = await Book.findById(value.bookId)
        if(!user){
            await Reqbook.findByIdAndDelete(value.id)
            return
        }
        else if(!book){
            await Reqbook.findByIdAndUpdate(value.id,{status:"Book Removed"})
            return
        }
        else{
            let currentdate = new Date()
            var returnDate = new Date(Date.now() + value.due * 24 * 60 * 60 * 1000 )
            details.push({
                id:value.id,
                bookId:value.bookId.id,
                userId:value.user.id,
                book:value.bookId.name,
                user:value.user.name,
                email:value.user.email,
                due:value.due,
                issueDate:currentdate,
                returnDate
            })
    }
}
res.status(200).json({success:true,details})
}

//Cancel Request  /api/v3/admin/cancel - GET
exports.cancelReq = async (req,res,next) =>{
    await Reqbook.findByIdAndUpdate(req.params.id,{status:"canceled"})
    res.status(200).json({
        success:true
    })
}

//Admin Book Status - /api/v3/admin/bookstatus
exports.bookStatus = async (req,res,next) =>{
    const book = await Book.find()
    const borrow = await Borrow.find()
    let books = []
    
    book.forEach((book)=>{
        bok = {id:book.id,name:book.name,stock:book.stock,issuedBook:0}
        return books.push(bok)
    })

    for (let i = 0; i < borrow.length; i++) {
        books.forEach(books=>{
            a = books.id
            b = borrow[i].bookId
            if (a==b) {
                return books.issuedBook += 1
            }
        })
    }

    res.status(200).json({
        books
    })

}

//get FineAmount API  /api/v3/fine -GET
exports.fine = async(req,res,next)=>{
    let borrow = await Borrow.find().populate('bookId','name').populate('userId','name email')
    const data = []
    borrow.map((val)=>{
        let d1 = new Date(val.dueDate)
        let d2 = new Date(Date.now())
        let due = Date.parse(d1)
        let current = Date.parse(d2)
        let sec = Math.abs(Date.now() - d1)
        let day = Math.ceil(sec/(1000*60*60*24)) * 50
        
        if(due<current){
            data.push({book:val.bookId.name,user:val.userId.name,email:val.userId.email,issuedDate:val.issuedDate,dueDate:val.dueDate,fine:day})
        }
    })

    res.status(200).json({
        data
    })
}

//Book Records Api /api/v3/admin/record  - GET

exports.record = async(req,res,next)=>{
    let data = await Record.find()

    if(!data){
        return res.status(400).json({
            success:false,
            message:'no records'
        })
    }
    for (const [index,val] of data.entries()) {
        let user=  await User.findById(val.userId)
        let book = await Book.findById(val.bookId)
        if(!user){
            data[index].user = data[index].user+'*'
        }
        if(!book){
            data[index].book = data[index].book+'*'
        }
    }
    res.status(200).json({
        success:true,
        data
    })
    
}