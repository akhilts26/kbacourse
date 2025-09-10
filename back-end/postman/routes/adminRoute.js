import { Router } from "express";


const admin = Router();
const course = new Map()



admin.post('/addCourse',(req,res)=>{
  console.log(`course start :`);
  console.log(course);
  try{
    console.log(req.name);
    const {CourseName,CourseId,CourseType,Description,Price}= req.body;
    
    if(course.get(CourseName)){
      
         res.status(400).json({msg:'Course already exist'})
    }
    else{
    try{
    course.set(CourseName,{CourseId,CourseType,Description,Price});
    console.log(`course end :`);
    console.log(course);
    res.status(201).json({msg:'Course successfully entered'})
    }

    catch{
        res.status(400).json({msg:'Something went wrong while setting data'})
    }
}
}
  catch{
    res.status(500).json({msg:'Something went wrong'})
  }
})

admin.put('/updateCourse' ,(req ,res )=> {
    try{
        const {CourseName,CourseId,CourseType,Description,Price}= req.body;
        if(course.get(CourseName)){
            course.set(CourseName,{CourseId,CourseType,Description,Price});
            res.status(200).json({msg : "Course updated successfully"})

        }else{
          res.status(404).json({msg : "Course not found"})
        }
    }catch{
        res.status(500).json({msg : "something went wrong"})
    }
})

admin.patch('/updateCourse' ,(req ,res )=> {
  try{
    const {CourseName ,Price} = req.body
    const result = course.get(CourseName)
    console.log(result);
    
    if(result){
        course.set(CourseName,{CourseId:result.CourseId,CourseType:result.CourseType,Description:result.Description,Price})
        res.status(201).json({msg : "course updated successfully"})        
    }else{
        res.status(401).json({msg : "course not found"})
    }
  }catch{
    res.status(404).json({msg : "something went wrong "})
  }
    
})

admin.delete('/deleteCourse' ,(req ,res )=> {
  const {CourseName} = req.body
  console.log(CourseName);
  
  if(course.get(CourseName)){
      course.delete(CourseName)
      res.status(201).json({msg : "course deleted...."})
  }else{
      res.status(401).json({msg : "course not found.."})
  }
})  

export {admin,course}