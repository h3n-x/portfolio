import { useState, useEffect, memo } from 'react';

const ScrollProgress = memo(() => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      setScrollProgress(scrolled);
      setIsVisible(winScroll > 100); // Mostrar después de scroll inicial
    };

    const throttledScroll = () => {
      let ticking = false;
      return () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            calculateScrollProgress();
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    const scrollHandler = throttledScroll();
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Calcular estado inicial
    calculateScrollProgress();

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Barra de progreso para móvil */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50 md:hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Indicador circular para desktop */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <div className="relative w-16 h-16">
          {/* Círculo de fondo */}
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgba(34, 197, 94, 0.1)"
              strokeWidth="4"
              fill="none"
            />
            {/* Círculo de progreso */}
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#22c55e"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-300 ease-out"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Botón central */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute inset-2 bg-black border border-green-500/30 rounded-full flex items-center justify-center text-green-500 hover:bg-green-500/10 transition-all duration-300 hover:border-green-500/50 group"
            aria-label="Volver arriba"
          >
            <i className="fas fa-arrow-up text-sm group-hover:scale-110 transition-transform"></i>
          </button>
          
          {/* Porcentaje */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-green-500 text-xs font-mono">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      </div>
    </>
  );
});

ScrollProgress.displayName = 'ScrollProgress';

export default ScrollProgress;
