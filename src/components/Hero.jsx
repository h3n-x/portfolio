import { useEffect, useRef, useContext, memo, useState } from 'react';
import { m as motion } from 'framer-motion';
import { LanguageContext } from '../LanguageContext';
import { useTranslation } from '../translations';
import OptimizedImage from './OptimizedImage';

const HeroComponent = () => {
  const particlesRef = useRef(null);
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  const [emailCopied, setEmailCopied] = useState(false);

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

  const copyEmail = async () => {
    const email = 'h3n.eth@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar email:', err);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-16 md:pt-20 bg-black relative">
      <div className="hero-particles" ref={particlesRef} aria-hidden="true"></div>
      <div className="container px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="mb-6 md:mb-8"
            variants={itemVariants}
          >
            <motion.div 
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full mx-auto"
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
                  loading="eager"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                />
              </div>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 text-white px-4"
            variants={itemVariants}
          >
            <span className="title-arrow"></span>
            Henry Pacheco <br className="sm:hidden" />
            <span className="text-green-500 glow-text-intense">(H3n)</span>
          </motion.h1>
          
          {/* Indicador de disponibilidad */}
          <motion.div 
            className="flex justify-center mb-4 md:mb-6 px-4"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 sm:gap-3 bg-green-500/10 border border-green-500/30 rounded-full px-3 sm:px-4 py-2 backdrop-blur-sm">
              <div className="relative flex items-center">
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-ping"></span>
              </div>
              <span className="text-green-500 font-medium text-xs sm:text-sm">
                {t('hero.availableForWork')}
              </span>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex justify-center mb-6 md:mb-8 px-4"
            variants={itemVariants}
          >
            <span className="flex items-center text-gray-200 text-sm sm:text-base">
              <i className="fas fa-map-marker-alt mr-2 text-green-500"></i>
              {t('hero.location')}
            </span>
          </motion.div>
          
          <div className="hero-buttons flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4 w-full max-w-lg mx-auto">
            <motion.button 
              onClick={copyEmail}
              className="relative flex items-center justify-center border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-4 py-3 sm:py-2 rounded-md transition-colors btn focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black w-full sm:w-auto min-h-[44px] text-sm sm:text-base"
              variants={buttonVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <i className={`fas ${emailCopied ? 'fa-check' : 'fa-envelope'} mr-2 transition-all duration-300`}></i>
              <span className="truncate">
                {emailCopied ? (language === 'es' ? '¡Email copiado!' : 'Email copied!') : t('hero.contactMe')}
              </span>
              {emailCopied && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-black px-3 py-1 rounded text-xs sm:text-sm whitespace-nowrap z-10"
                >
                  h3n.eth@gmail.com
                </motion.div>
              )}
            </motion.button>
            
            <motion.a 
              href="#" 
              className="flex items-center justify-center border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-4 py-3 sm:py-2 rounded-md transition-colors btn focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black w-full sm:w-auto min-h-[44px] text-sm sm:text-base"
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
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-6 md:bottom-10 left-0 w-full justify-center hidden md:flex"
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
