import { useLayoutEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import About from '../component/about';
import Accueil from '../component/accueil';
import Menu from '../component/menu';
import Offres from '../component/offres';
import Project from '../component/project';

function RoutedPages() {
    const location = useLocation();

    useLayoutEffect(() => {
        const revealElements = document.querySelectorAll('[data-reveal]');
        const prefersReducedMotion =
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            revealElements.forEach((element) => element.classList.add('is-revealed'));
            return undefined;
        }

        revealElements.forEach((element) => element.classList.add('reveal-pending'));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('reveal-pending');
                        entry.target.classList.add('is-revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
        );

        revealElements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, [location.pathname]);

    return (
        <Routes location={location}>
            <Route path="/" element={<Accueil />} />
            <Route path="/project" element={<Project />} />
            <Route path="/about" element={<About />} />
            <Route path="/offers" element={<Offres />} />
        </Routes>
    );
}

function SiteRoutes() {
    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Menu />
            <RoutedPages />
        </BrowserRouter>
    );
}

export default SiteRoutes;