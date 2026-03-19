import { useContext, memo, useCallback, useState } from 'react'
import { m as motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { LanguageContext } from '../LanguageContext'
import { useTranslation } from '../translations'
import SimpleCertificateModal from './SimpleCertificateModal'

const sectionBackgroundStyle = { background: 'var(--bg-primary)' }
const educationGlassCardStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--border-default)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
}
const educationCardTitleStyle = {
  fontSize: 'var(--text-lg)',
  color: 'var(--text-primary)',
  letterSpacing: '-0.01em',
}
const educationInstitutionStyle = { color: 'var(--text-muted)', letterSpacing: '0.05em' }
const educationPeriodBadgeStyle = {
  background: 'rgba(255,183,3,0.08)',
  border: '1px solid rgba(255,183,3,0.18)',
  color: 'var(--accent)',
}
const educationDescriptionStyle = {
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-sm)',
}

const Formacion = memo(() => {
  const { language } = useContext(LanguageContext)
  const { t } = useTranslation(language)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  const openModal  = (cert) => { setSelectedCertificate(cert); setIsModalOpen(true) }
  const closeModal = ()     => { setIsModalOpen(false); setSelectedCertificate(null) }

  const getFormacion = useCallback(() => [
    {
      institucion: 'Universidad Tecnológica de Bolívar',
      titulo: t('education.computerScience.title'),
      periodo: '2024',
      descripcion: t('education.computerScience.description'),
      certificate: {
        title: t('education.computerScience.title'),
        institution: 'Universidad Tecnológica de Bolívar',
        type: 'external',
        url: 'https://drive.google.com/file/d/1xgriuNThS4Ch-t1sSu0BNe0J7SMdJ4T4/view?usp=sharing',
      },
    },
    {
      institucion: 'Hack4U',
      titulo: t('education.autoDidactic.title'),
      periodo: '2023',
      descripcion: t('education.autoDidactic.description'),
      certificate: {
        title: t('education.autoDidactic.title'),
        institution: 'Hack4U',
        type: 'external',
        url: 'https://drive.google.com/file/d/1zCtMYj73aN_MowW42dUhdIzQh4CuRTBU/view?usp=sharing',
      },
    },
    {
      institucion: 'Alura Latam',
      titulo: t('education.basic.title'),
      periodo: '2023',
      descripcion: t('education.basic.description'),
      certificate: {
        title: t('education.basic.title'),
        institution: 'Alura Latam',
        type: 'external',
        url: 'https://app.aluracursos.com/program/certificate/f4bda55f-ac51-49b4-8c62-91267a88d488',
      },
    },
  ], [t])

  const formacion = getFormacion()

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const item = {
    hidden:   { opacity: 0, y: 20 },
    visible:  (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section
      id="formación"
      className="section section-reveal overflow-hidden"
      style={sectionBackgroundStyle}
      aria-labelledby="formacion-title"
    >
      <div aria-hidden="true" className="ambient-glow ambient-glow-br" />
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 id="formacion-title" className="section-title">{t('education.title')}</h2>
          <hr className="section-divider" />
        </motion.div>

        <motion.div
          className="relative pl-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {/* Amber vertical line */}
          <div className="timeline-line" />

          {formacion.map((edu, index) => (
            <motion.div
              key={index}
              className="mb-10 relative"
              variants={item}
              custom={index}
            >
              {/* Amber dot */}
              <div className="timeline-dot" />

              {/* Glassmorphism card */}
              <div
                className="ml-4 rounded-xl p-6 transition-all duration-300 hover:border-opacity-30"
                style={educationGlassCardStyle}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '-3px 0 16px rgba(255,183,3,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3
                      className="font-display font-semibold mb-1"
                      style={educationCardTitleStyle}
                    >
                      {edu.titulo}
                    </h3>
                    <p
                      className="font-mono text-xs"
                      style={educationInstitutionStyle}
                    >
                      {edu.institucion}
                    </p>
                  </div>
                  <span
                    className="shrink-0 px-3 py-1 rounded font-mono text-xs"
                    style={educationPeriodBadgeStyle}
                  >
                    {edu.periodo}
                  </span>
                </div>

                <p
                  className="mb-5 leading-relaxed line-clamp-2"
                  style={educationDescriptionStyle}
                >
                  {edu.descripcion}
                </p>

                <div className="flex justify-start">
                  <button
                    onClick={() => openModal(edu.certificate)}
                    className="btn-amber text-xs"
                    aria-label={`${t('education.viewCertificate')}: ${edu.titulo}`}
                  >
                    <Award size={12} aria-hidden="true" />
                    <span>{t('education.viewCertificate')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SimpleCertificateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        certificate={selectedCertificate}
      />
    </section>
  )
})

Formacion.displayName = 'Formacion'
export default Formacion
