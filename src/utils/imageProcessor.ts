import sharp from "sharp";
import path from "path";
import { existsSync, mkdirSync } from "fs";

const imagesDir = path.resolve(__dirname, "../../frontend/images");
const fullDir = path.resolve(imagesDir, "full");
const thumbDir = path.resolve(imagesDir, "thumb");

// Ensure thumbDir exists
if (!existsSync(thumbDir)) {
  mkdirSync(thumbDir, { recursive: true });
}

export const resizeImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<string> => {
  const inputPath = path.resolve(fullDir, filename);
  const outputPath = path.resolve(
    thumbDir,
    `${filename}-${width}x${height}.jpg`,
  );

  if (existsSync(outputPath)) {
    return outputPath;
  }

  if (!existsSync(inputPath)) {
    throw new Error("Original image not found");
  }

  await sharp(inputPath).resize(width, height).toFile(outputPath);

  return outputPath;
};
