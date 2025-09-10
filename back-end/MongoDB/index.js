import express,{json} from 'express'
import dotenv from 'dotenv'
import {router} from './routes/loginRoute.js'
import {admin} from './routes/adminRoute.js'
import user from './routes/userRoute.js'
import {authenticate} from './middleware/auth.js'
import adminCheck from './middleware/admin.js'
import userCheck from './middleware/user.js'
import mongoose from 'mongoose'

dotenv.config()



// read the express in a instense
const app = express()
app.use(json())
app.use('/',router)

app.use('/user/',authenticate,userCheck,user)
app.use('/admin/',authenticate,adminCheck,admin)


app.get('/hi',(req,res) => {
    console.log("hello world");
    res.send("hello world")
    
})


app.post('/getData',(req,res) => {
    console.log('post methord');
    res.send("post methord")
})

mongoose.connect("mongodb://localhost:27017/kbaCourses").then(()=>{
    console.log('mongodb connected successfully')})
    .catch((error)=>{
        console.error("mongodb connection failed.:",error)
    })





// listening the backend program in a particular port 
app.listen(process.env.PORT,() =>{
    console.log(`server is listening ${process.env.PORT}`)
})






