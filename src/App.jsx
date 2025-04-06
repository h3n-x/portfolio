import { useState, useEffect, useRef, useContext, Suspense, lazy, memo, useCallback } from 'react'
import './App.css'
import { LanguageProvider } from './LanguageContext'
import LanguageToggle from './LanguageToggle'
import { useTranslation } from './translations'
import { LanguageContext } from './LanguageContext'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy loading de componentes pesados
const MatrixRain = lazy(() => import('./components/MatrixRain'));
const MatrixGrid = lazy(() => import('./components/MatrixGrid'));

// Componente para el rastro del cursor
const CursorTrail = () => {
  useEffect(() => {
    const maxTrailPoints = 15;
    const trailPoints = [];
    let mouseX = 0;
    let mouseY = 0;
    
    // Crear elementos para el rastro
    for (let i = 0; i < maxTrailPoints; i++) {
      const trailPoint = document.createElement('div');
      trailPoint.className = 'cursor-trail';
      trailPoint.style.opacity = 1 - (i / maxTrailPoints);
      trailPoint.style.transform = `translate(-50%, -50%) scale(${1 - (i / maxTrailPoints) * 0.5})`;
      document.body.appendChild(trailPoint);
      trailPoints.push(trailPoint);
    }
    
    // Actualizar posición del ratón
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    // Actualizar posición de los puntos del rastro
    const updateTrailPoints = () => {
      trailPoints.forEach((point, index) => {
        const delay = index * 40;
        setTimeout(() => {
          point.style.left = `${mouseX}px`;
          point.style.top = `${mouseY}px`;
        }, delay);
      });
      
      requestAnimationFrame(updateTrailPoints);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    updateTrailPoints();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      trailPoints.forEach(point => {
        document.body.removeChild(point);
      });
    };
  }, []);
  
  return null;
};

// Componente de imagen optimizada
const OptimizedImage = memo(({ src, alt, className, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
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
  
  return (
    <div className={`relative ${className || ''}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={responsiveSize.width}
        height={responsiveSize.height}
        className="w-full h-full object-cover"
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        fetchPriority="high"
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
      )}
    </div>
  );
});

// Memoizar componentes para evitar renderizados innecesarios
const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detectar sección activa
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['home', 'sobre-mí', 'proyectos', 'tecnologías', 'formación'];
  const navLabels = {
    'home': t('nav.home'),
    'sobre-mí': t('nav.about'),
    'proyectos': t('nav.projects'),
    'tecnologías': t('nav.technologies'),
    'formación': t('nav.education')
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-md backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container flex justify-between items-center">
        <a href="#" className="text-2xl font-bold font-heading text-green-500 glow-text">H3n</a>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item}`}
              className={`font-medium transition-colors nav-link ${activeSection === item ? 'active' : 'text-gray-300 hover:text-green-500'}`}
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
        <nav className="md:hidden absolute top-full left-0 w-full bg-black shadow-lg py-4 animate-fade-in">
          <div className="container flex flex-col space-y-4">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item}`}
                className={`font-medium transition-colors nav-link ${activeSection === item ? 'active' : 'text-gray-300 hover:text-green-500'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {navLabels[item]}
              </a>
            ))}
            <div className="pt-2 flex items-center">
              <LanguageToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
});

const SobreMi = memo(() => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  
  return (
    <section id="sobre-mí" className="py-20 bg-black">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white code-line animate-on-scroll">{t('about.title')}</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-400 mb-6 animate-on-scroll">
            {t('about.description')}
          </p>
          <p className="text-gray-400 animate-on-scroll">
            {t('about.interests')}
          </p>
        </div>
      </div>
    </section>
  );
});

