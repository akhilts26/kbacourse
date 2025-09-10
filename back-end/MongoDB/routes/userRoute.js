import { Router } from "express";
import { courseSample ,cartSample} from "../models/myCollections.js";
import sharp from "sharp"


const user = Router()

const cart = new Map()


user.get('/viewAll' ,async (req ,res )=>{
    const result = await courseSample.find()
    console.log(result);
    res.status(200).json({msg : "successfully displayed"})
})


user.get('/viewCourse' ,async (req ,res )=>{
    const {CourseName} = req.body
    const course = await courseSample.findOne({courseName:CourseName})
    
    if(course){
        const imageBuffer = Buffer.from(course.image, "base64");
        // const compressedImage = await sharp(imageBuffer).resize({ width: 300 }).jpeg({ quality: 70 }).toBuffer();
        // res.set({
        //     "Content-Type": "video/mp4",
        //     "Content-Length": imageBuffer.length,
        // });
        
        // res.send(imageBuffer);
        // const videoBuffer = Buffer.from(course.image, "base64");

        // res.set({
        //     "Content-Type": "video/mp4",
        //     "Content-Length": videoBuffer.length,
        // });

        // res.send(videoBuffer);

        console.log(course);
        res.status(201).json({msg : "course detailss...."})
    }else{
        console.log("invalid course name");
        res.status(400).json({msg : "invalid course name"})
    }
    
    
})

// user.get('/getCourse' ,async (req ,res )=> {
    

//     const search = req.query.search
//     console.log(`my search : ${search}`);
    
//         const coureseSearch = await courseSample.findOne({courseName:search})
//         if(coureseSearch){
//             // console.log(coureseSearch);
//             // res.send(coureseSearch)
//             console.log(coureseSearch)
//             res.status(200).json({msg:"displaying course"})
            

//         }else{
//             res.status(404).json('course not found')
//         }
    
    
// })

// user.get('/getCourse/:search' ,async(req ,res )=> {
//     // console.log(course);
    
//     // console.log(req.params.search);
//     const search = req.params.search
//     const coureseSearch = await courseSample.findOne({courseName:search})
//     console.log(`my search : ${search}`);
    
//         // const coureseSearch = course.get(search)
//         if(coureseSearch){
//             // console.log(coureseSearch);
//             console.log(coureseSearch)
//             res.status(200).json({msg:"displaying course"})
//         }else{
//             res.status(404).json('course not found')
//         }
    
    
// })

user.post('/addToCart' ,async (req ,res )=> {
    try{
        const UserName = req.name
        const {CourseName} = req.body
        
        const courseInfo = await courseSample.findOne({courseName:CourseName})
        // console.log(courseInfo);
        // cartSample.forEach(v=>{
        //     console.log(v);
            
        // })

        if(courseInfo){
            const cartInfo = {
                CourseName : CourseName,
                Price : courseInfo.price
            }
            const userCart = await cartSample.findOne({userName:UserName})
            if(userCart){
                let check = false
                const cart = userCart.myCart
                cart.forEach((val)=>{
                    if(val.CourseName == CourseName){
                        check = true
                    }
                })
                if(check == true){
                    console.log('course already in the cart');
                    res.status(201).json('course already in the cart')
                }else{
                    await cartSample.updateOne({userName:UserName},{$push:{myCart:cartInfo}})
                    console.log('new user added to cart');
                    // userCart.myCart = a
                    console.log(await cartSample.findOne({userName:UserName}));
                    console.log('course added to the cart');
                    res.status(201).json('course added to the cart')
                }

            }else{     
                
                const newCart = new cartSample({
                    userName : UserName,
                    myCart : cartInfo
                })
                await newCart.save()
                console.log(await cartSample.findOne({userName:UserName}));
                console.log('course added to the cart');
                res.status(201).json('course added to the cart')
                
            }
        }else{
            console.log("Invalid course Name");
            
            res.status(404).json({msg : "Invalid course Name"})
        }

    }catch(err){
        console.log(err);
        
        res.status(404).json({msg : "something went wrong"})
    }
})


user.get('/viewCart' ,async (req ,res )=>{
    const UserName = req.name
    const userCart = await cartSample.findOne({userName:UserName})
    
    
    if(!userCart || userCart.myCart.length == 0){
        console.log('Empty Cart');
        res.status(404).json("empty cart")
    }else{
        console.log(userCart.myCart.length);
        console.log(userCart.myCart)
        res.status(201).json({msg : "displaying cart"})
    }
})

user.post('/removeFromCart' ,async (req ,res )=>{
    try{
        let check = false
        const {CourseName} = req.body
        const UserName = req.name
        const result = await cartSample.findOne({userName:UserName})
        // console.log(result.myCart);
        result.myCart.forEach(val=>{
            // console.log(val.CourseName);
            if(val.CourseName == CourseName){
                check = true
                // console.log(indexof());
                
            }
            
        })
        if(check == true){
            await cartSample.updateOne({courseName:CourseName},{$})
        }else{
            console.log('Course is not in the cart');
            res.status(404).json('Course is not in the cart')
        }
    
        


    }catch(err){
        console.log(err);
        
        res.status(404).json("something went wrong")
    }
})

export default user





