const connectDatabase = require('../config/database');
const books = require('../data/book.json');
const Book = require('../models/bookModel')
const User = require('../models/userModel')
const record = require('../models/recordsModel')
const request = require('../models/requestModel')
const borrow = require('../models/borrowModel')
const dotenv = require("dotenv")


dotenv.config({path:"backend/config/config.env"})
connectDatabase()

const seeder = async ()=>{
    try{
        await Book.deleteMany()
        console.log('book deleted')
        await record.deleteMany()
        console.log('records deleted')
        await request.deleteMany()
        console.log('request deleted')
        await borrow.deleteMany()
        console.log('borrow deleted')
        await User.deleteMany()
        console.log("user deleted");
        await Book.insertMany(books)
        console.log("book added!")
        await User.create({
            "name":"admin",
            "password":"admin123",
            "email":"admin@gmail.com",
            "role":"admin"
        })
        await User.create({
            "name":"ravi",
            "password":"123456",
            "email":"ravi@gmail.com",
            "role":"user"
        })
        console.log("Admin Created!");
        console.log("Admin Email    - admin@gmail.com");
        console.log("Admin Password - admin123");
    }catch(err){
        console.log(err.message);
    }
    process.exit()
    

}

seeder()
