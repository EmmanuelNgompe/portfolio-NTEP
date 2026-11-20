import { useEffect, useState } from 'react';
import '../style/loading.css';
import { useLanguage } from '../i18n/LanguageContext';

function Loading({ onComplete }) {
  const { t } = useLanguage();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsExiting(true), 2000);
    const completeTimer = window.setTimeout(() => onComplete(false), 2600);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`loading-screen${isExiting ? ' loading-screen--exiting' : ''}`}
      role="status"
      aria-label={t('loading.status')}
    >
      <img
        className="loading-screen__logo"
        src="/logo-ntep.png"
        alt={t('loading.logoAlt')}
        width="1086"
        height="362"
        loading="eager"
      />
    </div>
  );
}

export default Loading;