import { useState, useEffect, useContext, memo } from 'react';
import { LanguageContext } from '../LanguageContext';
import { useTranslation } from '../translations';
import LanguageToggle from '../LanguageToggle';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);

  useEffect(() => {
    // Simple scroll para detectar cuando añadir sombra al header
    const handleSimpleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleSimpleScroll);
    return () => window.removeEventListener('scroll', handleSimpleScroll);
  }, []);
  
  // Utilizar Intersection Observer para detectar qué sección es visible
  useEffect(() => {
    // Establecer 'home' como sección inicial por defecto
    setActiveSection('home');
    
    const options = { 
      threshold: 0.2, // Una sección se considera visible cuando al menos el 20% es visible
      rootMargin: '-80px 0px' // Ajuste para tener en cuenta la altura del header
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      // Solo considerar entradas que están en la vista actual
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length === 0) return;
      
      // Encontrar la entrada con la mayor proporción visible
      let maxVisibleEntry = visibleEntries[0];
      let maxRatio = visibleEntries[0].intersectionRatio;
      
      visibleEntries.forEach(entry => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          maxVisibleEntry = entry;
        }
      });
      
      // Si encontramos una sección, activarla
      if (maxVisibleEntry) {
        setActiveSection(maxVisibleEntry.target.id);
      }
    }, options);
    
    // Observar todas las secciones
    document.querySelectorAll('section[id]').forEach(section => {
      sectionObserver.observe(section);
    });
    
    return () => {
      sectionObserver.disconnect();
    };
  }, []);

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

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-md backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}
      role="banner"
    >
      <div className="container flex justify-between items-center">
        <a 
          href="#" 
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
              className={`font-medium transition-colors nav-link ${activeSection === sectionIds[item] ? 'active text-green-500' : 'text-gray-300 hover:text-green-500'}`}
              aria-current={activeSection === sectionIds[item] ? 'page' : undefined}
            >
              {navLabels[item]}
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
                className={`font-medium transition-colors nav-link ${activeSection === sectionIds[item] ? 'active text-green-500' : 'text-gray-400 hover:text-green-500'}`}
                onClick={() => setIsMenuOpen(false)}
                aria-current={activeSection === sectionIds[item] ? 'page' : undefined}
              >
                {navLabels[item]}
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