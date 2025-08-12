import { memo, useEffect, useState } from 'react';
import { useTranslation } from '../translations';

const NotFound = memo(() => {
  const { t } = useTranslation('es'); // Default a español
  const [randomCode, setRandomCode] = useState('');
  
  useEffect(() => {
    // Generar código Matrix aleatorio
    const generateMatrixCode = () => {
      const chars = '01110010011100100110010110011010';
      return chars.split('').map(() => Math.random() > 0.5 ? '1' : '0').join('');
    };
    
    const interval = setInterval(() => {
      setRandomCode(generateMatrixCode());
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Matrix background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-grid"></div>
      </div>
      
      {/* Floating matrix code */}
      <div className="absolute top-20 left-10 text-green-500/30 font-mono text-xs animate-pulse">
        {randomCode.slice(0, 8)}
      </div>
      <div className="absolute top-40 right-20 text-green-500/30 font-mono text-xs animate-pulse">
        {randomCode.slice(8, 16)}
      </div>
      <div className="absolute bottom-40 left-20 text-green-500/30 font-mono text-xs animate-pulse">
        {randomCode.slice(16, 24)}
      </div>
      
      <div className="text-center relative z-10 max-w-2xl mx-auto">
        {/* Error 404 con estilo cyberpunk */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-green-500 mb-4 glitch" data-text="404">
            404
          </div>
          <div className="text-2xl md:text-3xl text-red-500 mb-2 animate-pulse">
            ACCESO DENEGADO
          </div>
          <div className="text-green-500 font-mono text-sm">
            [ERROR] Página no encontrada en el sistema
          </div>
        </div>
        
        {/* Terminal style message */}
        <div className="bg-black/80 border border-green-500/30 rounded-lg p-6 mb-8 text-left">
          <div className="text-green-500 font-mono text-sm mb-2">
            <span className="text-red-500">h3n@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$ </span>
            <span className="animate-blink">ls -la /404</span>
          </div>
          <div className="text-gray-300 font-mono text-sm space-y-1">
            <div>total 0</div>
            <div>drwxr-xr-x  2 h3n  h3n   64 {new Date().toLocaleDateString()} .</div>
            <div>drwxr-xr-x  3 h3n  h3n   96 {new Date().toLocaleDateString()} ..</div>
            <div className="text-red-500">-rw-r--r--  1 h3n  h3n    0 {new Date().toLocaleDateString()} void.null</div>
          </div>
          <div className="text-green-500 font-mono text-sm mt-4">
            <span className="text-red-500">h3n@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$ </span>
            <span>echo "La página que buscas se perdió en el ciberespacio..."</span>
          </div>
        </div>
        
        {/* Navigation options */}
        <div className="space-y-4">
          <p className="text-gray-300 text-lg mb-6">
            Parece que te has perdido en el <span className="text-green-500">ciberespacio</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={goHome}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 group font-medium"
            >
              <i className="fas fa-home mr-2 group-hover:scale-110 transition-transform"></i>
              Volver al Inicio
            </button>
            
            <button 
              onClick={() => window.history.back()}
              className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-6 py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 group font-medium"
            >
              <i className="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
              Página Anterior
            </button>
          </div>
          
          {/* Easter egg */}
          <div className="mt-8 text-xs text-gray-500 font-mono">
            <div>Sistema operativo: Arch Linux</div>
            <div>Terminal: ZSH</div>
            <div>Editor: Vim</div>
            <div className="text-green-500">Status: Hackeando la Matrix... 🤖</div>
          </div>
        </div>
      </div>
      
      {/* Animated border */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-500 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-500 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
});

NotFound.displayName = 'NotFound';

export default NotFound;
