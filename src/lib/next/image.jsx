import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

export default function Image({
  src,
  alt = 'EstatePro Property Asset',
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  style = {},
  sizes,
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const containerClasses = fill
    ? `absolute inset-0 w-full h-full object-cover ${className}`
    : className;

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-400 p-4 select-none ${
          fill ? 'absolute inset-0 w-full h-full' : ''
        } ${className}`}
        style={{
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          minHeight: fill ? '100%' : (height || '180px'),
          ...style
        }}
      >
        <Building2 className="w-8 h-8 text-emerald-400/80 mb-2 stroke-[1.5]" />
        <span className="text-xs font-medium text-slate-300 text-center tracking-wide line-clamp-1 max-w-[90%]">
          {alt || 'EstatePro Luxury Listing'}
        </span>
        <span className="text-[10px] text-slate-500 mt-0.5">Verified Listing</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      loading={priority ? 'eager' : 'lazy'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      onLoad={() => setIsLoaded(true)}
      className={`${containerClasses} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-90'
      }`}
      style={{
        ...style,
        ...(fill ? { width: '100%', height: '100%' } : {})
      }}
      {...props}
    />
  );
}
