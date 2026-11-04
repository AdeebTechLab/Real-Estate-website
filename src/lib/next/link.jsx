import React from 'react';
import { useRouter } from './navigation.jsx';

export default function Link({
  href,
  children,
  className = '',
  onClick,
  target,
  rel,
  replace = false,
  scroll = true,
  ...rest
}) {
  const router = useRouter();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }

    // Allow standard browser handling for modifiers or external targets
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      target === '_blank' ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey
    ) {
      return;
    }

    if (typeof href === 'string' && (href.startsWith('/') || href.startsWith('?'))) {
      e.preventDefault();
      if (replace) {
        router.replace(href);
      } else {
        router.push(href);
      }
      if (scroll) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <a
      href={typeof href === 'string' ? href : '#'}
      className={className}
      onClick={handleClick}
      target={target}
      rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
      {...rest}
    >
      {children}
    </a>
  );
}
