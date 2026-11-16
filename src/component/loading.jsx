import { useEffect, useState } from 'react';
import '../style/loading.css';

function Loading({ onComplete }) {
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
      aria-label="Loading portfolio"
    >
      <img className="loading-screen__logo" src="/logo-ntep.png" alt="NTEP" />
    </div>
  );
}

export default Loading;