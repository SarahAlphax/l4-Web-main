import express from 'express';
import imageRoutes from './images';
import fs from "fs";
import path from "path";

const router = express.Router();
router.use('/images', imageRoutes);
router.get("/images/list", (req, res) => {
  const imageDir = path.resolve(__dirname, "../../frontend/images/full");
console.log("aaaaaaaaaaaaaaaa  "+ imageDir);
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read image folder" });
    }

    // رجّع فقط الصور بصيغة JPG أو JPEG
    const images = files.filter(f =>
      f.endsWith(".jpg") || f.endsWith(".jpeg")
    );

    res.json(images); // ← هذه هي JSON المتوقعة
  });
});



export default router;