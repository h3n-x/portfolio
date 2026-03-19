import { useContext } from 'react'
import { LanguageContext } from './LanguageContext'

const LanguageToggle = () => {
  const { language, toggleLanguage } = useContext(LanguageContext)

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200"
      style={{
        color: 'var(--text-muted)',
        border: '1px solid var(--border-default)',
        background: 'transparent',
        letterSpacing: '0.08em',
        minHeight: '32px',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,183,3,0.4)'
        e.currentTarget.style.color = 'var(--accent)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-default)'
        e.currentTarget.style.color = 'var(--text-muted)'
      }}
      aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {language === 'es' ? 'EN' : 'ES'}
    </button>
  )
}

export default LanguageToggle
