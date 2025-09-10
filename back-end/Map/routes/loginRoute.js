import { json, Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const router = Router()
const user = new Map()


// router.get('/hi',(req,res) => {
//     console.log("hai all");
//     res.send("hai all")
// })

router.post('/signup',async (req,res) =>  {
    // console.log(`user start :`);
    // console.log(user);
    
    try{
        const {UserName,FirstName,LastName,Password,Role} = req.body
        const result = user.get(UserName)
        if(result){
            res.status(404).json({msg: "user already exist"})
        }
        else{
            try{
            const newPassword = await bcrypt.hash(Password,10)
            // console.log(newPassword);
        
            user.set(UserName,{FirstName,LastName,newPassword,Role})
            console.log(`user end :`);
            console.log(user);
            
            res.status(201).json({msg:'Successfuly Created'}) //  value pair is used in common here
            }catch{
                res.status(404).json({msg: "something wrong in bcrypt"})
            }
        }
        // console.log(LastName);
        
    }catch(error){
        res.status(500).send(error)
    }
})

router.post('/login',async(req,res) => {
    try{
        const {UserName,Password} = req.body
        const result = user.get(UserName)
        if(!result){
            res.status(404),json({msg: "UserName is not registerd"})
        }
       
        
        
        const valid = await bcrypt.compare(Password,result.newPassword)
        console.log(valid);
        if(valid){
            let token = jwt.sign({UserName ,Role : result.Role},process.env.SECRET_KEY, {expiresIn :"1h" })
            console.log(token);
                            
            if(token){
                res.cookie('authToken' ,token ,{
                    httpOnly : true
                })
                res.status(200).json({msg : "Successfully loggedin"})
            }else{
                res.status(400).json({msg : "Something wrong in toke generation"})
            }
            
            
        }
        
    }catch{
        res.json("invalid info")
    }
})


router.get('/logout' ,(req ,res )=>{
    res.clearCookie('authToken')
    res.status(200).json({msg : "logout successfully.."})
    
})

export {router}

