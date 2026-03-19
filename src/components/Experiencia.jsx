import { useContext, memo } from 'react'
import { m as motion } from 'framer-motion'
import { LanguageContext } from '../LanguageContext'
import { useTranslation } from '../translations'

const sectionBackgroundStyle = { background: 'var(--bg-primary)' }
const timelineJobTitleStyle = {
  fontSize: 'var(--text-lg)',
  color: 'var(--text-primary)',
  letterSpacing: '-0.01em',
}
const experiencePeriodBadgeStyle = {
  background: 'rgba(255,183,3,0.08)',
  border: '1px solid rgba(255,183,3,0.18)',
  color: 'var(--accent)',
}
const experienceDescriptionStyle = {
  color: 'var(--text-secondary)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-sm)',
}
const achievementListItemStyle = {
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-body)',
}
const achievementBulletStyle = {
  color: 'var(--accent)',
  marginTop: '0.1em',
  flexShrink: 0,
}

const Experiencia = memo(() => {
  const { language } = useContext(LanguageContext)
  const { t } = useTranslation(language)

  const experiencias = [
    {
      puesto: t('experience.selfTaught.title'),
      periodo: '2023 – actualidad',
      descripcion: t('experience.selfTaught.description'),
      logros: t('experience.selfTaught.achievements'),
      tags: ['Python', 'Flask', 'Linux', 'Supabase'],
    },
    {
      puesto: t('experience.openSource.title'),
      periodo: '2022 – actualidad',
      descripcion: t('experience.openSource.description'),
      logros: t('experience.openSource.achievements'),
      tags: ['OpenSource', 'GitHub', 'React', 'Vite'],
    },
  ]

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }

  const item = {
    hidden:   { opacity: 0, x: -20 },
    visible:  { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="experiencia"
      className="section section-reveal overflow-hidden"
      style={sectionBackgroundStyle}
      aria-labelledby="experiencia-title"
    >
      <div aria-hidden="true" className="ambient-glow ambient-glow-bl" />
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 id="experiencia-title" className="section-title">{t('experience.title')}</h2>
          <hr className="section-divider" />
        </motion.div>

        <motion.div
          className="relative pl-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Amber vertical line */}
          <div className="timeline-line" />

          {experiencias.map((exp, index) => (
            <motion.div
              key={index}
              className="mb-12 relative"
              variants={item}
            >
              {/* Amber dot */}
              <div className="timeline-dot" />

              <div className="card-base card-timeline-hover p-6 ml-4">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <h3
                    className="font-display font-semibold"
                    style={timelineJobTitleStyle}
                  >
                    {exp.puesto}
                  </h3>
                  <span
                    className="shrink-0 px-3 py-1 rounded font-mono text-xs"
                    style={experiencePeriodBadgeStyle}
                  >
                    {exp.periodo}
                  </span>
                </div>

                <p
                  className="mb-5 leading-relaxed"
                  style={experienceDescriptionStyle}
                >
                  {exp.descripcion}
                </p>

                {/* Achievements */}
                <ul className="space-y-2 mb-5">
                  {exp.logros.map((logro, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm group/item"
                      style={achievementListItemStyle}
                    >
                      <span className="transition-colors duration-200 group-hover/item:text-amber-500" style={achievementBulletStyle}>→</span>
                      <span>{logro}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, i) => (
                    <span key={i} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
})

Experiencia.displayName = 'Experiencia'
export default Experiencia
