import { useState, useEffect, useContext, memo, useCallback } from 'react'
import { X, Menu } from 'lucide-react'
import { LanguageContext } from '../language-context'
import { useTranslation } from '../translations'
import LanguageToggle from '../LanguageToggle'

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { language } = useContext(LanguageContext)
  const { t } = useTranslation(language)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const updateActiveSection = useCallback(() => {
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return

    const scrollY = window.scrollY
    if (scrollY < 60) { setActiveSection('home'); return }
    if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60) {
      setActiveSection(sections[sections.length - 1].id)
      return
    }

    let current = 'home'
    let maxVis  = 0
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect()
      const vis  = (Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top)) /
                   Math.min(sec.offsetHeight, window.innerHeight)
      if (vis > maxVis && vis > 0.25) { maxVis = vis; current = sec.id }
    })
    setActiveSection(current)
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { updateActiveSection(); ticking = false })
        ticking = true
      }
    }
    const t0 = setTimeout(updateActiveSection, 150)
    window.addEventListener('load', updateActiveSection)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(t0)
      window.removeEventListener('load', updateActiveSection)
      window.removeEventListener('scroll', onScroll)
    }
  }, [updateActiveSection])

  const navItems = [
    { id: 'home',        label: t('nav.home') },
    { id: 'sobre-mí',   label: t('nav.about') },
    { id: 'proyectos',  label: t('nav.projects') },
    { id: 'experiencia', label: t('nav.experience') },
    { id: 'formación',  label: t('nav.education') },
  ]

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const section = document.getElementById(id)
    if (section) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const top = section.getBoundingClientRect().top + window.scrollY - 76
      window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion ? 'auto' : 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'frosted-header py-3' : 'py-5'}`}
      style={{ background: scrolled ? undefined : 'transparent' }}
      role="banner"
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="text-xl font-display font-bold transition-opacity hover:opacity-80"
          style={{ color: 'var(--text-primary)', letterSpacing: '0.02em', textDecoration: 'none' }}
          aria-label="Inicio"
        >
          H3n<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
          style={{
            color: 'var(--text-muted)',
            border: '1px solid var(--border-default)',
            background: 'transparent',
          }}
          onClick={() => setIsMenuOpen((o) => !o)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMenuOpen ? (
            <X size={14} aria-hidden="true" />
          ) : (
            <Menu size={14} aria-hidden="true" />
          )}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Navegación principal">
          {navItems.map(({ id, label }) => {
            const active = activeSection === id
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`nav-link-animated interactive-muted relative text-sm font-medium transition-colors duration-200${active ? ' active' : ''}`}
                style={{
                  color: active ? 'var(--accent)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                }}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </a>
            )
          })}
          <div className="ml-2">
            <LanguageToggle />
          </div>
        </nav>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden frosted-header mobile-menu-enter"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
          role="navigation"
          aria-label="Navegación móvil"
        >
          <div className="container py-6 flex flex-col gap-1">
            {navItems.map(({ id, label }) => {
              const active = activeSection === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: active ? 'var(--accent)' : 'var(--text-muted)',
                    background: active ? 'rgba(255,183,3,0.06)' : 'transparent',
                    border: active ? '1px solid rgba(255,183,3,0.15)' : '1px solid transparent',
                    fontFamily: 'var(--font-body)',
                    textDecoration: 'none',
                  }}
                  aria-current={active ? 'page' : undefined}
                >
                  {active && (
                    <span
                      className="w-1 h-full absolute left-0 rounded-r-full"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                  {label}
                </a>
              )
            })}
            <div className="mt-4 pt-4 flex justify-center" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <LanguageToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  )
})

Header.displayName = 'Header'
export default Header
