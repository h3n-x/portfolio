import { useState, useEffect, useContext, memo, useCallback } from 'react';
import { LanguageContext } from '../LanguageContext';
import { useTranslation } from '../translations';
import LanguageToggle from '../LanguageToggle';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  
  // Función para forzar la carga de secciones lazy
  const forceLoadSection = (sectionId) => {
    // Trigger scroll event to force lazy loading
    window.dispatchEvent(new Event('scroll'));
    // Wait for potential lazy loading
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);
  };

  useEffect(() => {
    // Simple scroll para detectar cuando añadir sombra al header
    const handleSimpleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleSimpleScroll);
    return () => window.removeEventListener('scroll', handleSimpleScroll);
  }, []);
  
  // Función mejorada para detectar la sección activa
  const updateActiveSection = useCallback(() => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;
    
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Si estamos en la parte superior de la página, activar "home"
    if (scrollY < 50) {
      setActiveSection('home');
      return;
    }
    
    // Si estamos cerca del final de la página, activar la última sección
    if (scrollY + windowHeight >= documentHeight - 50) {
      const lastSection = sections[sections.length - 1];
      setActiveSection(lastSection.getAttribute('id'));
      return;
    }
    
    // Encontrar la sección que está más centrada en el viewport
    let currentSection = 'home';
    let maxVisibility = 0;
    
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const sectionHeight = rect.height;
      
      // Calcular qué porcentaje de la sección es visible
      const visibleHeight = Math.min(windowHeight, sectionBottom) - Math.max(0, sectionTop);
      const visibilityRatio = visibleHeight / Math.min(sectionHeight, windowHeight);
      
      // Si esta sección es más visible que las anteriores, actualizarla como activa
      if (visibilityRatio > maxVisibility && visibilityRatio > 0.3) {
        maxVisibility = visibilityRatio;
        currentSection = section.getAttribute('id');
      }
    });
    
    setActiveSection(currentSection);
  }, []);
  
  // Usar scroll event con throttle para mejor rendimiento
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Verificar sección inicial después de un pequeño delay
    const initialCheck = setTimeout(() => {
      updateActiveSection();
    }, 100);
    
    // También verificar cuando el contenido se carga completamente
    window.addEventListener('load', updateActiveSection);
    
    // Escuchar scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Re-verificar cuando las secciones se cargan dinámicamente
    const observer = new MutationObserver((mutations) => {
      // Solo actualizar si se añadieron nodos con ID
      const hasNewSections = mutations.some(mutation => 
        Array.from(mutation.addedNodes).some(node => 
          node.nodeType === 1 && node.tagName === 'SECTION' && node.id
        )
      );
      
      if (hasNewSections) {
        setTimeout(updateActiveSection, 100);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      clearTimeout(initialCheck);
      window.removeEventListener('load', updateActiveSection);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [updateActiveSection]);

  // Orden de los elementos de navegación según la estructura de la página
  const navItems = ['home', 'sobre-mí', 'tecnologías', 'experiencia', 'proyectos', 'formación'];
  
  // Mapeo de los IDs para asegurar que los enlaces apunten a los IDs correctos de las secciones
  const sectionIds = {
    'home': 'home',
    'sobre-mí': 'sobre-mí',
    'proyectos': 'proyectos',
    'tecnologías': 'tecnologías',
    'experiencia': 'experiencia',
    'formación': 'formación'
  };
  
  const navLabels = {
    'home': t('nav.home'),
    'sobre-mí': t('nav.about'),
    'proyectos': t('nav.projects'),
    'tecnologías': t('nav.technologies'),
    'experiencia': t('nav.experience'),
    'formación': t('nav.education')
  };

  // Manejar click en enlaces de navegación
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false); // Cerrar menú móvil primero
    
    const scrollToSection = () => {
      const section = document.getElementById(sectionId);
      if (section) {
        const offsetTop = section.offsetTop - 80; // Compensar por el header fijo
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        setActiveSection(sectionId); // Establecer sección activa
        return true;
      }
      return false;
    };

    // Intentar scroll inmediato
    if (!scrollToSection()) {
      // Forzar la carga de secciones lazy
      forceLoadSection(sectionId);
      
      // Si la sección no está disponible, esperar a que se cargue (lazy loading)
      const observer = new MutationObserver((mutations, obs) => {
        if (scrollToSection()) {
          obs.disconnect(); // Dejar de observar una vez que encontramos la sección
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      // Timeout de seguridad más largo para dar tiempo al lazy loading
      setTimeout(() => {
        observer.disconnect();
        // Intento final de navegación
        scrollToSection();
      }, 2000);
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-md backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}
      role="banner"
    >
      <div className="container flex justify-between items-center">
        <a 
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="text-2xl font-bold font-heading text-green-500 glow-text"
          aria-label="Inicio"
        >
          H3n
        </a>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-green-500 flex items-center p-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded bg-black border border-green-500/30"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <i className="fas fa-bars" aria-hidden="true"></i>
          <span className="sr-only">{isMenuOpen ? "Cerrar menú" : "Abrir menú"}</span>
        </button>
        
        {/* Desktop navigation */}
        <nav 
          className="hidden md:flex space-x-8 items-center"
          role="navigation"
          aria-label="Navegación principal"
        >
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${sectionIds[item]}`}
              onClick={(e) => handleNavClick(e, sectionIds[item])}
              className={`relative font-medium transition-all duration-300 nav-link ${
                activeSection === sectionIds[item] 
                  ? 'active text-green-500' 
                  : 'text-gray-300 hover:text-green-500'
              }`}
              aria-current={activeSection === sectionIds[item] ? 'page' : undefined}
            >
              <span className="relative z-10">{navLabels[item]}</span>
              {activeSection === sectionIds[item] && (
                <span className="absolute inset-0 bg-green-500/10 rounded-md -z-0 animate-pulse"></span>
              )}
            </a>
          ))}
          <div className="flex items-center">
            <LanguageToggle />
          </div>
        </nav>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav 
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full bg-black border-t border-green-500/20 shadow-lg shadow-green-500/10 py-4 animate-fade-in"
          role="navigation"
          aria-label="Navegación móvil"
        >
          <div className="container flex flex-col space-y-4">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${sectionIds[item]}`}
                onClick={(e) => handleNavClick(e, sectionIds[item])}
                className={`relative font-medium transition-all duration-300 nav-link block py-2 ${
                  activeSection === sectionIds[item] 
                    ? 'active text-green-500 pl-4' 
                    : 'text-gray-400 hover:text-green-500'
                }`}
                aria-current={activeSection === sectionIds[item] ? 'page' : undefined}
              >
                {activeSection === sectionIds[item] && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></span>
                )}
                <span className="relative">{navLabels[item]}</span>
              </a>
            ))}
            <div className="pt-2 border-t border-green-500/20 flex items-center">
              <LanguageToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;