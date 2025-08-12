import { useState, useContext, memo, useCallback } from 'react';
import { LanguageContext } from '../LanguageContext';
import { useTranslation } from '../translations';
import OptimizedImage from './OptimizedImage';

function Proyectos() {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  
  // Estado para controlar la vista de proyectos
  const [verTodos, setVerTodos] = useState(false);
  const [proyectoActivo, setProyectoActivo] = useState(null);
  
  const getProyectos = useCallback(() => [
    {
      titulo: t('projects.h3nColors.title'),
      descripcion: t('projects.h3nColors.description'),
      tecnologias: ["React", "Vite", "Tailwind CSS"],
      imagen: "/images/colors",
      detalles: t('projects.h3nColors.details'),
      demoLink: "https://color-design.netlify.app/",
      codeLink: "https://github.com/h3n-x/color-generator",
      destacado: true
    },
    {
      titulo: t('projects.skyCheck.title'),
      descripcion: t('projects.skyCheck.description'),
      tecnologias: ["React", "Vite", "Tailwind CSS"],
      imagen: "/images/skycheck",
      detalles: t('projects.skyCheck.details'),
      demoLink: "https://skyh3n.netlify.app/",
      codeLink: "https://github.com/h3n-x/Skycheck",
      destacado: true
    },
    {
      titulo: t('projects.zenShell.title'),
      descripcion: t('projects.zenShell.description'),
      tecnologias: ["Python", "Flask", "Supabase"],
      imagen: "/images/zenShell",
      detalles: t('projects.zenShell.details'),
      demoLink: "https://zenshell.netlify.app/",
      codeLink: "https://github.com/h3n-x/ZenShell.git",
      destacado: true
    },
    {
      titulo: t('projects.hyprDot.title'),
      descripcion: t('projects.hyprDot.description'),
      tecnologias: ["Python", "Arch Linux", "Hyprland", "Bash"],
      imagen: "/images/hypr-dot",
      detalles: t('projects.hyprDot.details'),
      codeLink: "https://github.com/h3nr1d3v/hypr-dot",
      destacado: true
    }
  ], [t]);

  const proyectos = getProyectos();

  // Función para cerrar el modal del proyecto
  const cerrarProyectoActivo = useCallback(() => {
    // Añadir animación de salida
    document.getElementById('proyecto-detalle')?.classList.add('animate-fade-out');
    
    // Esperar a que termine la animación antes de cerrar
    setTimeout(() => {
      setProyectoActivo(null);
    }, 300);
  }, []);

  return (
    <section 
      id="proyectos" 
      className="py-20 bg-black"
      aria-labelledby="proyectos-title"
    >
      <div className="container">
        <h2 
          id="proyectos-title"
          className="text-3xl md:text-4xl font-bold mb-12 text-white code-title"
        >
          <span className="title-arrow"></span>
          {t('projects.title')}
        </h2>
        
        {/* Vista de tarjetas de proyectos */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          role="list"
          aria-label="Lista de proyectos"
        >
          {proyectos.slice(0, verTodos ? proyectos.length : 3).map((proyecto, index) => (
            <div 
              key={index} 
              className={`bg-black rounded-lg overflow-hidden border ${proyecto.destacado ? 'border-green-500' : 'border-green-500/30'} hover:border-green-500 transition-all duration-300 card-hover`}
              onClick={() => setProyectoActivo(proyecto)}
              onKeyDown={(e) => e.key === 'Enter' && setProyectoActivo(proyecto)}
              role="listitem"
              aria-label={proyecto.titulo}
              tabIndex={0}
            >
              <div className="relative overflow-hidden rounded-lg mb-4 group cursor-pointer">
                <OptimizedImage 
                  src={proyecto.imagen} 
                  alt={proyecto.titulo}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  width="600"
                  height="337"
                />
                {proyecto.destacado && (
                  <div className="absolute top-2 right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                    {t('projects.featured')}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-white">{proyecto.titulo}</h3>
                <p className="text-gray-200 text-sm mb-4 line-clamp-3">{proyecto.descripcion}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proyecto.tecnologias.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button 
                  className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-500 py-2 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label={`Ver detalles de ${proyecto.titulo}`}
                >
                  {t('projects.details')} <i className="fas fa-arrow-right ml-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botón para ver más/menos proyectos */}
        {proyectos.length > 3 && (
          <div className="text-center">
            <button 
              onClick={() => setVerTodos(!verTodos)}
              className="inline-flex items-center bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-4 py-2 rounded-md transition-colors duration-300"
              aria-expanded={verTodos}
            >
              <span>{verTodos ? t('projects.showLess') : t('projects.showMore')}</span>
              <i className={`fas fa-chevron-${verTodos ? 'up' : 'down'} ml-2`}></i>
            </button>
          </div>
        )}
        
        {/* Modal de detalle de proyecto */}
        {proyectoActivo && (
          <div 
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={cerrarProyectoActivo}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div 
              id="proyecto-detalle"
              className="bg-gray-900 rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal con botón de cerrar */}
              <div className="relative">
                <button 
                  className="absolute top-4 right-4 text-white/70 hover:text-white z-20 w-10 h-10 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-full transition-all duration-300 hover:bg-black/90"
                  onClick={cerrarProyectoActivo}
                  aria-label="Cerrar"
                >
                  <i className="fas fa-times"></i>
                </button>
                
                {/* Imagen horizontal que ocupa todo el ancho */}
                <div className="relative bg-black h-[300px] md:h-[400px] overflow-hidden">
                  <OptimizedImage 
                    src={proyectoActivo.imagen} 
                    alt={proyectoActivo.titulo}
                    className="w-full h-full object-contain"
                    width="1200"
                    height="675"
                  />
                  
                  {/* Overlay con gradiente */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent h-32 pointer-events-none"></div>
                </div>
              </div>
              
              {/* Contenido scrolleable */}
              <div className="overflow-y-auto flex-1">
                <div className="p-6 md:p-8">
                  {/* Título principal */}
                  <h3 
                    id="modal-title"
                    className="text-3xl md:text-4xl font-bold mb-4 text-white"
                  >
                    {proyectoActivo.titulo}
                  </h3>
                  
                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proyectoActivo.tecnologias.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 bg-green-500/10 text-green-500 text-sm rounded-full border border-green-500/20 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Descripción principal */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="h-px bg-green-500/30 flex-1"></div>
                      <h4 className="px-4 text-lg font-semibold text-green-500 flex items-center">
                        <i className="fas fa-info-circle mr-2"></i>
                        {t('projects.details')}
                      </h4>
                      <div className="h-px bg-green-500/30 flex-1"></div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                      {proyectoActivo.detalles}
                    </p>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-green-500/20">
                    {proyectoActivo.demoLink && (
                      <a 
                        href={proyectoActivo.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 group font-medium"
                        aria-label={`Ver demo de ${proyectoActivo.titulo}`}
                      >
                        <i className="fas fa-external-link-alt mr-2 group-hover:rotate-12 transition-transform"></i>
                        <span>{t('projects.viewDemo')}</span>
                      </a>
                    )}
                    
                    {proyectoActivo.codeLink && (
                      <a 
                        href={proyectoActivo.codeLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-6 py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 group font-medium"
                        aria-label={`Ver código de ${proyectoActivo.titulo}`}
                      >
                        <i className="fab fa-github mr-2 group-hover:scale-110 transition-transform"></i>
                        <span>{t('projects.viewCode')}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Proyectos; 