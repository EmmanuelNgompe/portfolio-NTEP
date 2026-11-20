import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Languages, Moon, Sun } from 'lucide-react';
import '../style/menu.css';
import { useLanguage } from '../i18n/LanguageContext';

const navigationLinks = [
    { labelKey: 'menu.home', to: '/' },
    { labelKey: 'menu.projects', to: '/project' },
    { labelKey: 'menu.about', to: '/about' },
    { labelKey: 'menu.offers', to: '/offers' },
];

function Menu() {
    const { language, toggleLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(() =>
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    );
    const menuButtonRef = useRef(null);
    const closeButtonRef = useRef(null);
    const overlayRef = useRef(null);
    const themeTransitionTimerRef = useRef(null);

    function toggleTheme() {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        const root = document.documentElement;
        const reduceMotion =
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

        if (!reduceMotion) {
            window.clearTimeout(themeTransitionTimerRef.current);
            root.classList.add('theme-transitioning');
            themeTransitionTimerRef.current = window.setTimeout(
                () => root.classList.remove('theme-transitioning'),
                320
            );
        }

        root.setAttribute('data-theme', nextTheme);
        const themeColor = nextTheme === 'dark' ? '#030712' : '#f3f6fa';
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute('content', themeColor);

        try {
            window.localStorage.setItem('theme', nextTheme);
        } catch (error) {
            // The theme still applies for this page view when storage is restricted.
        }

        setTheme(nextTheme);
    }

    useEffect(() => {
        if (!isOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        const menuButton = menuButtonRef.current;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                setIsOpen(false);
                return;
            }

            if (event.key !== 'Tab') return;

            const focusableElements = overlayRef.current?.querySelectorAll(
                'button:not([disabled]), a[href]'
            );
            if (!focusableElements?.length) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            menuButton?.focus();
        };
    }, [isOpen]);

    return (
        <>
            <header className="site-header">
                <Link className="site-header__logo" to="/" aria-label={t('menu.logoLabel')}>
                    <img
                        src="/logo-ntep.png"
                        alt="NTEP"
                        width="1086"
                        height="362"
                        loading="eager"
                    />
                </Link>
                <div className="site-header__actions">
                    <button
                        className="language-toggle"
                        type="button"
                        aria-label={language === 'en' ? t('menu.switchToFrench') : t('menu.switchToEnglish')}
                        onClick={toggleLanguage}
                    >
                        <Languages aria-hidden="true" focusable="false" size={18} />
                        <span>{language.toUpperCase()}</span>
                    </button>
                    <button
                        className="theme-toggle"
                        type="button"
                        aria-label={theme === 'dark' ? t('menu.switchToLight') : t('menu.switchToDark')}
                        aria-pressed={theme === 'dark'}
                        onClick={toggleTheme}
                    >
                        {theme === 'dark' ? (
                            <Sun aria-hidden="true" focusable="false" size={20} />
                        ) : (
                            <Moon aria-hidden="true" focusable="false" size={20} />
                        )}
                    </button>
                    <button
                        ref={menuButtonRef}
                        className="site-header__toggle"
                        type="button"
                        aria-label={t('menu.open')}
                        aria-expanded={isOpen}
                        aria-controls="site-menu"
                        onClick={() => setIsOpen(true)}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </header>

            <div
                ref={overlayRef}
                className={`site-menu${isOpen ? ' site-menu--open' : ''}`}
                id="site-menu"
                aria-hidden={!isOpen}
            >
                <button
                    ref={closeButtonRef}
                    className="site-menu__close"
                    type="button"
                    aria-label={t('menu.close')}
                    onClick={() => setIsOpen(false)}
                    tabIndex={isOpen ? 0 : -1}
                >
                    <span />
                    <span />
                </button>
                <nav className="site-menu__navigation" aria-label={t('menu.mainNavigation')}>
                    {navigationLinks.map(({ labelKey, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            tabIndex={isOpen ? 0 : -1}
                            className={({ isActive }) =>
                                `site-menu__link${isActive ? ' site-menu__link--active' : ''}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            {t(labelKey)}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
}

export default Menu;