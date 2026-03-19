import { useState, useEffect, useContext, lazy, Suspense, memo } from 'react'
import { Copy, Check, Github, ArrowUp } from 'lucide-react'

import { LanguageProvider } from './LanguageContext'

import { LanguageContext } from './LanguageContext'
import { LazyMotion, domAnimation } from 'framer-motion'

// Critical — above the fold
import Header from './components/Header'

// Lazy-loaded sections (below the fold)
const SobreMi   = lazy(() => import('./components/SobreMi'))

const Proyectos = lazy(() => import('./components/Proyectos'))
const Formacion = lazy(() => import('./components/Formacion'))
const Experiencia = lazy(() => import('./components/Experiencia'))

// Critical — load immediately
import Hero from './components/Hero'
import ScrollProgress from './components/ScrollProgress'

// Footer
const Footer = memo(() => {
  const { language } = useContext(LanguageContext)
  const currentYear = new Date().getFullYear()
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('h3n.eth@gmail.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch {
      // fallback silently
    }
  }

  return (
    <footer
      className="border-t"
      style={{ background: '#080808', borderColor: 'var(--border-subtle)' }}
      role="contentinfo"
    >
      {/* CTA Hero section */}
      <div className="container py-16 text-center" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <p
          className="font-mono text-xs uppercase mb-4"
          style={{ color: 'var(--accent)', letterSpacing: '0.18em' }}
        >
          {language === 'es' ? '¿Tienes un proyecto?' : 'Have a project?'}
        </p>
        <h2
          className="font-display font-bold mb-8"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.02em', color: 'var(--text-primary)' }}
        >
          {language === 'es' ? 'Hablemos.' : "Let's talk."}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              copyEmail()
              window.location.href = 'mailto:h3n.eth@gmail.com'
            }}
            className="btn-amber btn-amber-solid text-base px-8 py-3"
            aria-label={language === 'es' ? 'Enviar email' : 'Send email'}
          >
            {emailCopied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            <span>
              {emailCopied
                ? (language === 'es' ? '¡Email copiado!' : 'Email copied!')
                : (language === 'es' ? 'Enviar email' : 'Send email')}
            </span>
          </button>
          <a
            href="https://github.com/h3n-x"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amber text-base px-8 py-3"
            aria-label="GitHub"
          >
            <Github size={16} aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-4"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-4">
          <a
            href="#home"
            className="font-display font-bold text-sm"
            style={{ color: 'var(--text-primary)', letterSpacing: '0.02em', textDecoration: 'none' }}
            aria-label="Inicio"
          >
            H3n<span style={{ color: 'var(--accent)' }}>.</span>
          </a>
          <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            © {currentYear} Henry Pacheco
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-4" aria-label="Footer navigation">
          {[
            { href: '#sobre-mí', label: language === 'es' ? 'Sobre Mí' : 'About' },
            { href: '#proyectos', label: language === 'es' ? 'Proyectos' : 'Projects' },
            { href: '#experiencia', label: language === 'es' ? 'Experiencia' : 'Experience' },
            { href: '#formación', label: language === 'es' ? 'Formación' : 'Education' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs transition-colors duration-200"
              style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/h3n-x"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
            aria-label="GitHub"
          >
            <Github size={14} aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
            aria-label={language === 'es' ? 'Volver arriba' : 'Back to top'}
          >
            <ArrowUp size={14} aria-hidden="true" />
            <span>{language === 'es' ? 'Arriba' : 'Top'}</span>
          </button>
        </div>
      </div>
    </footer>
  )
})
Footer.displayName = 'Footer'

function App() {
  // Lenis smooth scroll
  useEffect(() => {
    let lenis
    const initLenis = async () => {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
      })
      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }
    initLenis()
    return () => { if (lenis) lenis.destroy() }
  }, [])

  return (
    <LanguageProvider>
      <LazyMotion features={domAnimation}>
        <div className="App">
          <ScrollProgress />
          <Header />
          <main id="main-content">
            <Hero />

            <Suspense fallback={null}>
              <SobreMi />
              <Proyectos />
              <Experiencia />
              <Formacion />
            </Suspense>
          </main>
          <Footer />
        </div>
      </LazyMotion>
    </LanguageProvider>
  )
}

export default App
