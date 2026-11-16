import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../style/menu.css';

const navigationLinks = [
    { label: 'Accueil', to: '/' },
    { label: 'Projets', to: '/project' },
    { label: 'À propos', to: '/about' },
    { label: 'Offres', to: '/offers' },
];

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuButtonRef = useRef(null);
    const closeButtonRef = useRef(null);
    const overlayRef = useRef(null);

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
                <Link className="site-header__logo" to="/" aria-label="NTEP, accueil">
                    <img src="/logo-ntep.png" alt="NTEP" />
                </Link>
                <button
                    ref={menuButtonRef}
                    className="site-header__toggle"
                    type="button"
                    aria-label="Ouvrir le menu"
                    aria-expanded={isOpen}
                    aria-controls="site-menu"
                    onClick={() => setIsOpen(true)}
                >
                    <span />
                    <span />
                </button>
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
                    aria-label="Fermer le menu"
                    onClick={() => setIsOpen(false)}
                    tabIndex={isOpen ? 0 : -1}
                >
                    <span />
                    <span />
                </button>
                <nav className="site-menu__navigation" aria-label="Navigation principale">
                    {navigationLinks.map(({ label, to }) => (
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
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
}

export default Menu;