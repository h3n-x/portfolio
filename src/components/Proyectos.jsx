import { useState, useContext, useCallback, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { m as motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, ExternalLink, Github, ChevronDown } from 'lucide-react'
import { LanguageContext } from '../language-context'
import { useTranslation } from '../translations'
import OptimizedImage from './OptimizedImage'

const INITIAL_VISIBLE = 6

const sectionBg = { background: 'var(--bg-primary)' }
const indexLabel = { color: 'var(--accent)', userSelect: 'none' }
const imageGradient = { background: 'linear-gradient(to top, #111113 10%, transparent 80%)' }
const featuredBadge = {
  background: 'rgba(255,183,3,0.15)',
  border: '1px solid rgba(255,183,3,0.35)',
  color: 'var(--accent)',
}
const cardTitle = {
  fontSize: 'var(--text-xl)',
  color: 'var(--text-primary)',
  letterSpacing: '-0.02em',
}
const cardDesc = {
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-sm)',
  lineHeight: '1.6',
}
const topBorder = { borderTop: '1px solid var(--border-subtle)' }

const modalBackdrop = { background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }
const modalPanel = { background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }
const modalTitle = { fontSize: 'var(--text-2xl)', color: 'var(--text-primary)', letterSpacing: '-0.02em' }
const modalDesc = { color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)' }
const modalClose = { background: 'rgba(0,0,0,0.5)', color: 'var(--text-muted)', border: '1px solid var(--border-default)' }

const tabBase = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
  letterSpacing: '0.05em',
  padding: '6px 16px',
  borderRadius: '999px',
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  background: 'transparent',
  color: 'var(--text-muted)',
}
const tabActive = {
  ...tabBase,
  background: 'rgba(255,183,3,0.12)',
  border: '1px solid rgba(255,183,3,0.30)',
  color: 'var(--accent)',
}

