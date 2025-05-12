import { useState, useEffect, useRef, useContext, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../LanguageContext';
import { useTranslation } from '../translations';

const Tecnologias = memo(() => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);
  
  const getTecnologias = useCallback(() => [
    { 
      nombre: t('technologies.bash.name'), 
      color: "bg-green-500",
      icon: <i className="fas fa-terminal text-xl" aria-hidden="true"></i>,
      url: "https://www.gnu.org/software/bash/",
      descripcion: t('technologies.bash.description'),
      order: 1
    },
    { 
      nombre: t('technologies.git.name'), 
      color: "bg-green-500",
      icon: <i className="fab fa-git-alt text-xl" aria-hidden="true"></i>,
      url: "https://git-scm.com/",
      descripcion: t('technologies.git.description'),
      order: 3
    },
    { 
      nombre: t('technologies.linux.name'), 
      color: "bg-green-500",
      icon: <i className="fab fa-linux text-xl" aria-hidden="true"></i>,
      url: "https://www.kernel.org/",
      descripcion: t('technologies.linux.description'),
      order: 5
    },
    { 
      nombre: t('technologies.mysql.name'), 
      color: "bg-green-500",
      icon: <i className="fas fa-database text-xl" aria-hidden="true"></i>,
      url: "https://www.mysql.com/",
      descripcion: t('technologies.mysql.description'),
      order: 2
    },
    { 
      nombre: t('technologies.python.name'), 
      color: "bg-green-500",
      icon: <i className="fab fa-python text-xl" aria-hidden="true"></i>,
      url: "https://www.python.org/",
      descripcion: t('technologies.python.description'),
      order: 4
    },
    { 
      nombre: t('technologies.vim.name'), 
      color: "bg-green-500",
      icon: <i className="fas fa-terminal text-xl" aria-hidden="true"></i>,
      url: "https://www.vim.org/",
      descripcion: t('technologies.vim.description'),
      order: 6
    }
  ], [t]);

  const tecnologias = getTecnologias();
  
  // Ordenar tecnologías por el orden de carga en zigzag
  const sortedTecnologias = [...tecnologias].sort((a, b) => a.order - b.order);
  
  // Variantes de animación para Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = (order) => ({
    hidden: { 
      y: 50,
      opacity: 0,
      rotateY: order % 2 === 0 ? -15 : 15
    },
    visible: { 
      y: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: (order % 3) * 0.1
      }
    },
    hover: {
      y: -8,
      boxShadow: "0px 10px 20px rgba(34, 197, 94, 0.15)",
      border: "1px solid rgba(34, 197, 94, 0.8)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  });

  const iconVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.5
      }
    }
  };

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
    <section 
      id="tecnologías" 
      className="py-20 bg-black" 
      ref={sectionRef}
      aria-labelledby="tecnologias-title"
    >
      <div className="container">
        <h2 
          id="tecnologias-title"
          className="text-3xl md:text-4xl font-bold mb-12 text-white code-title"
        >
          <span className="title-arrow"></span>
          {t('technologies.title')}
        </h2>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Lista de tecnologías"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {sortedTecnologias.map((tech, index) => (
            <motion.div 
              key={index} 
              className="bg-black p-6 rounded-lg border border-green-500/30 glow-box relative overflow-hidden perspective-500"
              variants={itemVariants(tech.order)}
              whileHover="hover"
              role="listitem"
              aria-label={tech.nombre}
            >
              {/* Fondo de partículas */}
              <div className="absolute inset-0 bg-green-500/5 z-0"></div>
              
              {/* Contenido */}
              <div className="relative z-10">
                <motion.div 
                  className={`w-16 h-16 ${tech.color} rounded-full flex items-center justify-center mb-4 mx-auto tech-icon shadow-lg shadow-green-500/20`}
                  aria-hidden="true"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <span className="text-black">{tech.icon}</span>
                </motion.div>
                
                <h3 className="text-center text-white font-medium text-lg mb-2">{tech.nombre}</h3>
                <p className="text-gray-200 text-sm text-center">{tech.descripcion}</p>
                
                {tech.url && (
                  <motion.a
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-xs text-green-500 hover:text-green-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                    aria-label={`Más información sobre ${tech.nombre}`}
                  >
                    <span>Más info</span>
                    <i className="fas fa-external-link-alt ml-1"></i>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Tecnologias.displayName = 'Tecnologias';

export default Tecnologias; 