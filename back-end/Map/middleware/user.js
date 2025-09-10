function userCheck(req ,res ,next ){
    // console.log(`in user.js : ${req.role}`);
    if(req.role == 'user'){
        // console.log('user true');
        
        next()
    }else{
        console.log('unauthorised access (not a user)');
        res.status(401).json({msg : "unauthorised access (not a user)"})
    }
}

export default userCheck