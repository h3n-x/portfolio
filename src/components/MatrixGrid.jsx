import React, { useEffect } from 'react';

const MatrixGrid = () => {
  useEffect(() => {
    const createGrid = () => {
      const grid = document.querySelector('.matrix-grid');
      if (!grid) return;
      
      grid.innerHTML = '';
      
      const gridSize = 40;
      const numRows = Math.ceil(window.innerHeight / gridSize);
      const numCols = Math.ceil(window.innerWidth / gridSize);
      
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          const gridItem = document.createElement('div');
          gridItem.className = 'matrix-grid-item';
          gridItem.style.top = `${i * gridSize}px`;
          gridItem.style.left = `${j * gridSize}px`;
          gridItem.style.width = `${gridSize}px`;
          gridItem.style.height = `${gridSize}px`;
          
          // Añadir líneas de grid con opacidad aleatoria
          gridItem.style.borderColor = `rgba(34, 197, 94, ${Math.random() * 0.1})`;
          
          grid.appendChild(gridItem);
        }
      }
    };
    
    createGrid();
    window.addEventListener('resize', createGrid);
    
    return () => {
      window.removeEventListener('resize', createGrid);
    };
  }, []);

  return <div className="matrix-grid"></div>;
};

export default MatrixGrid;
