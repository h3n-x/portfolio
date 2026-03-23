import { useContext, memo, useState } from 'react'
import { Mail, Check, Github, MapPin, ChevronDown } from 'lucide-react'
import { m as motion, useReducedMotion } from 'framer-motion'
import { LanguageContext } from '../language-context'
import { useTranslation } from '../translations'

const heroNameStyle = {
  fontSize: 'clamp(3.5rem, 10vw, 8rem)',
  letterSpacing: '-0.03em',
  color: 'var(--text-primary)',
}

const heroTaglineStyle = {
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-body)',
  fontSize: 'clamp(1rem, 1.1vw, 1.2rem)',
  lineHeight: '1.75',
  maxWidth: '780px',
}

const heroCopiedTooltipStyle = { background: 'var(--accent)', color: '#0A0A0A', fontWeight: 600 }

const HeroComponent = () => {
  const { language } = useContext(LanguageContext)
  const { t } = useTranslation(language)
  const prefersReducedMotion = useReducedMotion()
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('h3n.eth@gmail.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch { /* clipboard fallback */ }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.05, staggerChildren: 0.06 },
    },
  }

  const itemVariants = {
    hidden:  { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="home"
      className="hero-section relative min-h-screen overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
      aria-label="Hero"
    >
      {/* Subtle amber glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0"
        style={{
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '680px',
          height: '680px',
          background: 'radial-gradient(circle, rgba(255,183,3,0.08) 0%, rgba(255,183,3,0.02) 45%, transparent 72%)',
        }}
      />

      <div className="container relative z-10 w-full">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-between px-2 py-10 text-center sm:px-4 md:py-12 lg:py-16">
          <motion.div
            className="flex w-full flex-1 flex-col items-center justify-center gap-5 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-mono"
                style={{
                  background: 'rgba(39,201,63,0.08)',
                  border: '1px solid rgba(39,201,63,0.20)',
                  color: '#27C93F',
                }}
              >
                <span className="relative flex h-[7px] w-[7px]">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: '#27C93F', animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }}
                  />
                  <span className="relative inline-flex rounded-full h-[7px] w-[7px]" style={{ background: '#27C93F' }} />
                </span>
                {t('hero.availableForWork')}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p
                className="flex items-center justify-center gap-3 font-mono text-xs uppercase mb-4"
                style={{ color: '#6B7280', letterSpacing: '0.18em' }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block"
                  style={{ width: '32px', height: '1px', background: 'var(--accent)', opacity: 0.6 }}
                />
                Backend Developer · Python · Linux
              </p>
              <h1
                className="font-display font-extrabold leading-[0.92]"
                style={heroNameStyle}
              >
                <span className="block">Henry</span>
                <span className="block gradient-text-amber">Pacheco</span>
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              aria-hidden="true"
              style={{ width: '100px', height: '2px', background: 'var(--accent)', opacity: 0.5, borderRadius: '1px' }}
            />

            <motion.p variants={itemVariants} style={heroTaglineStyle}>
              {t('hero.tagline')}
            </motion.p>

            <motion.span
              variants={itemVariants}
              className="flex items-center gap-1.5 text-sm justify-center"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
            >
              <MapPin size={13} style={{ color: 'var(--accent)' }} aria-hidden="true" />
              {t('hero.location')}
            </motion.span>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <button
                onClick={copyEmail}
                className="btn-amber relative"
                aria-label={language === 'es' ? 'Copiar email de contacto' : 'Copy contact email'}
              >
                {emailCopied ? <Check size={14} aria-hidden="true" /> : <Mail size={14} aria-hidden="true" />}
                <span>
                  {emailCopied
                    ? (language === 'es' ? '¡Copiado!' : 'Copied!')
                    : t('hero.contactMe')}
                </span>
                {emailCopied && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded text-xs whitespace-nowrap z-10 font-mono"
                    style={heroCopiedTooltipStyle}
                  >
                    h3n.eth@gmail.com
                  </motion.div>
                )}
              </button>

              <a
                href="https://github.com/h3n-x"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-amber"
                aria-label="GitHub"
              >
                <Github size={14} aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.a
          href="#sobre-mí"
          className="flex flex-col items-center gap-1 font-mono no-underline"
          style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          aria-label="Scroll down"
        >
          <span className="text-[11px] uppercase tracking-[0.1em]">Scroll</span>
          <ChevronDown size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  )
}

const Hero = memo(HeroComponent)
Hero.displayName = 'Hero'
export default Hero
