import { memo } from 'react';

const SkeletonLoader = memo(({ type = 'text', className = '' }) => {
  const baseClasses = 'animate-pulse bg-gray-800 rounded';
  
  const variants = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    card: 'h-64 w-full',
    avatar: 'h-16 w-16 rounded-full',
    button: 'h-10 w-32',
    image: 'h-48 w-full',
    paragraph: 'space-y-2'
  };
  
  if (type === 'paragraph') {
    return (
      <div className={`${variants[type]} ${className}`}>
        <div className={`${baseClasses} h-4 w-full`}></div>
        <div className={`${baseClasses} h-4 w-5/6`}></div>
        <div className={`${baseClasses} h-4 w-4/6`}></div>
      </div>
    );
  }
  
  if (type === 'tech-card') {
    return (
      <div className={`bg-black p-6 rounded-lg border border-gray-800 ${className}`}>
        <div className={`${baseClasses} h-16 w-16 rounded-full mx-auto mb-4`}></div>
        <div className={`${baseClasses} h-4 w-3/4 mx-auto mb-2`}></div>
        <div className={`${baseClasses} h-3 w-full`}></div>
      </div>
    );
  }
  
  if (type === 'project-card') {
    return (
      <div className={`bg-black rounded-lg overflow-hidden border border-gray-800 ${className}`}>
        <div className={`${baseClasses} h-48 w-full`}></div>
        <div className="p-4">
          <div className={`${baseClasses} h-6 w-3/4 mb-2`}></div>
          <div className={`${baseClasses} h-4 w-full mb-2`}></div>
          <div className={`${baseClasses} h-4 w-5/6 mb-4`}></div>
          <div className="flex gap-2">
            <div className={`${baseClasses} h-6 w-16 rounded-full`}></div>
            <div className={`${baseClasses} h-6 w-16 rounded-full`}></div>
            <div className={`${baseClasses} h-6 w-16 rounded-full`}></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${baseClasses} ${variants[type]} ${className}`}></div>
  );
});

SkeletonLoader.displayName = 'SkeletonLoader';

export default SkeletonLoader;
