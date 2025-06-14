import { resizeImage } from "../utils/imageProcessor";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";

describe("Image Processing", () => {
  const filename = "fjord.jpg";
  const width = 200;
  const height = 200;
  const outputPath = join(
    __dirname,
    "../../frontend/images/thumb",
    `${filename}-${width}x${height}.jpg`
  );

  // Clean up before and after tests
  beforeAll(() => {
    if (existsSync(outputPath)) {
      unlinkSync(outputPath);
    }
  });

  afterAll(() => {
    if (existsSync(outputPath)) {
      unlinkSync(outputPath);
    }
  });

  it("should resize an image and save it to disk", async () => {
    const result = await resizeImage(filename, width, height);
    expect(result).toBeDefined();
    expect(existsSync(outputPath)).toBeTrue();
  });

  it("should return cached image if it already exists", async () => {
    // First call creates the image
    await resizeImage(filename, width, height);
    // Second call should use cached version
    const result = await resizeImage(filename, width, height);
    expect(result).toBe(outputPath);
  });

  it("should throw error for non-existent image", async () => {
    await expectAsync(resizeImage("nonexistent", width, height)).toBeRejected();
  });
});
