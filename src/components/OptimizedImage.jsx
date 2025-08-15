import { useState, useEffect, useRef, memo } from 'react';

const OptimizedImage = memo(({ src, alt, className, width, height, priority = 'high', sizes = "100vw", loading = 'lazy' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);
  
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);
  
  // Función para obtener la URL de la imagen optimizada según el tamaño
  const getOptimizedSrc = (baseSrc, targetWidth) => {
    // Si ya es una URL completa o no es una imagen local, devolver como está
    if (baseSrc.includes('http') || !baseSrc.startsWith('/images/')) {
      return baseSrc;
    }
    
    // Extraer el nombre base sin extensión
    const nameWithoutExt = baseSrc.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
    const baseName = nameWithoutExt.split('/').pop();
    
    // Para imágenes específicas que sabemos que existen en diferentes formatos
    if (baseSrc.includes('/images/profile')) {
      // Usar el tamaño más apropiado para profile
      if (targetWidth <= 640) return `/images/profile-640.jpeg`;
      if (targetWidth <= 960) return `/images/profile-960.jpeg`;
      if (targetWidth <= 1280) return `/images/profile-1280.jpeg`;
      return `/images/profile-1920.jpeg`;
    }
    
    // Para otras imágenes, buscar el JPEG más cercano al tamaño objetivo
    const availableSizes = [640, 960, 1280, 1920];
    const closestSize = availableSizes.reduce((prev, curr) => 
      Math.abs(curr - targetWidth) < Math.abs(prev - targetWidth) ? curr : prev
    );
    
    return `/images/${baseName}-${closestSize}.jpeg`;
  };
  
  // Determinar el tamaño adecuado según el viewport
  const getTargetWidth = () => {
    if (typeof window === 'undefined') return 1280;
    const vw = window.innerWidth;
    const dpr = window.devicePixelRatio || 1;
    const effectiveWidth = vw * dpr;
    if (effectiveWidth < 640) return 640;
    if (effectiveWidth < 960) return 960;
    if (effectiveWidth < 1280) return 1280;
    return 1920;
  };
  
  const targetWidth = getTargetWidth();
  const optimizedSrc = getOptimizedSrc(src, targetWidth);
  
  // Generar srcset para imágenes responsivas
  const generateSrcSet = () => {
    if (src.includes('http') || !src.startsWith('/images/')) {
      return '';
    }
    
    if (src.includes('/images/profile')) {
      return `
        /images/profile-640.jpeg 640w,
        /images/profile-960.jpeg 960w,
        /images/profile-1280.jpeg 1280w,
        /images/profile-1920.jpeg 1920w
      `.trim();
    }
    
    const baseName = src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '').split('/').pop();
    return `
      /images/${baseName}-640.jpeg 640w,
      /images/${baseName}-960.jpeg 960w,
      /images/${baseName}-1280.jpeg 1280w,
      /images/${baseName}-1920.jpeg 1920w
    `.trim();
  };
  
  const srcSet = generateSrcSet();
  
  return (
    <div 
      className={`relative ${className || ''}`}
      aria-busy={!isLoaded}
      role="img"
      aria-label={alt || 'Imagen'}
    >
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 animate-pulse rounded-lg">
          <span className="sr-only">Cargando imagen...</span>
          <div className="w-10 h-10 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-red-500 rounded-lg">
          <span className="text-sm">Error al cargar la imagen</span>
        </div>
      )}
      
      <img
        ref={imgRef}
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt || ""}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setError(true);
          setIsLoaded(true);
        }}
        loading={priority === 'high' ? 'eager' : loading}
        fetchPriority={priority}
        decoding="async"
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;