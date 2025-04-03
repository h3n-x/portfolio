import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button 
      onClick={toggleLanguage}
      className="language-toggle"
      aria-label={language === 'es' ? "Switch to English" : "Cambiar a Español"}
    >
      {language === 'es' ? 'EN' : 'ES'}
    </button>
  );
};

export default LanguageToggle;
