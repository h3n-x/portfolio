import { useContext, memo } from 'react';
import { LanguageContext } from '../LanguageContext';
import { useTranslation } from '../translations';

const SobreMi = memo(() => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  
  return (
    <section 
      id="sobre-mí" 
      className="py-20 bg-black"
      aria-labelledby="sobre-mi-title"
    >
      <div className="container">
        <h2 
          id="sobre-mi-title"
          className="text-3xl md:text-4xl font-bold mb-12 text-white code-title"
        >
          <span className="title-arrow"></span>
          {t('about.title')}
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-200 mb-6 animate-on-scroll leading-relaxed">
            {t('about.description')}
          </p>
          <p className="text-gray-200 animate-on-scroll leading-relaxed">
            {t('about.interests')}
          </p>
        </div>
      </div>
    </section>
  );
});

SobreMi.displayName = 'SobreMi';

export default SobreMi; 