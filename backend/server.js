const app = require('./app')
const path = require("path")
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')


dotenv.config({path:path.join(__dirname,"config/config.env")})

connectDatabase()

app.listen(process.env.PORT,()=>{
    console.log(`server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
})

