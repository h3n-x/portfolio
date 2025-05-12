import { useState, useEffect, useRef, memo } from 'react';

const OptimizedImage = memo(({ src, alt, className, width, height, priority = 'high', sizes = "100vw" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);
  
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);
  
  // Determinar el tamaño adecuado para la imagen según el dispositivo
  const getResponsiveSize = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    if (isMobile) {
      return {
        width: width ? Math.floor(parseInt(width) * 0.7) : 300,
        height: height ? Math.floor(parseInt(height) * 0.7) : 169
      };
    } else if (isTablet) {
      return {
        width: width ? Math.floor(parseInt(width) * 0.85) : 400,
        height: height ? Math.floor(parseInt(height) * 0.85) : 225
      };
    }
    
    return { width, height };
  };
  
  const responsiveSize = getResponsiveSize();
  
  // Generar fuentes con diferentes resoluciones basadas en la imagen original
  const generateSourceSets = () => {
    // Extraer la base del nombre de archivo y extensión
    const baseSrc = src.replace(/\.(avif|webp|jpg|png|jpeg)$/i, '');
    
    // Definir tamaños para srcset
    const widths = [640, 960, 1280, 1920];
    
    // Generar srcset para AVIF
    const avifSrcSet = widths
      .map(w => `${baseSrc}-${w}.avif ${w}w`)
      .join(', ');
      
    // Generar srcset para WebP como respaldo
    const webpSrcSet = widths
      .map(w => `${baseSrc}-${w}.webp ${w}w`)
      .join(', ');
      
    // Fallback para navegadores que no soportan los formatos modernos
    const jpgSrcSet = widths
      .map(w => `${baseSrc}-${w}.jpg ${w}w`)
      .join(', ');
    
    return {
      avifSrcSet,
      webpSrcSet,
      jpgSrcSet,
      // Si src ya es una URL completa, usarla, de lo contrario usar un fallback
      fallbackSrc: src.includes(".avif") ? src.replace('.avif', '.jpg') : `${baseSrc}.jpg`
    };
  };
  
  // Determinar si debemos usar srcset o una imagen estática basada en el src
  const useSourceSets = !src.includes("http") && src.includes("/images/");
  const sourceData = useSourceSets ? generateSourceSets() : null;
  
  return (
    <div 
      className={`relative ${className || ''}`}
      aria-busy={!isLoaded}
      role="img"
      aria-label={alt || 'Imagen'}
    >
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 animate-pulse">
          <span className="sr-only">Cargando imagen...</span>
          <div className="w-10 h-10 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-red-500">
          <span className="text-sm">Error al cargar la imagen</span>
        </div>
      )}
      
      {useSourceSets ? (
        <picture>
          <source
            type="image/avif"
            srcSet={sourceData.avifSrcSet}
            sizes={sizes}
          />
          <source
            type="image/webp"
            srcSet={sourceData.webpSrcSet}
            sizes={sizes}
          />
          <source
            type="image/jpeg"
            srcSet={sourceData.jpgSrcSet}
            sizes={sizes}
          />
          <img
            ref={imgRef}
            src={sourceData.fallbackSrc}
            alt={alt || ""}
            width={responsiveSize.width}
            height={responsiveSize.height}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setError(true);
              setIsLoaded(true);
            }}
            loading={priority === 'high' ? 'eager' : 'lazy'}
            fetchPriority={priority}
            decoding="async"
          />
        </picture>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt || ""}
          width={responsiveSize.width}
          height={responsiveSize.height}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setError(true);
            setIsLoaded(true);
          }}
          loading={priority === 'high' ? 'eager' : 'lazy'}
          fetchPriority={priority}
          decoding="async"
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 