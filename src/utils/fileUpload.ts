import multer from 'multer';
import { join } from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb(null, join(__dirname, '../../src/images/full'));
       cb(null, join(__dirname, '../../frontend/images/full'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
  },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG images are allowed'));
  }
};

export const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } 
});