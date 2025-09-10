import multer from "multer";


//use memoru storage to store file as buffer
const storage = multer.memoryStorage()

const upload = multer({storage:storage})

export default upload


