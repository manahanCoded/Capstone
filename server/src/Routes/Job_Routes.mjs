import { Router } from "express";
import { create_job, display_job, upload_appointment } from "./Controllers/Job_Controller.mjs";
import multer from "multer"
import fs from 'fs';
import path from 'path';
// Path to the desktop uploads directory
const uploadDir = path.join('C:', 'Users', 'Admin', 'Desktop', 'Capstone', 'server', 'uploads');

// Ensure uploads directory exists on the desktop
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the uploads folder if it doesn't exist
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir ); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
  });
  
const upload = multer({ storage });
const appointmentFile = upload.single('file');

const router = Router()

router.post("/create", create_job)
router.get("/display", display_job)
router.post("/upload-appointment", appointmentFile ,upload_appointment)


export default router