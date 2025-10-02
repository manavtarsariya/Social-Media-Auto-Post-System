import multer from 'multer';


console.log("Multer middleware loaded");
const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");