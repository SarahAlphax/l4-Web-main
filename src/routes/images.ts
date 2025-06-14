import { Router } from 'express';
import { resizeImage } from '../utils/imageProcessor';
import { upload } from '../utils/fileUpload';
import path from 'path';

const router = Router();

// Resize image endpoint
router.get('/resize', async (req, res) => {
  try {
    const { filename, width, height } = req.query;

    if (!filename || !width || !height) {
      return res.status(400).json({ error: 'Missing required parameters: filename, width, height' });
    }

    const widthNum = parseInt(width as string, 10);
    const heightNum = parseInt(height as string, 10);

    if (isNaN(widthNum) || isNaN(heightNum)) {
      return res.status(400).json({ error: 'Width and height must be numbers' });
    }

    const resizedImagePath = await resizeImage(filename as string, widthNum, heightNum);

    res.status(200).sendFile(resizedImagePath);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Upload image endpoint
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename
  });
});

export default router;
