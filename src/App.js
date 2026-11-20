import { useEffect, useState } from 'react';
import SiteRoutes from './routes/routes';
import Loading from './component/loading';
import { LanguageProvider } from './i18n/LanguageContext';

const LOADING_SESSION_KEY = 'ntep-loading-seen';

function App() {
  const [isLoadingVisible, setIsLoadingVisible] = useState(
    () => sessionStorage.getItem(LOADING_SESSION_KEY) !== 'true'
  );

  useEffect(() => {
    if (isLoadingVisible) {
      sessionStorage.setItem(LOADING_SESSION_KEY, 'true');
    }
  }, [isLoadingVisible]);

  return (
    <LanguageProvider>
      <SiteRoutes />
      {isLoadingVisible && <Loading onComplete={setIsLoadingVisible} />}
    </LanguageProvider>
  );
}

export default App;
