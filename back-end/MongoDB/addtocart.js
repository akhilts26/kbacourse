user.post('/addToCart' ,async (req ,res )=> {
    try{
        const UserName = req.name
        const {CourseName} = req.body
        const courseInfo = await courseSample.findOne({courseName:CourseName})
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