import { useState, memo } from 'react';

const Tooltip = memo(({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };
  
  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-900',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-900'
  };
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && content && (
        <div
          className={`absolute z-50 ${positionClasses[position]} pointer-events-none`}
          role="tooltip"
        >
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-green-500/20">
            {content}
            <div 
              className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}
              style={{
                borderTopWidth: position === 'bottom' ? '0' : '4px',
                borderBottomWidth: position === 'top' ? '0' : '4px',
                borderLeftWidth: position === 'right' ? '0' : '4px',
                borderRightWidth: position === 'left' ? '0' : '4px'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
