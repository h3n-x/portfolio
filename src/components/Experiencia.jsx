import { useContext, memo, useRef, useEffect } from 'react';
import { m as motion } from 'framer-motion';
import { LanguageContext } from '../LanguageContext';
import { useTranslation } from '../translations';

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
      icono: <i className="fas fa-file-code text-xl" aria-hidden="true"></i>
    },
    {
      empresa: "",
      puesto: t('experience.sysAdmin'),
      periodo: "2019 - 2021",
      descripcion: t('experience.sysAdminDesc'),
      logros: [
        ""
      ],
      icono: <i className="fas fa-bolt text-xl" aria-hidden="true"></i>
    }
  ];

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: index => index % 2 === 0 ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section 
      id="experiencia" 
      className="py-20 bg-black"
      aria-labelledby="experiencia-title"
    >
      <div className="container">
        <h2 
          id="experiencia-title"
          className="text-3xl md:text-4xl font-bold mb-12 text-white code-title"
        >
          <span className="title-arrow"></span>
          {t('experience.title')}
        </h2>
        
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Línea vertical */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500/50 via-green-500/30 to-transparent"></div>
          
          {experiencias.map((exp, index) => (
            <motion.div 
              key={index} 
              className="mb-16 ml-8 relative" 
              variants={itemVariants}
              custom={index}
            >
              {/* Círculo en la línea timeline */}
              <div className="absolute -left-10 top-2 w-5 h-5 bg-black border-2 border-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              
              {/* Línea horizontal que conecta con el contenido */}
              <div className="absolute -left-5 top-4 w-5 h-0.5 bg-green-500/50"></div>
              
              <div className="bg-black border border-green-500/20 rounded-lg p-6 shadow-lg shadow-green-500/5 hover:border-green-500/50 transition-all duration-300">
                {/* Período */}
                <div className="flex items-center mb-4">
                  <div className="bg-green-500/10 p-3 rounded-full text-green-500 mr-4">
                    {exp.icono}
                  </div>
                  <div className="bg-green-500/10 text-green-500 text-xs font-medium px-3 py-1.5 rounded">
                    {exp.periodo}
                  </div>
                </div>
                
                {/* Cargo */}
                <h3 className="text-xl text-green-500 font-medium mb-3 glow-text">{exp.puesto}</h3>
                
                {/* Descripción */}
                <p className="text-gray-200 mb-4 leading-relaxed">{exp.descripcion}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full hover:bg-green-500/20 transition-colors">
                    #{t('experience.tags.searching')}
                  </span>
                  <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full hover:bg-green-500/20 transition-colors">
                    #{t('experience.tags.searching')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Experiencia.displayName = 'Experiencia';

export default Experiencia; 