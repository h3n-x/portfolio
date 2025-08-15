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
  { format: 'avif', options: { quality: 80, effort: 9 } },
  { format: 'webp', options: { quality: 80, effort: 6 } },
  { format: 'jpeg', options: { quality: 85, progressive: true } }
];

async function processImage(inputPath, outputDir) {
  const filename = path.parse(inputPath).name;

  try {
    const image = sharp(inputPath);
    // Generar imágenes con los tamaños definidos
    for (const size of SIZES) {
      const resizedImage = image.resize(size.width, null, { withoutEnlargement: true, fit: 'inside' });

      // Generar diferentes formatos para cada tamaño
      for (const format of FORMATS) {
        const outputPath = path.join(outputDir, `${filename}-${size.name}.${format.format}`);

        await resizedImage
          .clone()
          [format.format](format.options)
          .toFile(outputPath);

        console.log(`Generado: ${outputPath}`);
      }
    }
  } catch (error) {
    console.error(`Error al procesar ${inputPath}:`, error);
  }
}

async function processDirectory(inputDir, outputDir) {
  try {
    // Asegurarse que el directorio de salida existe
    await fs.mkdir(outputDir, { recursive: true });

    // Leer todos los archivos del directorio de entrada
    const files = await fs.readdir(inputDir);

    // Filtrar solo archivos de imagen
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(file));

    // Procesar cada imagen
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      await processImage(inputPath, outputDir);
    }

    console.log('¡Procesamiento completado!');
  } catch (error) {
    console.error('Error al procesar el directorio:', error);
  }
}

// Directorios de entrada y salida
const inputDir = path.join(process.cwd(), 'public/images/original');
const outputDir = path.join(process.cwd(), 'public/images');

// Verificar si el directorio de imágenes originales existe y procesar
fs.mkdir(inputDir, { recursive: true })
  .then(() => {
    console.log(`Por favor, coloca las imágenes originales en: ${inputDir}`);
    console.log(`Luego ejecuta este script nuevamente para generar todas las versiones. Las imágenes generadas se guardarán en: ${outputDir}`);
  })
  .then(() => fs.readdir(inputDir))
  .then(files => {
    if (files.length > 0) {
      return processDirectory(inputDir, outputDir);
    }
  })
  .catch(console.error);
