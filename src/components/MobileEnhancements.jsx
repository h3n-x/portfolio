import { useState, useEffect, useRef, memo } from 'react';

const MobileEnhancements = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const isScrolling = useRef(false);

  const sections = ['home', 'sobre-mí', 'tecnologías', 'experiencia', 'proyectos', 'formación'];

  useEffect(() => {
    // Solo mostrar en dispositivos móviles
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isScrolling.current) return;
      
      const touchDiff = touchStartY.current - touchEndY.current;
      const minSwipeDistance = 50;

      if (Math.abs(touchDiff) > minSwipeDistance) {
        isScrolling.current = true;
        
        if (touchDiff > 0) {
          // Swipe up - next section
          navigateToSection(currentSection + 1);
        } else {
          // Swipe down - previous section
          navigateToSection(currentSection - 1);
        }
        
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    };

    // Solo añadir listeners si no estamos en un modal o elemento interactivo
    const addSwipeListeners = (e) => {
      const isInteractiveElement = e.target.closest('button, a, input, textarea, .modal, .swiper');
      if (!isInteractiveElement) {
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });
      }
    };

    document.addEventListener('touchstart', addSwipeListeners, { passive: true });

    return () => {
      document.removeEventListener('touchstart', addSwipeListeners);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isVisible, currentSection]);

  const navigateToSection = (index) => {
    if (index < 0 || index >= sections.length) return;
    
    setCurrentSection(index);
    const section = document.getElementById(sections[index]);
    if (section) {
      const offsetTop = section.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const getCurrentSectionIndex = () => {
    const scrollY = window.scrollY + 150;
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
    
    for (let i = 0; i < sectionElements.length; i++) {
      const section = sectionElements[i];
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        return i;
      }
    }
    return 0;
  };

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const newSection = getCurrentSectionIndex();
      setCurrentSection(newSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
      {/* Indicador de sección actual */}
      <div className="flex justify-center mb-4">
        <div className="bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2">
          <div className="flex items-center space-x-2">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateToSection(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSection
                    ? 'bg-green-500 w-6'
                    : 'bg-green-500/30'
                }`}
                aria-label={`Ir a sección ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Controles de navegación */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigateToSection(currentSection - 1)}
          disabled={currentSection === 0}
          className="bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-full w-12 h-12 flex items-center justify-center text-green-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-500/10 transition-all duration-300"
          aria-label="Sección anterior"
        >
          <i className="fas fa-chevron-up"></i>
        </button>

        {/* Hint de swipe */}
        <div className="bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg px-3 py-2 text-xs text-green-500 flex items-center space-x-2">
          <i className="fas fa-hand-paper"></i>
          <span>Desliza para navegar</span>
        </div>

        <button
          onClick={() => navigateToSection(currentSection + 1)}
          disabled={currentSection === sections.length - 1}
          className="bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-full w-12 h-12 flex items-center justify-center text-green-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-500/10 transition-all duration-300"
          aria-label="Siguiente sección"
        >
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>

      {/* Vibración táctil (si está disponible) */}
      <script>
        {`
          if (window.navigator && window.navigator.vibrate) {
            document.addEventListener('touchstart', function() {
              navigator.vibrate(10);
            });
          }
        `}
      </script>
    </div>
  );
});

MobileEnhancements.displayName = 'MobileEnhancements';

export default MobileEnhancements;
