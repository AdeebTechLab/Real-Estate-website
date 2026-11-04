import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const RouterContext = createContext(null);

export function RouterProvider({ children, initialPath = window.location.pathname + window.location.search }) {
  const [currentUrl, setCurrentUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return initialPath;
  });

  const [routeParams, setRouteParams] = useState({});

  useEffect(() => {
    const handlePopState = () => {
      setCurrentUrl(window.location.pathname + window.location.search);
    };

    const handleCustomNavigate = (e) => {
      if (e.detail?.url) {
        setCurrentUrl(e.detail.url);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('estatepro:navigate', handleCustomNavigate);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('estatepro:navigate', handleCustomNavigate);
    };
  }, []);

  const push = useCallback((url) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', url);
      setCurrentUrl(url);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('estatepro:navigate', { detail: { url } }));
    }
  }, []);

  const replace = useCallback((url) => {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', url);
      setCurrentUrl(url);
      window.dispatchEvent(new CustomEvent('estatepro:navigate', { detail: { url } }));
    }
  }, []);

  const back = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }, []);

  const forward = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.forward();
    }
  }, []);

  const refresh = useCallback(() => {
    setCurrentUrl(window.location.pathname + window.location.search);
  }, []);

  const pathname = useMemo(() => {
    const [path] = currentUrl.split('?');
    return path || '/';
  }, [currentUrl]);

  const searchParams = useMemo(() => {
    const [, search] = currentUrl.split('?');
    return new URLSearchParams(search || '');
  }, [currentUrl]);

  const value = useMemo(() => ({
    pathname,
    searchParams,
    params: routeParams,
    setRouteParams,
    push,
    replace,
    back,
    forward,
    refresh
  }), [pathname, searchParams, routeParams, push, replace, back, forward, refresh]);

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    return {
      push: (url) => { window.location.href = url; },
      replace: (url) => { window.location.replace(url); },
      back: () => { window.history.back(); },
      forward: () => { window.history.forward(); },
      refresh: () => { window.location.reload(); }
    };
  }
  return {
    push: ctx.push,
    replace: ctx.replace,
    back: ctx.back,
    forward: ctx.forward,
    refresh: ctx.refresh
  };
}

export function usePathname() {
  const ctx = useContext(RouterContext);
  return ctx ? ctx.pathname : (typeof window !== 'undefined' ? window.location.pathname : '/');
}

export function useSearchParams() {
  const ctx = useContext(RouterContext);
  return ctx ? ctx.searchParams : (typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams());
}

export function useParams() {
  const ctx = useContext(RouterContext);
  if (ctx) {
    if (ctx.params && Object.keys(ctx.params).length > 0) {
      return ctx.params;
    }
    // Fallback sync extraction from current pathname
    const propMatch = ctx.pathname.match(/^\/properties\/([^/?#]+)/);
    if (propMatch) {
      return { id: decodeURIComponent(propMatch[1]) };
    }
    const agentMatch = ctx.pathname.match(/^\/agents\/([^/?#]+)/);
    if (agentMatch) {
      return { id: decodeURIComponent(agentMatch[1]) };
    }
  }
  return {};
}

export function redirect(url) {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
}
