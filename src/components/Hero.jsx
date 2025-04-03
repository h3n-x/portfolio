import { useEffect, useRef, useContext } from 'react';
import { LanguageContext } from '../LanguageContext';
import { useTranslation } from '../translations';

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

export default Hero;
