import { useContext, memo, useState, useCallback, useRef } from 'react'
import { Mail, Check, Github, MapPin, ChevronDown } from 'lucide-react'
import { m as motion } from 'framer-motion'
import { LanguageContext } from '../LanguageContext'
import { useTranslation } from '../translations'

const heroNameStyle = {
  fontSize: 'clamp(3.5rem, 7.5vw, 6.5rem)',
  letterSpacing: '-0.03em',
  color: 'var(--text-primary)',
}

const heroTaglineStyle = {
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-body)',
  fontSize: '17px',
  lineHeight: '1.75',
  maxWidth: '480px',
}

const heroCopiedTooltipStyle = { background: 'var(--accent)', color: '#0A0A0A', fontWeight: 600 }

const snippetWrapperStyle = {
  position: 'relative',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderLeft: '3px solid rgba(255,183,3,0.35)',
  borderRadius: '12px',
  padding: '28px 28px 28px 32px',
}

const snippetCodeStyle = {
  margin: 0,
  padding: 0,
  fontFamily: 'var(--font-mono)',
  fontSize: '13.5px',
  lineHeight: '2',
  overflow: 'hidden',
  whiteSpace: 'pre',
  background: 'none',
}

const metricCardStyle = {
  background: '#111113',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '10px',
  padding: '16px 12px',
  textAlign: 'center',
}

const METRICS = [
  { value: '3', labelEs: 'proyectos en producción', labelEn: 'projects in production' },
  { value: '100%', labelEs: 'open source', labelEn: 'open source' },
  { value: '3+', labelEs: 'años de experiencia', labelEn: 'years of experience' },
]

