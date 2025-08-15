import { useContext, memo, useCallback, useState } from 'react';
import { m as motion } from 'framer-motion';
import { LanguageContext } from '../LanguageContext';
import { useTranslation } from '../translations';
import SimpleCertificateModal from './SimpleCertificateModal';


const Formacion = memo(() => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  
  // Estado para el modal de certificados
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  
  // Funciones para manejar el modal
  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };
  
  const getFormacion = useCallback(() => [
    {
      institucion: 'UNIVERSIDAD TECNOLOGICA DE BOLIVAR',
      titulo: t('education.computerScience.title'),
      periodo: '2024',
      descripcion: t('education.computerScience.description'),
      icono: <i className="fas fa-graduation-cap text-xl" aria-hidden="true"></i>,
      certificate: {
        title: t('education.computerScience.title'),
        institution: 'UNIVERSIDAD TECNOLOGICA DE BOLIVAR',
        type: 'external',
        url: 'https://drive.google.com/file/d/1xgriuNThS4Ch-t1sSu0BNe0J7SMdJ4T4/view?usp=sharing'
      }
    },
    {
      institucion: 'Hack4U',
      titulo: t('education.autoDidactic.title'),
      periodo: '2023',
      descripcion: t('education.autoDidactic.description'),
      icono: <i className="fas fa-laptop-code text-xl" aria-hidden="true"></i>,
      certificate: {
        title: t('education.autoDidactic.title'),
        institution: 'Hack4U',
        type: 'external',
        url: 'https://drive.google.com/file/d/1zCtMYj73aN_MowW42dUhdIzQh4CuRTBU/view?usp=sharing'
      }
    },
    {
      institucion: 'ALURA LATAM',
      titulo: t('education.basic.title'),
      periodo: '2023',
      descripcion: t('education.basic.description'),
      icono: <i className="fas fa-school text-xl" aria-hidden="true"></i>,
      certificate: {
        title: t('education.basic.title'),
        institution: 'ALURA LATAM',
        type: 'external',
        url: 'https://app.aluracursos.com/program/certificate/f4bda55f-ac51-49b4-8c62-91267a88d488'
      }
    }
  ], [t]);

  const formacion = getFormacion();

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.95
    },
    visible: index => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: index * 0.2
      }
    })
  };

  return (
    <section 
      id="formación" 
      className="py-20 bg-black"
      aria-labelledby="formacion-title"
    >
      <div className="container">
        <h2 
          id="formacion-title"
          className="text-3xl md:text-4xl font-bold mb-12 text-white code-title"
        >
          <span className="title-arrow"></span>
          {t('education.title')}
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
          
          {formacion.map((item, index) => (
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
                {/* Cabecera */}
                <div className="flex items-center mb-4">
                  <div className="bg-green-500/10 p-3 rounded-full text-green-500 mr-4">
                    {item.icono}
                  </div>
                  <div className="bg-green-500/10 text-green-500 text-xs font-medium px-3 py-1.5 rounded">
                    {item.periodo}
                  </div>
                </div>
                
                {/* Título e institución */}
                <div className="mb-4">
                  <h3 className="text-xl text-green-500 font-medium mb-2 glow-text">{item.titulo}</h3>
                  <p className="text-gray-400 text-sm">{item.institucion}</p>
                </div>
                
                {/* Descripción */}
                <p className="text-gray-200 leading-relaxed">{item.descripcion}</p>
                
                {/* Certificado link */}
                <div className="mt-4 text-right">
                  <button 
                    onClick={() => openModal(item.certificate)}
                    className="bg-black text-green-500 border border-green-500 px-4 py-2 rounded-md hover:bg-green-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black inline-flex items-center"
                  >
                    <i className="fas fa-certificate mr-2"></i>
                    <span>{t('education.viewCertificate')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Modal de certificados */}
      <SimpleCertificateModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        certificate={selectedCertificate}
      />
    </section>
  );
});

Formacion.displayName = 'Formacion';

export default Formacion; 