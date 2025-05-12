import { useEffect, useRef, useContext, memo } from 'react';
import { m as motion } from 'framer-motion';
import { LanguageContext } from '../LanguageContext';
import { useTranslation } from '../translations';
import OptimizedImage from './OptimizedImage';

const HeroComponent = () => {
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
    
    // Usar ResizeObserver para manejar cambios de tamaño
    const resizeObserver = new ResizeObserver(() => {
      createParticles();
    });
    
    resizeObserver.observe(document.body);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Variantes de animación para Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const profileContainerVariants = {
    initial: {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "rgba(34, 197, 94, 0.3)"
    },
    animate: {
      borderColor: [
        "rgba(34, 197, 94, 0.3)",
        "rgba(34, 197, 94, 0.6)",
        "rgba(34, 197, 94, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const skeletonVariants = {
    initial: {
      background: "linear-gradient(90deg, rgba(34, 197, 94, 0.1) 25%, rgba(34, 197, 94, 0.2) 50%, rgba(34, 197, 94, 0.1) 75%)",
      backgroundSize: "200% 100%",
      backgroundPosition: "200% 0"
    },
    animate: {
      backgroundPosition: ["-200% 0", "200% 0"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8 + (custom * 0.1),
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 bg-black relative">
      <div className="hero-particles" ref={particlesRef} aria-hidden="true"></div>
      <div className="container">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <motion.div 
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-full"
              initial="initial"
              animate="animate"
              variants={profileContainerVariants}
            >
              <div className="w-full h-full rounded-full overflow-hidden">
                <OptimizedImage 
                  src="/images/profile"
                  alt="Henry Pacheco"
                  className="w-full h-full object-cover"
                  width={192}
                  height={192}
                  priority="high"
                  sizes="(max-width: 768px) 160px, 192px"
                />
              </div>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
            variants={itemVariants}
          >
            <span className="title-arrow"></span>
            Henry Pacheco <span className="text-green-500 glow-text-intense">(H3n)</span>
          </motion.h1>
          
          <motion.div 
            className="text-lg md:text-xl mb-6 text-gray-200 flex items-center justify-center"
            variants={itemVariants}
          >
            <span>{t('hero.role')}</span>
            <span className="text-green-500 animate-blink ml-1">_</span>
          </motion.div>
          
          <motion.div 
            className="flex justify-center space-x-4 mb-8"
            variants={itemVariants}
          >
            <span className="flex items-center text-gray-200">
              <i className="fas fa-map-marker-alt mr-2 text-green-500"></i>
              {t('hero.location')}
            </span>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a 
              href="mailto:h3n.eth@gmail.com" 
              className="flex items-center justify-center border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-4 py-2 rounded-md transition-colors btn focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
              variants={buttonVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <i className="fas fa-envelope mr-2"></i>
              <span>{t('hero.contactMe')}</span>
            </motion.a>
            
            <motion.a 
              href="#" 
              className="flex items-center justify-center border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-4 py-2 rounded-md transition-colors btn focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
              variants={buttonVariants}
              custom={1}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <i className="fas fa-download mr-2"></i>
              <span>{t('hero.downloadCV')}</span>
            </motion.a>
            
            <motion.a 
              href="#sobre-mí" 
              className="flex items-center justify-center bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-4 py-2 rounded-md transition-colors btn focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
              variants={buttonVariants}
              custom={2}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <i className="fas fa-chevron-right mr-2"></i>
              <span>{t('hero.learnMore')}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-0 w-full flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.a 
          href="#sobre-mí" 
          className="text-green-500 hover:text-green-400 transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
          aria-label="Desplazar hacia abajo"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          <i className="fas fa-chevron-down"></i>
        </motion.a>
      </motion.div>
    </section>
  );
};

const Hero = memo(HeroComponent);
Hero.displayName = 'Hero';

export default Hero;