const HeroComponent = () => {
  const { language } = useContext(LanguageContext)
  const { t } = useTranslation(language)
  const [emailCopied, setEmailCopied] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [btn1Pos, setBtn1Pos] = useState({ x: 0, y: 0 })
  const [btn2Pos, setBtn2Pos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)
  const btn1Ref = useRef(null)
  const btn2Ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const makeMagneticHandler = (setPos) => (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({ x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 })
  }
  const resetMagnetic = (setPos) => () => setPos({ x: 0, y: 0 })

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

  const rightVariants = {
    hidden:  { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="hero-section relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
      aria-label="Hero"
    >
      {/* Aurora animated background */}
      <div aria-hidden="true" className="aurora-bg pointer-events-none absolute inset-0 z-0" />

      {/* Mouse-tracking glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,183,3,0.09) 0%, transparent 65%)`,
          transition: 'background 0.1s ease',
        }}
      />

      {/* Ambient glow — right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0"
        style={{
          top: '10%',
          right: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,183,3,0.09) 0%, rgba(255,183,3,0.03) 40%, transparent 70%)',
        }}
      />

      {/* Grid layout: left text + right visual */}
      <div className="container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left column ── */}
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 1. Status badge */}
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

            {/* 2. Eyebrow + Name (grouped) */}
            <motion.div variants={itemVariants}>
              <p
                className="flex items-center gap-3 font-mono text-xs uppercase mb-4"
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
                className="font-display font-extrabold leading-[0.95]"
                style={heroNameStyle}
              >
                <span className="block">Henry</span>
                <span className="block gradient-text-amber">Pacheco</span>
              </h1>
            </motion.div>

            {/* 3. Divider */}
            <motion.div
              variants={itemVariants}
              aria-hidden="true"
              style={{ width: '100px', height: '2px', background: 'var(--accent)', opacity: 0.5, borderRadius: '1px' }}
            />

            {/* 4. Description */}
            <motion.p variants={itemVariants} style={heroTaglineStyle}>
              {t('hero.tagline')}
            </motion.p>

            {/* 5. Location */}
            <motion.span
              variants={itemVariants}
              className="flex items-center gap-1.5 text-sm"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
            >
              <MapPin size={13} style={{ color: 'var(--accent)' }} aria-hidden="true" />
              {t('hero.location')}
            </motion.span>

            {/* 6. CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <button
                ref={btn1Ref}
                onClick={copyEmail}
                className="btn-amber relative"
                aria-label={language === 'es' ? 'Copiar email de contacto' : 'Copy contact email'}
                onMouseMove={makeMagneticHandler(setBtn1Pos)}
                onMouseLeave={() => { resetMagnetic(setBtn1Pos)() }}
                style={{ transform: `translate(${btn1Pos.x}px, ${btn1Pos.y}px)`, transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)' }}
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
                ref={btn2Ref}
                href="https://github.com/h3n-x"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-amber"
                aria-label="GitHub"
                onMouseMove={makeMagneticHandler(setBtn2Pos)}
                onMouseLeave={() => { resetMagnetic(setBtn2Pos)() }}
                style={{ transform: `translate(${btn2Pos.x}px, ${btn2Pos.y}px)`, transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)' }}
              >
                <Github size={14} aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right column — code snippet + metrics ── */}
          <motion.div
            className="hidden lg:flex flex-col gap-7"
            variants={rightVariants}
            initial="hidden"
            animate="visible"
            aria-hidden="true"
          >
            {/* Code snippet — inline, no window chrome */}
            <div style={snippetWrapperStyle}>
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '16px',
                  fontSize: '11px',
                  color: '#3F3F46',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                }}
              >
                api.py
              </span>
              <pre style={snippetCodeStyle}>
                <code>
                  <span style={{ color: '#5C6370', fontStyle: 'italic' }}># Endpoint con autenticación JWT</span>{'\n'}
                  <span style={{ color: '#61AFEF' }}>@app.route</span>
                  <span style={{ color: '#ABB2BF' }}>(</span>
                  <span style={{ color: '#98C379' }}>{`'/api/v1/users'`}</span>
                  <span style={{ color: '#ABB2BF' }}>, methods=[</span>
                  <span style={{ color: '#98C379' }}>{`'GET'`}</span>
                  <span style={{ color: '#ABB2BF' }}>, </span>
                  <span style={{ color: '#98C379' }}>{`'POST'`}</span>
                  <span style={{ color: '#ABB2BF' }}>])</span>{'\n'}
                  <span style={{ color: '#C678DD' }}>def </span>
                  <span style={{ color: '#61AFEF' }}>users</span>
                  <span style={{ color: '#ABB2BF' }}>():</span>{'\n'}
                  <span style={{ color: '#ABB2BF' }}>    auth = </span>
                  <span style={{ color: '#61AFEF' }}>verify_token</span>
                  <span style={{ color: '#ABB2BF' }}>(request)</span>{'\n'}
                  <span style={{ color: '#C678DD' }}>    if not </span>
                  <span style={{ color: '#ABB2BF' }}>auth:</span>{'\n'}
                  <span style={{ color: '#C678DD' }}>        return </span>
                  <span style={{ color: '#61AFEF' }}>jsonify</span>
                  <span style={{ color: '#ABB2BF' }}>(</span>
                  <span style={{ color: '#98C379' }}>{`'Unauthorized'`}</span>
                  <span style={{ color: '#ABB2BF' }}>{`), `}</span>
                  <span style={{ color: '#D19A66' }}>401</span>{'\n'}
                  <span style={{ color: '#C678DD' }}>    return </span>
                  <span style={{ color: '#61AFEF' }}>jsonify</span>
                  <span style={{ color: '#ABB2BF' }}>(</span>
                  <span style={{ color: '#61AFEF' }}>get_users</span>
                  <span style={{ color: '#ABB2BF' }}>())</span>
                </code>
              </pre>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3">
              {METRICS.map((m) => (
                <div key={m.value} className="flex flex-col items-center gap-1" style={metricCardStyle}>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent)', lineHeight: 1, fontFamily: 'var(--font-display)' }}>
                    {m.value}
                  </span>
                  <span style={{ fontSize: '10px', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)', lineHeight: '1.3' }}>
                    {language === 'es' ? m.labelEs : m.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.a
          href="#sobre-mí"
          className="flex flex-col items-center gap-1 font-mono no-underline"
          style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
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