const Tecnologias = memo(() => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);
  
  const tecnologias = [
    { 
      nombre: t('technologies.bash.name'), 
      color: "bg-green-500",
      icon: <i className="fas fa-terminal text-xl"></i>,
      url: "https://www.gnu.org/software/bash/",
      descripcion: t('technologies.bash.description'),
      order: 1
    },
    { 
      nombre: t('technologies.git.name'), 
      color: "bg-green-500",
      icon: <i className="fab fa-git-alt text-xl"></i>,
      url: "https://git-scm.com/",
      descripcion: t('technologies.git.description'),
      order: 3
    },
    { 
      nombre: t('technologies.linux.name'), 
      color: "bg-green-500",
      icon: <i className="fab fa-linux text-xl"></i>,
      url: "https://www.kernel.org/",
      descripcion: t('technologies.linux.description'),
      order: 5
    },
    { 
      nombre: t('technologies.mysql.name'), 
      color: "bg-green-500",
      icon: <i className="fas fa-database text-xl"></i>,
      url: "https://www.mysql.com/",
      descripcion: t('technologies.mysql.description'),
      order: 2
    },
    { 
      nombre: t('technologies.python.name'), 
      color: "bg-green-500",
      icon: <i className="fab fa-python text-xl"></i>,
      url: "https://www.python.org/",
      descripcion: t('technologies.python.description'),
      order: 4
    },
    { 
      nombre: t('technologies.vim.name'), 
      color: "bg-green-500",
      icon: <i className="fas fa-terminal text-xl"></i>,
      url: "https://www.vim.org/",
      descripcion: t('technologies.vim.description'),
      order: 6
    }
  ];

  // Ordenar tecnologías por el orden de carga en zigzag
  const sortedTecnologias = [...tecnologias].sort((a, b) => a.order - b.order);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Cuando la sección es visible, comenzar a cargar en zigzag
          const loadItems = () => {
            setVisibleItems(prev => {
              if (prev.length >= sortedTecnologias.length) return prev;
              return [...prev, prev.length];
            });
          };
          
          // Cargar el primer elemento inmediatamente
          loadItems();
          
          // Cargar los elementos restantes con un retraso progresivo
          sortedTecnologias.forEach((_, index) => {
            if (index > 0) {
              setTimeout(() => loadItems(), 150 * index);
            }
          });
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, [sortedTecnologias]);

  return (
    <section id="tecnologías" className="py-20 bg-black" ref={sectionRef}>
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white code-line animate-on-scroll">{t('technologies.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {sortedTecnologias.map((tech, index) => (
            <div 
              key={index} 
              className={`bg-black p-6 rounded-lg border border-green-500/30 hover:border-green-500 transition-all card-hover transform ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDuration: '0.5s',
                transitionProperty: 'opacity, transform',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className={`w-16 h-16 ${tech.color} rounded-full flex items-center justify-center mb-4 mx-auto tech-icon`}>
                <span className="text-black">{tech.icon}</span>
              </div>
              <h3 className="text-center text-white font-medium mb-2">{tech.nombre}</h3>
              <p className="text-gray-400 text-sm text-center">{tech.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const Experiencia = memo(() => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  
  const experiencias = [
    {
      empresa: "",
      puesto: t('experience.backendDev'),
      periodo: `2021 - ${t('experience.present')}`,
      descripcion: t('experience.backendDesc'),
      logros: [
        ""
      ],
      icono: <i className="fas fa-file-code text-xl"></i>
    },
    {
      empresa: "",
      puesto: t('experience.sysAdmin'),
      periodo: "2019 - 2021",
      descripcion: t('experience.sysAdminDesc'),
      logros: [
        ""
      ],
      icono: <i className="fas fa-bolt text-xl"></i>
    }
  ];

  return (
    <section id="experiencia" className="py-20 bg-black">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white code-line animate-on-scroll">{t('experience.title')}</h2>
        <div className="space-y-12">
          {experiencias.map((exp, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'animate-on-scroll-left' : 'animate-on-scroll-right'}`}>
              <div className="mb-1 flex items-center">
                <div className="bg-green-500/20 p-3 rounded-full mr-4 text-green-500">
                  {exp.icono}
                </div>
                
                <div>
                  <span className="inline-block bg-green-500/20 text-green-500 text-xs font-medium px-2 py-1 rounded">
                    {exp.periodo}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{exp.empresa}</h3>
              <h4 className="text-lg text-green-500 mb-3 glow-text">{exp.puesto}</h4>
              <p className="text-gray-400 mb-4">{exp.descripcion}</p>
              
              {exp.logros && (
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-white mb-2">{t('experience.achievements')}</h5>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 pl-2">
                    {exp.logros.map((logro, i) => (
                      <li key={i} className="text-sm">
                        <span className="text-green-500">{'>'}</span> {logro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-4 flex space-x-2">
                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                  #{t('experience.tags.searching')}
                </span>
                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                  #{t('experience.tags.searching')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const Proyectos = memo(() => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  
  // Estado para controlar la vista de proyectos
  const [verTodos, setVerTodos] = useState(false);
  const [proyectoActivo, setProyectoActivo] = useState(null);
  
  const proyectos = [
    {
      titulo: t('projects.h3nColors.title'),
      descripcion: t('projects.h3nColors.description'),
      tecnologias: ["React", "Vite", "Tailwind CSS"],
      imagen: "/images/colors.avif",
      detalles: t('projects.h3nColors.details'),
      demoLink: "https://color-design.netlify.app/",
      codeLink: "https://github.com/h3n-x/color-generator",
      destacado: true
    },
    {
      titulo: t('projects.skyCheck.title'),
      descripcion: t('projects.skyCheck.description'),
      tecnologias: ["React", "Vite", "Tailwind CSS"],
      imagen: "/images/skycheck.avif",
      detalles: t('projects.skyCheck.details'),
      demoLink: "https://skyh3n.netlify.app/",
      codeLink: "https://github.com/h3n-x/Skycheck",
      destacado: true
    },
    {
      titulo: t('projects.zenShell.title'),
      descripcion: t('projects.zenShell.description'),
      tecnologias: ["Python", "Flask", "Supabase"],
      imagen: "/images/zenShell.avif",
      detalles: t('projects.zenShell.details'),
      demoLink: "https://zenshell.netlify.app/",
      odeLink: "https://github.com/h3n-x/ZenShell.git",
      destacado: true
    },
    {
      titulo: t('projects.hyprDot.title'),
      descripcion: t('projects.hyprDot.description'),
      tecnologias: ["Python", "Arch Linux", "Hyprland", "Bash"],
      imagen: "/images/hypr-dot.avif",
      detalles: t('projects.hyprDot.details'),
      codeLink: "https://github.com/h3nr1d3v/hypr-dot",
      destacado: true
    }
  ];

  const proyectoMemo = useCallback(() => {
    return (
      <section id="proyectos" className="py-20 bg-black">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white code-line animate-on-scroll">{t('projects.title')}</h2>
          
          {/* Vista de tarjetas de proyectos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {proyectos.slice(0, verTodos ? proyectos.length : 3).map((proyecto, index) => (
              <div 
                key={index} 
                className={`bg-black rounded-lg overflow-hidden border ${proyecto.destacado ? 'border-green-500' : 'border-green-500/30'} hover:border-green-500 transition-all duration-300 card-hover`}
                onClick={() => setProyectoActivo(proyecto)}
              >
                <div className="relative overflow-hidden rounded-lg mb-4 group cursor-pointer">
                  <OptimizedImage 
                    src={proyecto.imagen} 
                    alt={proyecto.titulo} 
                    className="w-full h-48 md:h-80 object-cover"
                    width="600"
                    height="338"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center p-4">
                      <h4 className="text-white font-bold">{proyecto.titulo}</h4>
                    </div>
                  </div>
                  {proyecto.destacado && (
                    <div className="absolute top-0 right-0 bg-green-500 text-black text-sm font-bold px-4 py-2">
                      {t('projects.featured')}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 glow-text">{proyecto.titulo}</h3>
                  <p className="text-gray-400 mb-4">{proyecto.descripcion}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proyecto.tecnologias.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <a href={proyecto.demoLink} target="_blank" rel="noopener noreferrer" className="project-button demo-btn">
                      <i className="fas fa-external-link-alt mr-1"></i>
                      <span>{t('projects.demo')}</span>
                    </a>
                    <a href={proyecto.codeLink} target="_blank" rel="noopener noreferrer" className="project-button code-btn">
                      <i className="fas fa-code mr-1"></i>
                      <span>{t('projects.code')}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Botón para ver más proyectos */}
          {proyectos.length > 3 && (
            <div className="flex justify-center mb-16">
              <button 
                onClick={() => setVerTodos(!verTodos)} 
                className="project-button code-btn"
              >
                {verTodos ? (
                  <>
                    <i className="fas fa-chevron-up mr-2"></i>
                    {t('projects.showLess')}
                  </>
                ) : (
                  <>
                    <i className="fas fa-chevron-down mr-2"></i>
                    {t('projects.showMore')}
                  </>
                )}
              </button>
            </div>
          )}
          
          {/* Vista detallada del proyecto activo */}
          {proyectoActivo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
              <div className="bg-gray-900 border border-green-500 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="relative">
                  <OptimizedImage 
                    src={proyectoActivo.imagen} 
                    alt={proyectoActivo.titulo} 
                    className="w-full h-64 md:h-80 object-cover"
                    width="1200"
                    height="675"
                  />
                  <button 
                    onClick={() => setProyectoActivo(null)} 
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2 rounded-full"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                  {proyectoActivo.destacado && (
                    <div className="absolute top-0 left-0 bg-green-500 text-black text-sm font-bold px-4 py-2">
                      {t('projects.featured')}
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 glow-text">{proyectoActivo.titulo}</h3>
                  <p className="text-gray-300 mb-6 text-lg">{proyectoActivo.descripcion}</p>
                  <div className="bg-black/50 p-6 rounded-lg mb-6">
                    <h4 className="text-white font-bold mb-3">{t('projects.details')}</h4>
                    <p className="text-gray-400">{proyectoActivo.detalles}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-white font-bold mb-3">{t('projects.technologies')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {proyectoActivo.tecnologias.map((tech, i) => (
                        <span key={i} className="px-4 py-2 bg-green-500/10 text-green-500 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <a href={proyectoActivo.demoLink} target="_blank" rel="noopener noreferrer" className="project-button demo-btn">
                      <i className="fas fa-external-link-alt mr-2"></i>
                      <span>{t('projects.viewDemo')}</span>
                    </a>
                    <a href={proyectoActivo.codeLink} target="_blank" rel="noopener noreferrer" className="project-button code-btn">
                      <i className="fas fa-code mr-2"></i>
                      <span>{t('projects.viewCode')}</span>
                    </a>
                    <button 
                      onClick={() => setProyectoActivo(null)} 
                      className="project-button"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      <span>{t('projects.back')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }, [proyectos, verTodos, proyectoActivo, t]);

  return proyectoMemo();
});

const Formacion = memo(() => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  
  const formacion = [
    {
      institucion: 'Universidad De Investigacion Y Desarrollo',
      titulo: t('education.computerScience.title'),
      periodo: '2022 - 2027',
      descripcion: t('education.computerScience.description')
    },
    {
      institucion: 'Udemy',
      titulo: t('education.autoDidactic.title'),
      periodo: '2020 - 2021',
      descripcion: t('education.autoDidactic.description')
    },
    {
      institucion: 'I.E.T.A.C Eutimio Gutierrez Manjon',
      titulo: t('education.basic.title'),
      periodo: '2014 - 2019',
      descripcion: t('education.basic.description')
    }
  ];

  return (
    <section id="formación" className="py-20 bg-black">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white code-line animate-on-scroll">{t('education.title')}</h2>
        
        <div className="space-y-8 stagger-animation">
          {formacion.map((item, index) => (
            <div 
              key={index}
              className="bg-black border border-green-500/30 hover:border-green-500 rounded-lg p-6 transition-colors card-hover"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-bold text-white glow-text">{item.titulo}</h3>
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="text-green-500 text-sm">{item.institucion}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-gray-400 text-sm">{item.periodo}</span>
                </div>
              </div>
              <p className="text-gray-400">{item.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const Footer = memo(() => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón solo cuando estemos cerca del final de la página
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Mostrar cuando estemos en el último 20% de la página
      setShowScrollTop(scrollPosition > documentHeight - windowHeight * 1.2);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <footer className="bg-black py-12 border-t border-green-500/20 footer-glow">
      <div className="container">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-green-500 mb-6 glow-text-intense">H3n</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mx-auto mb-8 justify-items-center">
            <div className="text-center">
              <h4 className="text-white font-medium mb-3">{t('footer.contact')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:mp792819@gmail.com" className="text-gray-400 hover:text-green-500 transition-colors flex items-center justify-center">
                    <i className="fas fa-envelope mr-2"></i>
                    mp792819@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <h4 className="text-white font-medium mb-3">{t('footer.social')}</h4>
              <div className="flex justify-center space-x-4">
                <a href="https://github.com/h3n-x/" className="text-gray-400 hover:text-green-500 transition-colors">
                  <i className="fab fa-github text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-lg mx-auto">
            <div className="section-divider mb-6"></div>
            <p className="text-gray-600 text-center text-xs mt-2">
              {t('footer.quote')}
            </p>
          </div>
        </div>
      </div>
      
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-green-500/20 hover:bg-green-500/40 p-3 rounded-full text-green-500 transition-colors"
          aria-label={t('buttons.backToTop')}
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      )}
    </footer>
  );
});

const Hero = memo(() => {
  const particlesRef = useRef(null);
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);

  useEffect(() => {
    // Crear partículas para el efecto de fondo
    const createParticles = () => {
      const heroParticles = particlesRef.current;
      if (!heroParticles) return;
      
      // Limpiar partículas existentes
      heroParticles.innerHTML = '';
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      const particleCount = Math.floor((width * height) / 10000); // Densidad de partículas
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = `${Math.random() * 3 + 1}px`;
        particle.style.animation = `pulse ${Math.random() * 3 + 2}s infinite alternate`;
        
        heroParticles.appendChild(particle);
      }
    };
    
    createParticles();
    window.addEventListener('resize', createParticles);
    
    return () => {
      window.removeEventListener('resize', createParticles);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 bg-black relative">
      <div className="hero-particles" ref={particlesRef}></div>
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 animate-on-scroll">
            <div className="profile-img-container relative w-40 h-40 md:w-48 md:h-48 rounded-full p-1">
              <img 
                src="/images/profile.avif" 
                alt="Henry Pacheco" 
                className="rounded-full w-full h-full object-cover"
                loading="lazy"
                fetchPriority="high"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white animate-on-scroll">
            Henry Pacheco <span className="text-green-500 glow-text-intense">(H3n)</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-400 typing-effect animate-on-scroll">
            {t('hero.role')}
          </p>
          <div className="flex justify-center space-x-4 mb-8 animate-on-scroll">
            <span className="flex items-center text-gray-400">
              <i className="fas fa-map-marker-alt mr-2 text-green-500"></i>
              {t('hero.location')}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 stagger-animation">
            <a href="mailto:mp792819@gmail.com" className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors btn">
              <i className="fas fa-envelope mr-2"></i>
              <span>{t('hero.contactMe')}</span>
            </a>
            <a href="#" className="flex items-center justify-center border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-4 py-2 rounded-md transition-colors btn">
              <i className="fas fa-download mr-2"></i>
              <span>{t('hero.downloadCV')}</span>
            </a>            <a href="#sobre-mí" className="flex items-center justify-center bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-4 py-2 rounded-md transition-colors btn">
              <i className="fas fa-chevron-right mr-2"></i>
              <span>{t('hero.learnMore')}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 w-full flex justify-center animate-bounce">
        <a href="#sobre-mí" className="text-green-500 hover:text-green-400 transition-colors">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
});

function App() {
  useEffect(() => {
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .stagger-animation');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        } else {
          // Opcional: remover la clase si el elemento ya no está visible
          // element.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Initial check
    setTimeout(animateOnScroll, 100); // Pequeño retraso para asegurar que los elementos estén renderizados
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white">
        <Suspense fallback={<LoadingSpinner />}>
          <MatrixRain />
        </Suspense>
        <Suspense fallback={<div className="matrix-grid-placeholder"></div>}>
          <MatrixGrid />
        </Suspense>
        <CursorTrail />
        <Header />
        <main>
          <Hero />
          <SobreMi />
          {/* Sección de experiencia oculta temporalmente */}
          {/* <Experiencia /> */}
          <Proyectos />
          <Tecnologias />
          <Formacion />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App;
