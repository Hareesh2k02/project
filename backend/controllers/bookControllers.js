const Book = require('../models/bookModel')
const Borrow =require('../models/borrowModel')
const User =require('../models/userModel')
const Record =require('../models/recordsModel')

//Get book = /api/v1/books - GET
exports.getBooks = async (req,res,next)=>{
    const book = await Book.find()
    res.status(200).json({
        sucess:true,
        count:book.length,
        book
    })
}

//Get single book = /api/v1/book/id - GET
exports.singleBook = async (req,res,next)=>{
    let book = await Book.findById(req.params.id)
    if (!book) {
        return res.status(404).json({
            sucess:false,
            message:"book not found"
        })
    }
    res.status(201).json({
        sucess:true,
        book
    })
}

//------------Admin Controller---------//

//Create book - /api/v1/books/new
exports.newBook = async (req,res,next)=>{
   let book = await Book.create(req.body)
   res.status(201).json({
    sucess:true,
    book
})
}

//update book -/api/v1/book/:id - PUT
exports.updateBook = async (req,res,next)=>{
    let book = await Book.findById(req.params.id)
    if (!book) {
        return res.status(404).json({
            sucess:false,
            message:"book not found"
        })
    }
    book = await Book.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    res.status(201).json({
        sucess:true,
        book
    })
}

//delete book --/api/v1/book/id - DELETE
exports.deleteBook = async (req,res,next)=>{
    let book = await Book.findById(req.params.id)
    if (!book) {
        return res.status(404).json({
            sucess:false,
            message:"book not found"
        })
    }
    let borrow = await Borrow.find({bookId:book.id})
    if(!borrow.length == 0){
        for (let index = 0; index < borrow.length; index++){
            await Borrow.findByIdAndDelete(borrow[index].id)
        }
    }
    await Record.updateMany({bookId:book.id},{status:'returned',returnDate:Date.now()})
    
    await book.deleteOne()

    res.status(200).json({
        sucess:true,
        message:"book deleted"
    })
}

