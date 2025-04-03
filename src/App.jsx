import { useState, useEffect, useRef, useContext, Suspense, lazy } from 'react'
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

// Componentes
const Header = () => {
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

  const navItems = ['home', 'sobre-mí', 'experiencia', 'proyectos', 'tecnologías', 'formación'];
  const navLabels = {
    'home': t('nav.home'),
    'sobre-mí': t('nav.about'),
    'experiencia': t('nav.experience'),
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
};

const SobreMi = () => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  
  return (
    <section id="sobre-mí" className="py-20 bg-black">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white code-line">{t('about.title')}</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-300 mb-6 leading-relaxed">
            {t('about.description1')}
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            {t('about.description2')}
          </p>
        </div>
      </div>
    </section>
  );
};

const Tecnologias = () => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  
  const tecnologias = [
    { 
      nombre: t('technologies.bash.name'), 
      color: "bg-green-500",
      icon: <i className="fas fa-terminal text-xl"></i>,
      url: "https://www.gnu.org/software/bash/",
      descripcion: t('technologies.bash.description')
    },
    { 
      nombre: t('technologies.git.name'), 
      color: "bg-green-500",
      icon: <i className="fab fa-git-alt text-xl"></i>,
      url: "https://git-scm.com/",
      descripcion: t('technologies.git.description')
    },
    { 
      nombre: t('technologies.linux.name'), 
      color: "bg-green-500",
      icon: <i className="fab fa-linux text-xl"></i>,
      url: "https://www.kernel.org/",
      descripcion: t('technologies.linux.description')
    },
    { 
      nombre: t('technologies.mysql.name'), 
      color: "bg-green-500",
      icon: <i className="fas fa-database text-xl"></i>,
      url: "https://www.mysql.com/",
      descripcion: t('technologies.mysql.description')
    },
    { 
      nombre: t('technologies.python.name'), 
      color: "bg-green-500",
      icon: <i className="fab fa-python text-xl"></i>,
      url: "https://www.python.org/",
      descripcion: t('technologies.python.description')
    },
    { 
      nombre: t('technologies.vim.name'), 
      color: "bg-green-500",
      icon: <i className="fas fa-terminal text-xl"></i>,
      url: "https://www.vim.org/",
      descripcion: t('technologies.vim.description')
    }
  ];

  return (
    <section id="tecnologías" className="py-20 bg-gray-900">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white code-line animate-on-scroll">{t('technologies.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 stagger-animation">
          {tecnologias.map((tech, index) => (
            <div key={index} className="bg-black p-6 rounded-lg border border-green-500/30 hover:border-green-500 transition-colors card-hover">
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
};

const Experiencia = () => {
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
};

const Proyectos = () => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  
  const proyectos = [
    {
      titulo: t('projects.hyprDot.title'),
      descripcion: t('projects.hyprDot.description'),
      tecnologias: ["Arch Linux", "Hyprland", "Dynamic Color Schemes"],
      imagen: "/images/hypr-dot.png",
      detalles: t('projects.hyprDot.details'),
      enlaceDemo: "#",
      enlaceRepo: "https://github.com/h3nr1d3v/hypr-dot",
      destacado: true
    },
    {
      titulo: t('projects.nekoShell.title'),
      descripcion: t('projects.nekoShell.description'),
      tecnologias: ["Python", "Discord.py", "Arch Linux"],
      imagen: "/images/Ne.png",
      detalles: t('projects.nekoShell.details'),
      enlaceDemo: "#",
      enlaceRepo: "https://github.com/h3nr1d3v/neoshell",
      destacado: true
    },
    {
      titulo: t('projects.reelsDownloader.title'),
      descripcion: t('projects.reelsDownloader.description'),
      tecnologias: ["Python", "Requests", "Arch Linux"],
      imagen: "/images/Reels-Downloader.png",
      detalles: t('projects.reelsDownloader.details'),
      enlaceDemo: "#",
      enlaceRepo: "https://github.com/h3nr1d3v/reels-downloader",
      destacado: false
    },
    {
      titulo: t('projects.aiAssistant.title'),
      descripcion: t('projects.aiAssistant.description'),
      tecnologias: ["Python", "OpenAI API", "Pyttsx3", "Arch Linux"],
      imagen: "/images/AI-Assistant.png",
      detalles: t('projects.aiAssistant.details'),
      enlaceDemo: "#",
      enlaceRepo: "https://github.com/h3nr1d3v/ai-assistant",
      destacado: false
    }
  ];

  return (
    <section id="proyectos" className="py-20 bg-gray-900">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white code-line animate-on-scroll">{t('projects.title')}</h2>
        
        <div className="grid md:grid-cols-2 gap-8 stagger-animation">
          {proyectos.map((proyecto, index) => (
            <div 
              key={index} 
              className={`bg-black rounded-lg overflow-hidden border ${proyecto.destacado ? 'border-green-500' : 'border-green-500/30'} hover:border-green-500 transition-all duration-300 card-hover`}
            >
              <div className="relative h-48 overflow-hidden img-matrix group">
                <img 
                  src={proyecto.imagen} 
                  alt={proyecto.titulo} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex justify-between items-center">
                      <h4 className="text-white font-bold">{proyecto.titulo}</h4>
                      <div className="flex space-x-2">
                        <a 
                          href={proyecto.enlaceDemo} 
                          className="bg-green-500/20 hover:bg-green-500/40 p-2 rounded-full text-green-500 transition-colors"
                          title={t('projects.demo')}
                        >
                          <i className="fas fa-eye"></i>
                        </a>
                        <a 
                          href={proyecto.enlaceRepo} 
                          className="bg-green-500/20 hover:bg-green-500/40 p-2 rounded-full text-green-500 transition-colors"
                          title={t('projects.code')}
                        >
                          <i className="fas fa-code"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {proyecto.destacado && (
                  <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 transform rotate-0 origin-top-right">
                    {t('projects.featured')}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 glow-text">{proyecto.titulo}</h3>
                <p className="text-gray-400 mb-4">{proyecto.descripcion}</p>
                <p className="text-gray-500 text-sm mb-4">{proyecto.detalles}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proyecto.tecnologias.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <a href={proyecto.enlaceDemo} className="text-green-500 hover:text-green-400 transition-colors flex items-center">
                    <i className="fas fa-external-link-alt mr-1"></i>
                    <span>{t('projects.demo')}</span>
                  </a>
                  <a href={proyecto.enlaceRepo} className="text-green-500 hover:text-green-400 transition-colors flex items-center">
                    <i className="fas fa-download mr-1"></i>
                    <span>{t('projects.code')}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Formacion = () => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  
  const formacion = [
    {
      institucion: t('education.university'),
      titulo: t('education.higherEd'),
      periodo: "2021 - Actualidad",
      detalles: t('education.universityDesc'),
      logo: <i className="fas fa-graduation-cap text-xl"></i>,
      habilidades: ["Programación", "Redes", "Sistemas Operativos", "Bases de datos"]
    },
    {
      institucion: t('education.selfTaught.title'),
      titulo: t('education.selfTaught.education'),
      periodo: t('education.selfTaught.period'),
      detalles: t('education.selfTaught.description'),
      logo: <i className="fas fa-book text-xl"></i>,
      habilidades: Array.isArray(t('education.selfTaught.skills')) ? t('education.selfTaught.skills') : ["Aprendizaje Autónomo", "Investigación", "Adaptabilidad"]
    },
    {
      institucion: t('education.highSchool'),
      titulo: t('education.middleEd'),
      periodo: "2014 - 2019",
      detalles: t('education.highSchoolDesc'),
      logo: <i className="fas fa-school text-xl"></i>,
      habilidades: ["Investigación", "Presentaciones", "Análisis", "Comunicación"]
    }
  ];

  return (
    <section id="formación" className="py-20 bg-black">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white code-line animate-on-scroll">{t('education.title')}</h2>
        
        <div className="space-y-8 stagger-animation">
          {formacion.map((item, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 border border-green-500/30 hover:border-green-500 transition-colors card-hover">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="bg-green-500/20 p-4 rounded-full text-green-500 self-center md:self-start">
                  {item.logo}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white glow-text">{item.institucion}</h3>
                      <p className="text-green-500">{item.titulo}</p>
                    </div>
                    <span className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded mt-2 md:mt-0 self-start">
                      {item.periodo}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{item.detalles}</p>
                  
                  {item.habilidades && (
                    <div className="flex flex-wrap gap-2">
                      {item.habilidades.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
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
                  <a href="mailto:h3n.eth@gmail.com" className="text-gray-400 hover:text-green-500 transition-colors flex items-center justify-center">
                    <i className="fas fa-envelope mr-2"></i>
                    h3n.eth@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <h4 className="text-white font-medium mb-3">{t('footer.social')}</h4>
              <div className="flex justify-center space-x-4">
                <a href="https://github.com/h3nr1d3v/" className="text-gray-400 hover:text-green-500 transition-colors">
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-lg mx-auto">
            <div className="section-divider mb-6"></div>
            <p className="text-gray-500 text-center text-sm">&copy; {new Date().getFullYear()} H3n. {t('footer.rights')}</p>
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
};

const Hero = () => {
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
                src="/images/profile.png" 
                alt="Henry Pacheco" 
                className="rounded-full w-full h-full object-cover"
                loading="lazy"
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
          <div className="flex flex-wrap justify-center gap-4 stagger-animation">
            <a href="mailto:h3n.eth@gmail.com" className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors btn">
              <i className="fas fa-envelope mr-2"></i>
              <span>{t('hero.contactMe')}</span>
            </a>
            <a href="#" className="flex items-center justify-center border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-4 py-2 rounded-md transition-colors btn">
              <i className="fas fa-download mr-2"></i>
              <span>{t('hero.downloadCV')}</span>
            </a>
            <a href="#sobre-mí" className="flex items-center justify-center bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-4 py-2 rounded-md transition-colors btn">
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
};

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
          <Experiencia />
          <Proyectos />
          <Tecnologias />
          <Formacion />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
