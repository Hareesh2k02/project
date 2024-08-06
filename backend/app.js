const express = require('express');
const app = express();
const books = require('./routes/book');
const auth = require('./routes/auth');
const borrow = require('./routes/borrow');
const cookieParser = require('cookie-parser');
const cors = require("cors")

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true,origin:["http://localhost:4200"]}))
app.use('/api/v1',books);
app.use('/api/v2',auth);
app.use('/api/v3',borrow);


 
module.exports = app;