import { Schema ,model } from "mongoose";



const demo = new Schema({
    userName : {type : String ,required : true ,unique : true },
    firstName : String,
    lastName : String,
    role : {type : String ,required : true ,enum :['admin' , 'user']},
    password : String
})
const sample = model('signupData' ,demo)

const course = new Schema({

    courseName : {type : String ,required : true ,unique : true } ,
    courseId : {type : String ,required : true ,unique : true },
    courseType : {type : String ,required : true , enum :["beginner" , "intermediate" , "advanced"]} ,
    description : {type : String},
    price : {type : Number ,required : true},
    image : String
})
const courseSample = model('CourseInfo' ,course)

const cartSchema = new Schema({
    userName : {type:String ,unique:true,required:true},
    myCart : {type:Array}
})

const cartSample = model('cart' ,cartSchema)


export {sample ,courseSample ,cartSample }









