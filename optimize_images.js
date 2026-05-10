import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const filePath = path.join(publicDir, file);
  const ext = path.extname(file);
  const baseName = path.basename(file, ext);
  const outPath = path.join(publicDir, `${baseName}.webp`);

  console.log(`Converting ${file} to WebP...`);

  let sharpInstance = sharp(filePath);

  if (file === 'ods 2030.png') {
    sharpInstance = sharpInstance.resize({ width: 800 });
  } else if (file === 'og-image.png') {
    sharpInstance = sharpInstance.resize({ width: 1200 });
  } else if (file.includes('logo') || file === 'Google_Gemini_logo_2025.svg.png' || file === 'Claude_AI_logo.svg.png') {
    sharpInstance = sharpInstance.resize({ width: 200 });
  }

  await sharpInstance
    .webp({ quality: 80 })
    .toFile(outPath);

  fs.unlinkSync(filePath);
  console.log(`Deleted ${file}`);
}
console.log("Done.");
