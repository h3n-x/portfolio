import { useEffect, useState, useRef, memo } from 'react';

const MatrixGrid = memo(() => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef(null);
  const resizeTimerRef = useRef(null);
  const visibilityObserverRef = useRef(null);

  useEffect(() => {
    // Detección inicial de dispositivo
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDeviceType();
    
    // Observer para carga bajo demanda
    if (gridRef.current) {
      visibilityObserverRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setIsVisible(entry.isIntersecting);
          
          if (entry.isIntersecting && !gridRef.current.hasChildNodes()) {
            createGrid();
          }
        },
        { rootMargin: "200px", threshold: 0.1 }
      );
      
      visibilityObserverRef.current.observe(gridRef.current);
    }
    
    // Debounce para el resize
    const handleResize = () => {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      
      resizeTimerRef.current = setTimeout(() => {
        checkDeviceType();
        if (isVisible) {
          createGrid();
        }
      }, 300);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (visibilityObserverRef.current && gridRef.current) {
        visibilityObserverRef.current.unobserve(gridRef.current);
      }
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, [isVisible]);

  const createGrid = () => {
    const grid = gridRef.current;
    if (!grid) return;
    
    // Usar un fragment para mejorar rendimiento de DOM
    const fragment = document.createDocumentFragment();
    
    // Limpiar grid existente
    grid.innerHTML = '';
    
    // Ajustar densidad según dispositivo
    const gridSize = isMobile ? 60 : 40; // Celdas más grandes en móvil = menos celdas
    const skipFactor = isMobile ? 2 : 1; // En móvil, dibuja 1 de cada 2 celdas
    
    const numRows = Math.ceil(window.innerHeight / gridSize);
    const numCols = Math.ceil(window.innerWidth / gridSize);
    
    // Limitar el número total de celdas para dispositivos móviles
    const maxCells = isMobile ? 100 : 500;
    let cellCount = 0;
    
    for (let i = 0; i < numRows; i += skipFactor) {
      for (let j = 0; j < numCols; j += skipFactor) {
        if (cellCount >= maxCells) break;
        
        const gridItem = document.createElement('div');
        gridItem.className = 'matrix-grid-item';
        gridItem.style.top = `${i * gridSize}px`;
        gridItem.style.left = `${j * gridSize}px`;
        gridItem.style.width = `${gridSize}px`;
        gridItem.style.height = `${gridSize}px`;
        
        // Reducir la cantidad de celdas con bordes para ahorrar rendimiento
        const opacity = Math.random();
        if (opacity > 0.3) { // Solo 70% de las celdas tienen borde
          gridItem.style.borderColor = `rgba(34, 197, 94, ${opacity * 0.1})`;
        }
        
        fragment.appendChild(gridItem);
        cellCount++;
      }
      
      if (cellCount >= maxCells) break;
    }
    
    grid.appendChild(fragment);
  };

  return <div className="matrix-grid" ref={gridRef}></div>;
});

MatrixGrid.displayName = 'MatrixGrid';

export default MatrixGrid;
