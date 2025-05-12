import { useEffect, useState, useRef, memo } from 'react';

const MatrixRain = memo(() => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const matrixRainRef = useRef(null);
  const resizeTimerRef = useRef(null);
  const visibilityObserverRef = useRef(null);

  useEffect(() => {
    // Detección inicial de dispositivo
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkDeviceType();
    
    // Creación del observador de intersección para cargar solo cuando sea visible
    if (matrixRainRef.current) {
      visibilityObserverRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setIsVisible(entry.isIntersecting);
          
          if (entry.isIntersecting) {
            createMatrixRain();
          } else {
            // Limpiar cuando no sea visible para ahorrar recursos
            if (matrixRainRef.current) {
              matrixRainRef.current.innerHTML = '';
            }
          }
        },
        { threshold: 0.1 } // 10% de visibilidad es suficiente para activar
      );
      
      visibilityObserverRef.current.observe(matrixRainRef.current);
    }
    
    // Debounce para el evento resize
    const handleResize = () => {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      
      resizeTimerRef.current = setTimeout(() => {
        checkDeviceType();
        if (isVisible) {
          createMatrixRain();
        }
      }, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (visibilityObserverRef.current && matrixRainRef.current) {
        visibilityObserverRef.current.unobserve(matrixRainRef.current);
      }
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, [isVisible]);
  
  const createMatrixRain = () => {
    const matrixRain = matrixRainRef.current;
    if (!matrixRain) return;
    
    // Limpiar columnas existentes
    matrixRain.innerHTML = '';
    
    const width = window.innerWidth;
    
    // Ajustar densidad según el dispositivo
    let columnSpacing;
    let maxColumns;
    
    if (isMobile) {
      columnSpacing = 40; // Reducir densidad en móviles
      maxColumns = 15;    // Limitar número máximo de columnas
    } else if (isTablet) {
      columnSpacing = 30; // Densidad media en tablets
      maxColumns = 25;    // Limitación moderada
    } else {
      columnSpacing = 20; // Densidad completa en desktop
      maxColumns = 50;    // Limitación para evitar sobrecarga
    }
    
    const columnCount = Math.min(Math.floor(width / columnSpacing), maxColumns);
    
    // Caracteres aleatorios, priorizando 0 y 1 para mejor rendimiento
    const simpleChars = '01';
    const complexChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const chars = isMobile ? simpleChars : complexChars;
    
    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      
      // Distribución uniforme de columnas
      column.style.left = `${(width / columnCount) * i}px`;
      
      // Animación más lenta en móviles para reducir demanda de CPU
      const duration = isMobile ? 
        Math.random() * 3 + 8 : // Entre 8 y 11 segundos en móvil (más lento)
        Math.random() * 5 + 5;  // Entre 5 y 10 segundos en desktop
      
      column.style.animationDuration = `${duration}s`;
      column.style.animationDelay = `${Math.random() * 5}s`;
      
      // Reducir la altura de las columnas en dispositivos móviles
      const columnHeight = isMobile ?
        Math.floor(Math.random() * 8 + 5) :   // Entre 5 y 13 caracteres en móvil
        Math.floor(Math.random() * 15 + 10);  // Entre 10 y 25 caracteres en desktop
      
      for (let j = 0; j < columnHeight; j++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        column.innerHTML += char + '<br>';
      }
      
      matrixRain.appendChild(column);
    }
  };
  
  return <div className="matrix-rain" ref={matrixRainRef}></div>;
});

MatrixRain.displayName = 'MatrixRain';

export default MatrixRain; 