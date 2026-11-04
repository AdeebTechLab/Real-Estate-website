if (typeof window !== 'undefined') {
  try {
    let _f = window.fetch ? window.fetch.bind(window) : undefined;
    Object.defineProperty(window, 'fetch', {
      get() {
        return _f;
      },
      set(val) {
        _f = val;
      },
      configurable: true,
      enumerable: true
    });
  } catch (e) {}
}

import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(<App />);
