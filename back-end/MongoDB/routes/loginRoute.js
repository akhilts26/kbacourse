import { json, Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {sample} from "../models/myCollections.js";


const router = Router()



router.post('/signup',async (req,res) =>  {

    try{
        const {UserName,FirstName,LastName,Password,Role} = req.body

        // const result = user.get(UserName)
        const result = await sample.findOne({userName:UserName})
        if(result){
            res.status(400).json({msg: "user already exist"})
        }
        else{
            try{
                const newPassword = await bcrypt.hash(Password,10)
            
                const newUser = new sample({
                    userName : UserName,
                    firstName : FirstName,
                    lastName : LastName,
                    role : Role,
                    password : newPassword
                })
                
                
                await newUser.save()
                console.log(newUser);
                // user.set(UserName,{FirstName,LastName,newPassword,Role})
                
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
        // const result = user.get(UserName)
        const result = await sample.findOne({userName:UserName})
        if(!result){
            res.status(404),json({msg: "UserName is not registerd"})
        }
       
        
        
        const valid = await bcrypt.compare(Password,result.password)
        console.log(valid);
        if(valid){
            let token = jwt.sign({UserName ,Role : result.role},process.env.SECRET_KEY, {expiresIn :"1h" })
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

export {router}

