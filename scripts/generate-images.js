import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const SIZES = [
  { width: 640, name: '640' },
  { width: 960, name: '960' },
  { width: 1280, name: '1280' },
  { width: 1920, name: '1920' }
];

const FORMATS = [
  { 
    format: 'avif',
    options: { quality: 80, effort: 9 }
  },
  { 
    format: 'webp',
    options: { quality: 80, effort: 6 }
  },
  {
    format: 'jpeg',
    options: { quality: 85, progressive: true }
  }
];

async function processImage(inputPath, outputDir) {
  const filename = path.parse(inputPath).name;
  
  for (const size of SIZES) {
    const image = sharp(inputPath).resize(size.width, null, {
      withoutEnlargement: true,
      fit: 'inside'
    });
    
    for (const format of FORMATS) {
      const outputPath = path.join(
        outputDir,
        `${filename}-${size.name}.${format.format}`
      );
      
      await image
        .clone()
        [format.format](format.options)
        .toFile(outputPath);
      
      console.log(`Generated: ${outputPath}`);
    }
  }
}

async function processDirectory(inputDir, outputDir) {
  try {
    // Asegurar que el directorio de salida existe
    await fs.mkdir(outputDir, { recursive: true });
    
    // Leer todos los archivos del directorio de entrada
    const files = await fs.readdir(inputDir);
    
    // Filtrar solo archivos de imagen
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file)
    );
    
    // Procesar cada imagen
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      await processImage(inputPath, outputDir);
    }
    
    console.log('¡Procesamiento completado!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Directorios de entrada y salida
const inputDir = path.join(process.cwd(), 'public/images/original');
const outputDir = path.join(process.cwd(), 'public/images');

// Crear directorio para imágenes originales si no existe
fs.mkdir(inputDir, { recursive: true })
  .then(() => {
    console.log(`
Por favor, coloca las imágenes originales en: ${inputDir}
Luego ejecuta este script nuevamente para generar todas las versiones.

Las imágenes generadas se guardarán en: ${outputDir}
    `);
    
    // Procesar las imágenes si el directorio ya contiene archivos
    return fs.readdir(inputDir);
  })
  .then(files => {
    if (files.length > 0) {
      return processDirectory(inputDir, outputDir);
    }
  })
  .catch(console.error); 