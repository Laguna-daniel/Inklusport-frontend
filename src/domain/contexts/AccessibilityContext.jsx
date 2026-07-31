import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';

const STORAGE_KEY = 'inklusport-accessibility-settings';

const defaultState = {
  contraste: 'MEDIO',
  notifSonoras: true,
  feedbackHaptico: false,
  tamanoFuente: 50,
};

const AccessibilityContext = createContext(null);

const loadInitialState = () => {
  if (typeof window === 'undefined') return defaultState;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;
    const parsed = JSON.parse(saved);
    return {
      ...defaultState,
      ...parsed,
    };
  } catch (error) {
    console.warn('No se pudo cargar la configuración de accesibilidad:', error);
    return defaultState;
  }
};

const buildTheme = (contraste) => {
  if (contraste === 'ALTO') {
    return {
      bg: '#0f172a',
      text: '#F8FAFC',
      card: '#111827',
      border: '1px solid #374151',
    };
  }

  if (contraste === 'BAJO') {
    return {
      bg: '#F9FAFB',
      text: '#1F2937',
      card: '#FFFFFF',
      border: '1px solid #E5E7EB',
    };
  }

  return {
    bg: '#F5F7FA',
    text: '#111827',
    card: '#FFFFFF',
    border: '1px solid transparent',
  };
};

const getFontSize = (tamanoFuente) => {
  const scale = Math.max(0.75, Math.min(1.5, 1 + (tamanoFuente - 50) / 100));
  return `${16 * scale}px`;
};

export const AccessibilityProvider = ({ children }) => {
  const [state, setState] = useState(loadInitialState);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const theme = buildTheme(state.contraste);
    const fontSize = getFontSize(state.tamanoFuente);
    document.documentElement.style.setProperty('--app-font-size', fontSize);
    document.documentElement.style.setProperty('--app-text-color', theme.text);
    document.documentElement.style.setProperty('--app-bg-color', theme.bg);
    document.documentElement.style.setProperty('--app-card-bg', theme.card);
    document.documentElement.style.setProperty('--app-border-color', theme.border);
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = theme.bg;
      document.body.style.color = theme.text;
    }
  }, [state.contraste, state.tamanoFuente]);

  const setContraste = (contraste) => setState((prev) => ({ ...prev, contraste }));
  const setNotifSonoras = (notifSonoras) => setState((prev) => ({ ...prev, notifSonoras }));
  const setFeedbackHaptico = (feedbackHaptico) => setState((prev) => ({ ...prev, feedbackHaptico }));
  const setTamanoFuente = (tamanoFuente) => setState((prev) => ({ ...prev, tamanoFuente }));

  const value = useMemo(
    () => ({
      contraste: state.contraste,
      notifSonoras: state.notifSonoras,
      feedbackHaptico: state.feedbackHaptico,
      tamanoFuente: state.tamanoFuente,
      setContraste,
      setNotifSonoras,
      setFeedbackHaptico,
      setTamanoFuente,
    }),
    [state]
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility debe usarse dentro de AccessibilityProvider');
  }
  return context;
};

export default AccessibilityContext;
