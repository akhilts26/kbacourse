function adminCheck(req ,res ,next ){
    // console.log(`in admincheck : ${req.role}`);

    if(req.role == 'admin'){
        next()
    }else{
        console.log("unauthorised access(not a admin)")
        res.status(401).json({msg : "unauthorised access(not a admin)"})
    }
}

export default adminCheck