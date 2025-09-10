import jwt from 'jsonwebtoken'



function authenticate(req ,res ,next ){
    const cookie = req.headers.cookie
    // console.log(cookie);
    if(cookie){
        
        
        const [name,token] = cookie.trim().split("=")
        // console.log(`name : ${name}`)
        // console.log(`token : ${token}`);
        if(name == "authToken"){
            const decode = jwt.verify(token,process.env.SECRET_KEY)
            // console.log(decode);
            // console.log(decode);
            req.name = decode.UserName
            req.role = decode.Role
            // console.log(`in auth.js : ${req.role}`);
            
            next()// to go next funtion from call {here admin route }
        }else{
            res.status(401).json({msg : 'unauthorised access'})
        }        
    }else{
        res.status(401).json({msg : 'cookie not found'})
    }
    
}
export {authenticate}
