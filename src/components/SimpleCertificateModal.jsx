import { useContext, useEffect, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../LanguageContext';
import { useTranslation } from '../translations';

const SimpleCertificateModal = ({ isOpen, onClose, certificate }) => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset estados cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setIframeLoaded(false);
      setIframeError(false);
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleViewCertificate = () => {
    if (certificate?.type === 'external') {
      window.open(certificate.url, '_blank', 'noopener,noreferrer');
      onClose();
    }
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIframeLoaded(false);
  };

  const openInNewTab = () => {
    window.open(certificate.url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="relative w-full max-w-6xl max-h-[95vh] bg-black border border-green-500/30 rounded-lg shadow-2xl shadow-green-500/10 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-green-500/20 bg-black/50">
              <div className="flex items-center">
                <div className="bg-green-500/10 p-2 rounded-full text-green-500 mr-3">
                  <i className="fas fa-certificate text-lg"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-500 glow-text">
                    {certificate.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{certificate.institution}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={openInNewTab}
                  className="text-gray-400 hover:text-green-500 transition-colors p-2 hover:bg-green-500/10 rounded-full"
                  title={t('certificateModal.openInNewTab')}
                >
                  <i className="fas fa-external-link-alt"></i>
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-green-500/10 rounded-full"
                  aria-label={t('certificateModal.close')}
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {certificate.type === 'external' ? (
                <div className="text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-4">
                      <i className="fas fa-external-link-alt text-green-500 text-2xl"></i>
                    </div>
                    <h4 className="text-xl text-white mb-2">{t('certificateModal.external')}</h4>
                    <p className="text-gray-400 mb-6">
                      {t('certificateModal.externalDescription')}
                    </p>
                  </div>
                  <button
                    onClick={handleViewCertificate}
                    className="bg-green-500 text-black px-6 py-3 rounded-md hover:bg-green-400 transition-all duration-300 font-medium inline-flex items-center"
                  >
                    <i className="fas fa-external-link-alt mr-2"></i>
                    {t('certificateModal.viewCertificate')}
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  {/* Información y controles */}
                  <div className="flex justify-between items-center mb-4 p-3 bg-black/50 rounded-md border border-green-500/20">
                    <div className="text-sm text-gray-400">
                      <i className={`fas ${certificate.type === 'pdf' ? 'fa-file-pdf' : 'fa-certificate'} mr-2 text-green-500`}></i>
                      {certificate.type === 'pdf' ? t('certificateModal.certificatePdf') : t('certificateModal.certificateDigital')}
                    </div>
                    <button
                      onClick={openInNewTab}
                      className="bg-green-500/20 text-green-500 px-3 py-1 rounded-md hover:bg-green-500/30 transition-all duration-300 text-sm inline-flex items-center"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      {t('certificateModal.openInNewTab')}
                    </button>
                  </div>

                  {/* Visor del PDF */}
                  <div className="relative w-full h-[70vh] bg-gray-900/50 rounded-md border border-green-500/20">
                    {/* Loading state */}
                    {!iframeLoaded && !iframeError && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900/80">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
                          <p className="text-gray-400">{t('certificateModal.loading')}</p>
                        </div>
                      </div>
                    )}

                    {/* Error state */}
                    {iframeError && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900/90">
                        <div className="text-center">
                          <div className="text-yellow-500 text-4xl mb-4">
                            <i className="fas fa-exclamation-triangle"></i>
                          </div>
                          <p className="text-yellow-400 mb-2">{t('certificateModal.errorTitle')}</p>
                          <p className="text-gray-400 text-sm mb-4">
                            {certificate.type === 'pdf' 
                              ? t('certificateModal.errorPdf')
                              : t('certificateModal.errorGeneral')}
                          </p>
                          <button
                            onClick={openInNewTab}
                            className="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-400 transition-all duration-300 inline-flex items-center"
                          >
                            <i className="fas fa-external-link-alt mr-2"></i>
                            {t('certificateModal.openInNewTabShort')}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Iframe */}
                    <iframe
                      src={certificate.url}
                      className="w-full h-full rounded-md"
                      title={`Certificado - ${certificate.title}`}
                      onLoad={handleIframeLoad}
                      onError={handleIframeError}
                      style={{ 
                        opacity: iframeLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-green-500/20 bg-black/30 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                <i className="fas fa-info-circle mr-2"></i>
                {t('certificateModal.pressEsc')} <kbd className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs">ESC</kbd> {t('certificateModal.toClose')}
              </div>
              <button
                onClick={onClose}
                className="bg-black text-green-500 border border-green-500 px-4 py-2 rounded-md hover:bg-green-500/10 transition-all duration-300"
              >
                {t('certificateModal.close')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SimpleCertificateModal;
