import { useEffect } from 'react';

const MatrixRain = () => {
  useEffect(() => {
    const createMatrixRain = () => {
      const matrixRain = document.querySelector('.matrix-rain');
      if (!matrixRain) return;
      
      // Limpiar columnas existentes
      matrixRain.innerHTML = '';
      
      const width = window.innerWidth;
      const columnCount = Math.floor(width / 20); // Una columna cada 20px
      
      for (let i = 0; i < columnCount; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 20}px`;
        column.style.animationDuration = `${Math.random() * 5 + 5}s`; // Entre 5 y 10 segundos
        column.style.animationDelay = `${Math.random() * 5}s`; // Retraso aleatorio
        
        // Caracteres aleatorios
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const columnHeight = Math.floor(Math.random() * 15 + 10); // Entre 10 y 25 caracteres
        
        for (let j = 0; j < columnHeight; j++) {
          const char = chars.charAt(Math.floor(Math.random() * chars.length));
          column.innerHTML += char + '<br>';
        }
        
        matrixRain.appendChild(column);
      }
    };
    
    createMatrixRain();
    window.addEventListener('resize', createMatrixRain);
    
    return () => {
      window.removeEventListener('resize', createMatrixRain);
    };
  }, []);
  
  return <div className="matrix-rain"></div>;
};

export default MatrixRain;