function Proyectos() {
  const { language } = useContext(LanguageContext)
  const { t } = useTranslation(language)
  const [proyectoActivo, setProyectoActivo] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)

  const filters = useMemo(() => [
    { key: 'all', label: language === 'es' ? 'Todos' : 'All' },
    { key: 'backend', label: 'Backend' },
    { key: 'frontend', label: 'Frontend' },
  ], [language])

  const getProyectos = useCallback(() => [
    {
      titulo: t('projects.chat.title'),
      descripcion: t('projects.chat.description'),
      impacto: t('projects.chat.impact'),
      tecnologias: ['Python', 'Vite', 'Tailwind CSS'],
      imagen: '/images/chat',
      detalles: t('projects.chat.details'),
      prueba: {
        rol: t('projects.chat.proofRole'),
        alcance: t('projects.chat.proofScope'),
        estado: t('projects.chat.proofStatus'),
      },
      demoLink: 'https://write-ghost.netlify.app/',
      codeLink: 'https://github.com/h3n-x/chat-anonimo.git',
      destacado: true,
      categoria: 'backend',
    },
    {
      titulo: t('projects.h3nColors.title'),
      descripcion: t('projects.h3nColors.description'),
      tecnologias: ['React', 'Vite', 'Tailwind CSS'],
      imagen: '/images/colors',
      detalles: t('projects.h3nColors.details'),
      demoLink: 'https://color-design.netlify.app/',
      codeLink: 'https://github.com/h3n-x/color-generator',
      destacado: false,
      categoria: 'frontend',
    },
    {
      titulo: t('projects.skyCheck.title'),
      descripcion: t('projects.skyCheck.description'),
      tecnologias: ['React', 'Vite', 'Tailwind CSS'],
      imagen: '/images/skycheck',
      detalles: t('projects.skyCheck.details'),
      demoLink: 'https://skyh3n.netlify.app/',
      codeLink: 'https://github.com/h3n-x/Skycheck',
      destacado: false,
      categoria: 'frontend',
    },
    {
      titulo: t('projects.zenShell.title'),
      descripcion: t('projects.zenShell.description'),
      tecnologias: ['Python', 'Flask', 'Supabase'],
      imagen: '/images/zenShell',
      detalles: t('projects.zenShell.details'),
      demoLink: 'https://zenshell.netlify.app/',
      codeLink: 'https://github.com/h3n-x/ZenShell.git',
      destacado: true,
      categoria: 'backend',
    },
    {
      titulo: t('projects.hyprDot.title'),
      descripcion: t('projects.hyprDot.description'),
      impacto: t('projects.hyprDot.impact'),
      tecnologias: ['Python', 'Arch Linux', 'Hyprland', 'Bash'],
      imagen: '/images/Deskt',
      detalles: t('projects.hyprDot.details'),
      prueba: {
        rol: t('projects.hyprDot.proofRole'),
        alcance: t('projects.hyprDot.proofScope'),
        estado: t('projects.hyprDot.proofStatus'),
      },
      codeLink: 'https://github.com/h3n-x/hypr-rice.git',
      destacado: true,
      categoria: 'backend',
    },
    {
      titulo: t('projects.archforge.title'),
      descripcion: t('projects.archforge.description'),
      impacto: t('projects.archforge.impact'),
      tecnologias: ['Bash', 'Arch Linux', 'systemd', 'nftables'],
      imagen: '/images/archforge',
      detalles: t('projects.archforge.details'),
      prueba: {
        rol: t('projects.archforge.proofRole'),
        alcance: t('projects.archforge.proofScope'),
        estado: t('projects.archforge.proofStatus'),
      },
      codeLink: 'https://github.com/h3n-x/archforge',
      destacado: true,
      categoria: 'backend',
    },
  ], [t])

  const allProyectos = getProyectos()

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return allProyectos
    return allProyectos.filter(p => p.categoria === activeFilter)
  }, [allProyectos, activeFilter])

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE)
  const hasMore = filtered.length > INITIAL_VISIBLE

  const handleFilterChange = useCallback((key) => {
    setActiveFilter(key)
    setShowAll(false)
  }, [])

  const cerrar = useCallback(() => setProyectoActivo(null), [])
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)
  const scrollYRef = useRef(0)

  useEffect(() => {
    if (!proyectoActivo) return

    previousFocusRef.current = document.activeElement
    const bodyStyle = document.body.style
    const htmlStyle = document.documentElement.style
    const lenis = window.__portfolioLenis
    const previousBody = {
      overflow: bodyStyle.overflow,
    }
    const previousHtmlOverflow = htmlStyle.overflow
    scrollYRef.current = window.scrollY

    bodyStyle.overflow = 'hidden'
    htmlStyle.overflow = 'hidden'
    lenis?.stop?.()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { cerrar(); return }
      if (e.key !== 'Tab' || !modalRef.current) return
      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true })
    })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      bodyStyle.overflow = previousBody.overflow
      htmlStyle.overflow = previousHtmlOverflow
      const currentScrollY = scrollYRef.current
      window.scrollTo(0, currentScrollY)
      lenis?.start?.()
      lenis?.scrollTo?.(currentScrollY, { immediate: true, force: true })
      if (previousFocusRef.current?.focus) {
        try {
          previousFocusRef.current.focus({ preventScroll: true })
        } catch {
          previousFocusRef.current.focus()
        }
      }
    }
  }, [proyectoActivo, cerrar])

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -12, scale: 0.97, transition: { duration: 0.25 } },
  }

  return (
    <>
    <section
      id="proyectos"
      className="section section-reveal overflow-hidden"
      style={sectionBg}
      aria-labelledby="proyectos-title"
    >
      <div aria-hidden="true" className="ambient-glow ambient-glow-tr" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h2 id="proyectos-title" className="section-title">{t('projects.title')}</h2>
          <hr className="section-divider" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label={language === 'es' ? 'Filtrar proyectos' : 'Filter projects'}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={activeFilter === f.key}
              onClick={() => handleFilterChange(f.key)}
              className="chip-filter"
              style={activeFilter === f.key ? tabActive : tabBase}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Animated grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label={language === 'es' ? 'Lista de proyectos' : 'Projects list'}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((proyecto, index) => (
              <motion.article
                key={proyecto.titulo}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: index * 0.05 }}
                className="card-project card-base overflow-hidden flex flex-col"
                role="listitem"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    previousFocusRef.current = e.currentTarget
                    setProyectoActivo(proyecto)
                  }}
                  className="text-left w-full h-full"
                  aria-label={`${language === 'es' ? 'Ver detalles de' : 'View details for'} ${proyecto.titulo}`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden group h-48">
                    <div
                      className="absolute top-3 left-3 z-10 font-mono text-xs"
                      style={indexLabel}
                      aria-hidden="true"
                    >
                      {`0${index + 1}`}
                    </div>
                    <OptimizedImage
                      src={proyecto.imagen}
                      alt={proyecto.titulo}
                      className="w-full h-full object-cover project-image-zoom"
                      width={600}
                      height={337}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={imageGradient}
                    />
                    {proyecto.destacado && (
                      <div
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-mono font-medium"
                        style={featuredBadge}
                      >
                        {t('projects.featured')}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display font-semibold mb-2" style={cardTitle}>
                      {proyecto.titulo}
                    </h3>
                    <p className="mb-4 line-clamp-2" style={cardDesc}>
                      {proyecto.descripcion}
                    </p>
                    <p className="project-impact-chip mb-4">
                      <span aria-hidden="true">↗</span>
                      <span>{proyecto.impacto}</span>
                    </p>
                    <div className="project-tech-group flex flex-wrap gap-1.5 mb-4">
                      {proyecto.tecnologias.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="mt-auto pt-3" style={topBorder}>
                      <span className="card-cta-link" aria-hidden="true">
                        {language === 'es' ? 'Ver detalles' : 'View details'}
                        <ArrowRight size={12} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Show more button */}
        {hasMore && !showAll && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => setShowAll(true)}
              className="btn-amber text-sm px-6 py-2.5 gap-2"
              aria-label={language === 'es' ? 'Ver más proyectos' : 'Show more projects'}
            >
              <span>{language === 'es' ? 'Ver más proyectos' : 'Show more projects'}</span>
              <ChevronDown size={14} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </div>
    </section>

    {/* Modal — portaled to body */}
    {createPortal(
      <AnimatePresence>
        {proyectoActivo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
            style={modalBackdrop}
            onClick={cerrar}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl w-full max-w-[640px] max-h-[90vh] flex flex-col overflow-hidden"
              style={modalPanel}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header: title + actions + close */}
              <div className="flex items-start gap-3 p-6 pb-0">
                <div className="flex-1 min-w-0">
                  <h3 id="modal-title" className="font-display font-bold mb-3" style={modalTitle}>
                    {proyectoActivo.titulo}
                  </h3>
                  <div className="flex gap-2 mb-4">
                    {proyectoActivo.demoLink && (
                      <a
                        href={proyectoActivo.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-amber btn-amber-solid text-xs px-3 py-1.5"
                        aria-label={`Ver demo de ${proyectoActivo.titulo}`}
                      >
                        <ExternalLink size={12} aria-hidden="true" />
                        <span>{t('projects.demo')}</span>
                      </a>
                    )}
                    {proyectoActivo.codeLink && (
                      <a
                        href={proyectoActivo.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-amber text-xs px-3 py-1.5"
                        aria-label={`Ver código de ${proyectoActivo.titulo}`}
                      >
                        <Github size={12} aria-hidden="true" />
                        <span>{t('projects.code')}</span>
                      </a>
                    )}
                  </div>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={cerrar}
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={modalClose}
                  aria-label="Cerrar"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="project-modal-scroll overflow-y-auto flex-1 px-6 pb-6" data-lenis-prevent>
                {/* Image — fixed height, rounded */}
                <div className="rounded-lg overflow-hidden h-56 md:h-64 mb-5 bg-black/30">
                  <OptimizedImage
                    src={proyectoActivo.imagen}
                    alt={proyectoActivo.titulo}
                    className="w-full h-full object-cover object-top"
                    width={1200}
                    height={675}
                    sizes="640px"
                  />
                </div>

                {/* Description — full text */}
                <p className="leading-relaxed mb-5" style={modalDesc}>
                  {proyectoActivo.detalles}
                </p>

                <section className="project-proof-panel mb-5" aria-label={t('projects.proof.title')}>
                  <h4 className="project-proof-title">{t('projects.proof.title')}</h4>
                  <div className="project-proof-grid" role="list">
                    <div className="project-proof-item" role="listitem">
                      <span className="project-proof-label">{t('projects.proof.role')}</span>
                      <span className="project-proof-value">{proyectoActivo.prueba.rol}</span>
                    </div>
                    <div className="project-proof-item" role="listitem">
                      <span className="project-proof-label">{t('projects.proof.scope')}</span>
                      <span className="project-proof-value">{proyectoActivo.prueba.alcance}</span>
                    </div>
                    <div className="project-proof-item" role="listitem">
                      <span className="project-proof-label">{t('projects.proof.status')}</span>
                      <span className="project-proof-value">{proyectoActivo.prueba.estado}</span>
                    </div>
                  </div>
                </section>

                {/* Tags */}
                <div className="project-tech-group flex flex-wrap gap-2">
                  {proyectoActivo.tecnologias.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  )
}

export default Proyectos
