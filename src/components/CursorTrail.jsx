import { useEffect, useRef, useState, memo } from 'react';

const CursorTrail = memo(() => {
  const trailPointsRef = useRef([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  useEffect(() => {
    // Detectar preferencias de movimiento reducido
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    // Detectar dispositivo móvil
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    };
    checkDevice();
    
    // Si es móvil o prefiere movimiento reducido, no inicializar el trail
    if (isMobile || isReducedMotion) return;
    
    const maxTrailPoints = window.innerWidth < 1024 ? 8 : 15; // Menos puntos en pantallas pequeñas
    const fragment = document.createDocumentFragment();
    
    // Crear elementos para el rastro usando un fragment
    for (let i = 0; i < maxTrailPoints; i++) {
      const trailPoint = document.createElement('div');
      trailPoint.className = 'cursor-trail';
      trailPoint.style.opacity = 1 - (i / maxTrailPoints);
      trailPoint.style.transform = `translate(-50%, -50%) scale(${1 - (i / maxTrailPoints) * 0.5})`;
      fragment.appendChild(trailPoint);
      trailPointsRef.current.push(trailPoint);
    }
    
    document.body.appendChild(fragment);
    
    // Throttle para el evento mousemove
    const throttleInterval = 16; // ~60fps
    
    const handleMouseMove = (e) => {
      const now = performance.now();
      
      if (now - lastUpdateTimeRef.current >= throttleInterval) {
        mousePosRef.current = { 
          x: e.clientX,
          y: e.clientY
        };
        lastUpdateTimeRef.current = now;
      }
    };
    
    // Optimizar la actualización de posiciones usando transformaciones
    const updateTrailPoints = () => {
      if (!document.hidden) {
        const now = performance.now();
        const points = trailPointsRef.current;
        
        for (let i = points.length - 1; i > 0; i--) {
          const point = points[i];
          const prevPoint = points[i - 1];
          
          if (point && prevPoint) {
            const prevRect = prevPoint.getBoundingClientRect();
            point.style.transform = `translate(${prevRect.left}px, ${prevRect.top}px) translate(-50%, -50%) scale(${1 - (i / points.length) * 0.5})`;
          }
        }
        
        if (points[0]) {
          points[0].style.transform = `translate(${mousePosRef.current.x}px, ${mousePosRef.current.y}px) translate(-50%, -50%)`;
        }
      }
      
      requestRef.current = requestAnimationFrame(updateTrailPoints);
    };
    
    // Usar passive: true para mejorar el rendimiento del scroll
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    requestRef.current = requestAnimationFrame(updateTrailPoints);
    
    // Manejar cambios en las preferencias de movimiento
    const handleMotionPreference = (e) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionPreference);
    
    // Manejar cambios de tamaño de ventana
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkDevice, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionPreference);
      cancelAnimationFrame(requestRef.current);
      
      // Limpiar puntos del trail
      trailPointsRef.current.forEach(point => {
        if (point && document.body.contains(point)) {
          document.body.removeChild(point);
        }
      });
      trailPointsRef.current = [];
      clearTimeout(resizeTimer);
    };
  }, [isMobile, isReducedMotion]);
  
  // No renderizar nada en móviles o si se prefiere movimiento reducido
  if (isMobile || isReducedMotion) return null;
  
  return null;
});

CursorTrail.displayName = 'CursorTrail';

export default CursorTrail; 