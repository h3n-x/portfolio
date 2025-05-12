import { useState, useEffect, useRef, useContext, lazy, Suspense, memo } from 'react'
import './App.css'
import { LanguageProvider } from './LanguageContext'
import { useTranslation } from './translations'
import { LanguageContext } from './LanguageContext'
import LoadingSpinner from './components/LoadingSpinner'
import { LazyMotion, m, domAnimation } from 'framer-motion'

// Utilizar lazy loading para todos los componentes no críticos
const Header = lazy(() => import('./components/Header'))
const SobreMi = lazy(() => import('./components/SobreMi'))
const Tecnologias = lazy(() => import('./components/Tecnologias'))
const Proyectos = lazy(() => import('./components/Proyectos'))
const Formacion = lazy(() => import('./components/Formacion'))
const Experiencia = lazy(() => import('./components/Experiencia'))
const MatrixRain = lazy(() => import('./components/MatrixRain'))
const MatrixGrid = lazy(() => import('./components/MatrixGrid'))

// Solo el Hero y el CursorTrail se cargan inmediatamente (experiencia crítica del usuario)
import Hero from './components/Hero'
import CursorTrail from './components/CursorTrail'

// Componente de Footer
const Footer = memo(() => {
  const { language } = useContext(LanguageContext)
  const { t } = useTranslation(language)
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-black py-16 border-t border-green-500/20" role="contentinfo">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <div className="md:pt-2">
              <h2 className="text-2xl font-bold text-white mb-4">H3n</h2>
              <p className="text-gray-200 max-w-md">
                {t('footer.quote')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl text-white font-medium mb-4">{t('footer.contact')}</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:h3n.eth@gmail.com" 
                    className="text-gray-200 hover:text-green-500 transition-colors flex items-center"
                    aria-label="Email"
                  >
                    <i className="fas fa-envelope mr-2 text-green-500"></i>
                    h3n.eth@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl text-white font-medium mb-4 text-center">{t('footer.social')}</h3>
              <div className="flex justify-center">
                <a 
                  href="https://github.com/h3n-x" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-green-500 transition-colors"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-green-500/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-200 text-sm mb-4 md:mb-0">
            {t('footer.rights')}
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-black text-green-500 border border-green-500 px-4 py-2 rounded-md hover:bg-green-500/10 transition-all duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Volver arriba"
          >
            <span className="mr-2">{t('buttons.backToTop')}</span>
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'

function App() {
  const [loading, setLoading] = useState(true)
  const [loadedSections, setLoadedSections] = useState({
    initial: false,
    secondary: false,
    tertiary: false
  })
  const mainSectionObserver = useRef(null)

  useEffect(() => {
    // Simulación de carga de recursos críticos
    const timer = setTimeout(() => {
      setLoading(false)
      // Marcar secciones iniciales como cargadas
      setLoadedSections(prev => ({ ...prev, initial: true }))
      
      // Programar carga de secciones secundarias después de 2s
      setTimeout(() => {
        setLoadedSections(prev => ({ ...prev, secondary: true }))
      }, 2000)
      
      // Programar carga de secciones terciarias después de 4s
      setTimeout(() => {
        setLoadedSections(prev => ({ ...prev, tertiary: true }))
      }, 4000)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    // Función para animar elementos al hacer scroll con throttle
    let lastScrollTime = 0;
    const throttleInterval = 100; // ms
    
    const animateOnScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < throttleInterval) return;
      lastScrollTime = now;
      
      const elements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right')
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0
        
        if (isVisible) {
          if (element.classList.contains('animate-on-scroll-left')) {
            element.classList.add('animate-slide-in-left')
          } else if (element.classList.contains('animate-on-scroll-right')) {
            element.classList.add('animate-slide-in-right')
          } else {
            element.classList.add('animate-slide-up')
          }
          element.style.opacity = '1'
        }
      })
    }
    
    // Ejecutar la animación al cargar la página
    animateOnScroll()
    
    // Ejecutar la animación al hacer scroll con throttle
    window.addEventListener('scroll', animateOnScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll)
    }
  }, [])
  
  // Fallback minimalista para componentes en carga
  const MinimalFallback = () => <div className="min-h-[200px]"></div>;
  
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mb-4"></div>
          <h2 className="text-white text-2xl font-bold">
            H<span className="text-green-500">3</span>n
          </h2>
        </div>
      </div>
    )
  }

  return (
    <LanguageProvider>
      <LazyMotion features={domAnimation}>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
            <CursorTrail />
            <Header />
            <main>
              <Hero />
              
              {loadedSections.initial && (
                <div className="relative overflow-hidden">
                  <Suspense fallback={<MinimalFallback />}>
                    <SobreMi />
                    <div className="absolute -z-10 inset-0 opacity-10">
                      <Suspense fallback={null}>
                        {loadedSections.secondary && <MatrixGrid />}
                      </Suspense>
                    </div>
                  </Suspense>
                </div>
              )}
              
              {loadedSections.initial && (
                <Suspense fallback={<MinimalFallback />}>
                  <Tecnologias />
                </Suspense>
              )}
              
              {loadedSections.secondary && (
                <div className="relative overflow-hidden">
                  <Suspense fallback={<MinimalFallback />}>
                    <Experiencia />
                    <div className="absolute -z-10 inset-0 opacity-5">
                      <Suspense fallback={null}>
                        {loadedSections.tertiary && <MatrixRain />}
                      </Suspense>
                    </div>
                  </Suspense>
                </div>
              )}
              
              {loadedSections.secondary && (
                <Suspense fallback={<MinimalFallback />}>
                  <Proyectos />
                </Suspense>
              )}
              
              {loadedSections.tertiary && (
                <Suspense fallback={<MinimalFallback />}>
                  <Formacion />
                </Suspense>
              )}
            </main>
            <Footer />
          </Suspense>
        </div>
      </LazyMotion>
    </LanguageProvider>
  )
}

export default App
