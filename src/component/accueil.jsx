import { Link } from 'react-router-dom';
import '../style/accueil.css';
// import About from './about.jsx';

const HOME_CONTENT = {
    title: 'Hey, I\'m Emmanuel NGOMPE but you can call me Godson',
    subtitle: 'I\'m a web Develloper fullstack. UX/UI designer interface',
    navigationLabel: 'Liens vers mes projets et contacts',
    links: {
        projects: 'See my projects',
        projectsHref: '/project',
        arrow: ' →',
        about: 'More about me',
        aboutHref: '/about',
        cv: 'Mon CV',
        cvHref: '/cv-emmanuel-ngompe.pdf',
    },
};

function Accueil() {
    return (
        <main className="home-page page-enter">
            <section className="home-hero" aria-labelledby="home-title" data-reveal>
                <h1 className="home-hero__title" id="home-title">
                    {HOME_CONTENT.title}
                </h1>
                <p className="home-hero__subtitle">{HOME_CONTENT.subtitle}</p>
                <nav className="home-hero__links" aria-label={HOME_CONTENT.navigationLabel}>
                    <Link className="home-hero__link" to={HOME_CONTENT.links.projectsHref}>
                        {HOME_CONTENT.links.arrow}
                        {HOME_CONTENT.links.projects}
                        <span aria-hidden="true">{HOME_CONTENT.links.arrow}</span>
                    </Link>
                    <a
                        className="home-hero__link"
                        href={HOME_CONTENT.links.aboutHref}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {HOME_CONTENT.links.about}
                        <span aria-hidden="true">{HOME_CONTENT.links.arrow}</span>
                    </a>
                    <a className="home-hero__link home-hero__link--cv" href={HOME_CONTENT.links.cvHref}>
                        <svg
                            aria-hidden="true"
                            className="home-hero__cv-icon"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M5.75 2.75h5.5l4 4v10.5H5.75V2.75Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M11.25 2.75v4h4m-7 4h4.5m-4.5 3h4.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        {HOME_CONTENT.links.cv}
                    </a>
                </nav>
            </section>
        </main>
    );
}

export default Accueil;