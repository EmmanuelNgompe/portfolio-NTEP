import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from './en';
import fr from './fr';

const LanguageContext = createContext(null);

const dictionaries = { en, fr };

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const savedLanguage = window.localStorage.getItem('lang');
      if (savedLanguage === 'en' || savedLanguage === 'fr') {
        return savedLanguage;
      }
    } catch (error) {
      // The default English language remains usable when storage is restricted.
    }

    return 'en';
  });

  useEffect(() => {
    const dictionary = dictionaries[language];
    document.documentElement.lang = language;
    document.title = dictionary['meta.title'];

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', dictionary['meta.description']);

    document.querySelector('meta[property="og:title"]')
      ?.setAttribute('content', dictionary['meta.title']);
    document.querySelector('meta[property="og:description"]')
      ?.setAttribute('content', dictionary['meta.description']);
    document.querySelector('meta[property="og:locale"]')
      ?.setAttribute('content', language === 'fr' ? 'fr_FR' : 'en_US');

    try {
      window.localStorage.setItem('lang', language);
    } catch (error) {
      // The language still applies for this page view when storage is restricted.
    }
  }, [language]);

  const value = useMemo(() => {
    const t = (key) => dictionaries[language][key] ?? key;
    const toggleLanguage = () => {
      setLanguageState((currentLanguage) => (currentLanguage === 'en' ? 'fr' : 'en'));
    };

    return { language, setLanguage: setLanguageState, toggleLanguage, t };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}

export const languageDictionaries = dictionaries;
