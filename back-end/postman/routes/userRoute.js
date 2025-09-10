import { Router } from "express";
import {course} from "./adminRoute.js";


const user = Router()

const cart = new Map()

user.get('/getCourse' ,(req ,res )=> {
    
    console.log(course);
    
    const search = req.query.search
    console.log(`my search : ${search}`);
    
        const coureseSearch = course.get(search)
        if(coureseSearch){
            // console.log(coureseSearch);
            res.send(coureseSearch)
        }else{
            res.status(404).json('course not found')
        }
    
    
})

user.get('/getCourse/:search' ,(req ,res )=> {
    console.log(course);
    
    // console.log(req.params.search);
    const search = req.params.search
    console.log(`my search : ${search}`);
    
        const coureseSearch = course.get(search)
        if(coureseSearch){
            // console.log(coureseSearch);
            res.send(coureseSearch)
        }else{
            res.status(404).json('course not found')
        }
    
    
})

user.post('/addToCart' ,(req ,res )=> {
    try{
        const {CourseName} = req.body
        const userName = req.name
        if(course.get(CourseName)){
            if(!cart.has(userName)){
                // const a = ["aj","ij"]

                // console.log(typeof(a))
                cart.set(userName,[CourseName])
                // console.log(cart);      
                console.log("course added to the cart")
                res.status(201).json({msg: "course added to the cart"})
            }else{
                let isDuplicate = false
                const userCart = cart.get(userName)
                console.log('print....')
                const a = typeof(userCart)
                console.log(userCart)
                
                    userCart.forEach((value)=> {
                        if(value == CourseName){
                            isDuplicate = true
                            console.log("course alread exist in the cart")
                            res.status(201).json({msg: "course alread exist in the cart"})
                        }
                    })
                    
                    if(isDuplicate == false){

                            userCart.push(CourseName)
                            cart.set(userName,userCart)

                            // console.log(cart);
                            console.log("course added to the cart...")
                            res.status(201).json({msg: "course added to the cart..."})
                    }
                   
            }
        }else{
            console.log("course not present in course list")
            res.status(401).json({msg : "course not present in course list"})
        }
    }catch{
        res.status(404).json({msg : "something went wrong"})
    }
})


user.get('/viewCart' ,(req ,res )=>{
    try{
        const userName = req.name
        // console.log(userName)
        const result = cart.get(userName)
        if(!result || result == ''){
            console.log('empty Cart')
            res.status(404).json({msg : "empty Cart"})
            
        }else{

            console.log('---------------------------')
            console.log('user cart :')
            result.forEach((value)=> {
                console.log(`CourseName : ${value} , Price : ${course.get(value).Price}`)
            })
            // console.log(result)
            console.log('---------------------------')
            res.status(200).json({msg : "displaying Cart"})
        }
    }catch{
        console.log('something went wrong')
        res.status(404).json({msg : "something went wrong"})
    }
})

user.post('/removeFromCart' ,(req ,res )=>{
    const {CourseName} = req.body
    // console.log(CourseName)
    const userName = req.name

    const userCart = cart.get(userName)

    if(userCart == '' || !userCart){
        console.log("Course is not present in user cart..")
        res.status(404).json({msg : "Course is not present in user cart.."})
    }else{
        const index = userCart.indexOf(CourseName)
        // console.log(index)
        if(index != -1){
            userCart.splice(index,1)
            cart.set(userName,userCart)
            console.log("Course removed from the Cart")
            res.status(404).json({msg : "Course removed from the Cart"})

        }else{
            console.log("Course is not present in user cart..")
            res.status(404).json({msg : "Course is not present in user cart.."})
        }  
    }
})

user.get('/viewPrice' ,(req ,res )=>{
    const userName = req.name
    const result = cart.get(userName)
    if(!result || result == ''){
        console.log('empty Cart')
        res.status(404).json({msg : "empty Cart"})
        
    }else{
        let price = 0
        result.forEach((value)=>{
            price += course.get(value).Price
        })
        console.log(`Total Price : ${price}`)
        res.status(200).send(price)
    }
})



export default user





