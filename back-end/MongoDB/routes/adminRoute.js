import { Router } from "express";
import { courseSample } from "../models/myCollections.js";
import upload from "../middleware/upload.js";



const admin = Router();
// const course = new Map()
const convertToBase64 = (buffer) => {
  return buffer.toString('base64')
}


admin.post('/addCourse',upload.single("courseImage"), async (req,res)=>{
  
  try{
    
    const {CourseName,CourseId,CourseType,Description,Price}= req.body;
    
    if(await courseSample.findOne({courseName:CourseName})){
         res.status(400).json({msg:'Course already exist'})
    }
    else{
      try{
        let imageBase64 = null;
        if(req.file){
          //convert the image buffer to Base64 string
          imageBase64 = convertToBase64(req.file.buffer)
        }
        const newCourse = new courseSample({
          courseName : CourseName ,
          courseId : CourseId,
          courseType : CourseType,
          description : Description,
          price : Price,
          image : imageBase64
        })
        await newCourse.save()
       
        console.log('Course successfully entered');
        
        res.status(201).json({msg:'Course successfully entered'})
      }

      catch(err){
        console.log('Something went wrong while setting data');
        
          res.status(400).json({msg:'Something went wrong while setting data'})
          console.log(err);
          
      }
    }
  }catch{
        res.status(500).json({msg:'Something went wrong'})
    }
})

admin.put('/updateCourse' ,async (req ,res )=> {
    try{
        const {CourseName,CourseId,CourseType,Description,Price}= req.body;
        const result = await courseSample.findOne({courseName:CourseName})
        console.log(result);
        
        if(result){
          try{
            
            // await courseSample.findOneAndReplace({courseName:CourseName},{$set:{courseName:CourseName,price:Price}})
              
                result.courseName=CourseName,
                result.courseId = CourseId
                result.courseType=CourseType,
                result.description=Description,
                result.price=Price

                await result.save()
              
            console.log("Course updated successfully");
            res.status(200).json({msg : "Course updated successfully"})
          }catch(err){
            console.log(err);
            
            console.log("error when updating");

            res.status(400).json({msg : "error when updating"})
          }
        }else{
          console.log("Course not found");
  
          res.status(404).json({msg : "Course not found"})
        }
    }catch{
      console.log("something went wrong");
      
        res.status(500).json({msg : "something went wrong"})
    }
})

admin.patch('/updateCourse' ,async (req ,res )=> {
  try{
    const {CourseName ,Price} = req.body
    const result = await courseSample.findOne({courseName:CourseName})
    console.log(result);
    
    if(result){
        await courseSample.updateOne({courseName:CourseName},{price:Price})
        console.log("course updated successfully");
        
        res.status(201).json({msg : "course updated successfully"})        
    }else{
        console.log("course not found");
        
        res.status(401).json({msg : "course not found"})
    }
  }catch{
    console.log("something went wrong ");
    
    res.status(404).json({msg : "something went wrong "})
  }
    
})

admin.delete('/deleteCourse' ,async (req ,res )=> {
  const {CourseName} = req.body
  // console.log(CourseName);
  const result = await courseSample.findOne({courseName:CourseName})
  if(result){
      await courseSample.deleteOne({courseName:CourseName})
      console.log({msg : "course deleted...."});
      
      res.status(201).json({msg : "course deleted...."})
  }else{
      console.log("course not found..");
      res.status(401).json({msg : "course not found.."})
  }
})  

export {admin}