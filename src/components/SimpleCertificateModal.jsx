import { useContext, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Award, X, ExternalLink } from 'lucide-react'
import { m as motion, AnimatePresence } from 'framer-motion'
import { LanguageContext } from '../language-context'
import { useTranslation } from '../translations'

const SimpleCertificateModal = ({ isOpen, onClose, certificate }) => {
  const { language } = useContext(LanguageContext)
  const { t } = useTranslation(language)
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)
  const scrollYRef = useRef(0)

  const handleClose = useCallback(() => onClose(), [onClose])

  useEffect(() => {
    if (!isOpen) return

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

    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose()
    }

    const handleTab = (e) => {
      if (e.key !== 'Tab' || !modalRef.current) return
      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleTab)

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true })
    })

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTab)
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
  }, [isOpen, handleClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  const handleViewCertificate = () => {
    window.open(certificate.url, '_blank', 'noopener,noreferrer')
    handleClose()
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(certificate.url)
    } catch {
      // noop
    }
  }

  if (!certificate) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-lg max-h-[90vh] rounded-xl overflow-hidden flex flex-col"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
            }}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-5"
              style={{ borderBottom: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-full"
                  style={{ background: 'var(--accent-dim)' }}
                >
                  <Award size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                </div>
                <div>
                  <h3
                    id="cert-modal-title"
                    className="font-display font-semibold"
                    style={{ fontSize: 'var(--text-lg)', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                  >
                    {certificate.title}
                  </h3>
                  <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                    {certificate.institution}
                  </p>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                style={{
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-default)',
                  background: 'transparent',
                }}
                aria-label={t('certificateModal.close')}
              >
                <X size={12} aria-hidden="true" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 text-center overflow-y-auto" data-lenis-prevent>
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ background: 'var(--accent-dim)' }}
              >
                <ExternalLink size={20} style={{ color: 'var(--accent)' }} aria-hidden="true" />
              </div>
              <h4
                className="font-display font-semibold mb-2"
                style={{ fontSize: 'var(--text-xl)', color: 'var(--text-primary)' }}
              >
                {t('certificateModal.external')}
              </h4>
              <p className="mb-6" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                {t('certificateModal.externalDescription')}
              </p>
              <p className="mb-4" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                {t('certificateModal.mayRequireLogin')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  onClick={handleViewCertificate}
                  className="btn-amber btn-amber-solid"
                >
                  <ExternalLink size={12} aria-hidden="true" />
                  <span>{t('certificateModal.viewCertificate')}</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="btn-amber"
                >
                  <span>{t('certificateModal.copyLink')}</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 flex justify-between items-center"
              style={{ borderTop: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)' }}
            >
              <div className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {t('certificateModal.pressEsc')}{' '}
                <kbd
                  className="px-1.5 py-0.5 rounded text-xs"
                  style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid rgba(255,183,3,0.18)' }}
                >
                  ESC
                </kbd>{' '}
                {t('certificateModal.toClose')}
              </div>
              <button onClick={handleClose} className="btn-amber text-xs">
                {t('certificateModal.close')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default SimpleCertificateModal
