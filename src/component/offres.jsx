import { useState } from 'react';
import { Link } from 'react-router-dom';
import PROJECTS from '../data/projects';
import '../style/offres.css';

const OFFERS_CONTENT = {
    heroTitle: 'Je conçois et développe des expériences web soignées.',
    heroSubtitle:
        'Développeur web & interfaces numériques pour donner vie à vos projets avec simplicité et élégance.',
    whatsappLabel: 'Écrire sur WhatsApp',
    whatsappHref: 'https://wa.me/237658476252?text=Bonjour%20Emmanuel',
    projectsLabel: 'Voir mes projets',
    servicesHeading: 'Ce que je fais pour vous',
    servicesIntro:
        "Accompagnement complet pour imaginer, concevoir et mettre en ligne des expériences numériques fluides, scalables et centrées sur l'utilisateur.",
    projectsHeading: 'Projets réalisés',
    projectsIntro:
        'Sélection de réalisations récentes illustrant notre souci du détail et de la performance technique.',
    faqHeading: 'Questions fréquentes',
    faqIntro: 'Des réponses transparentes et bienveillantes pour démarrer notre collaboration sereinement.',
    faqs: [
        {
            id: 'budget',
            question: "Je n'ai pas assez d'argent",
            answer: [
                'Nous pouvons commencer avec une solution adaptée à votre budget.',
                'Nous définissons ensemble les priorités et faisons évoluer le projet par étapes.',
            ],
        },
        {
            id: 'profitability',
            question: 'Est-ce vraiment rentable ?',
            answer: [
                'Un site bien pensé peut vous aider à gagner en visibilité et en crédibilité.',
                'Nous concevons une expérience utile à vos clients et alignée sur vos objectifs.',
            ],
        },
        {
            id: 'support',
            question: 'Serez-vous accompagné ?',
            answer: [
                'Je reste à vos côtés de la première discussion jusqu’à la mise en ligne.',
                'Vous gardez un contact direct pour les ajustements et les conseils.',
            ],
        },
    ],
    profileHeading: 'Emmanuel NGOMPE',
    profileLogo: '/logo-ntep.png',
    profilePhoto: '/emmanuel.jpg',
    profileTitle: 'Développeur web & UI designer',
    profileDescription:
        "Passionné par la simplicité visuelle et la rigueur du code, j'accorde une attention particulière aux détails qui font la différence : la lisibilité, l'équilibre des espaces et la sincérité des interactions. Mon objectif est d'aider chacun à concrétiser des projets élégants, vivants et pérennes.",
    profileLocation:
        'Basé entre Yaoundé et le web mondial — ouvert aux collaborations bienveillantes.',
    contactHeading: 'Parlons de votre site',
    contactDescription:
        "Prêt à transformer votre idée en une plateforme digitale soignée ? Discutons-en dès aujourd'hui en toute simplicité.",
    socials: [
        { name: 'GitHub', href: 'https://github.com/emmanuelngompe', icon: 'github' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/emmanuel-ngompe/', icon: 'linkedin' },
        { name: 'Instagram', href: 'https://www.instagram.com/godsonfdd/', icon: 'instagram' },
    ],
    services: [
        {
            title: 'Création de site',
            description:
                'Développement de plateformes web rapides, accessibles et optimisées pour le référencement naturel. Architectures modernes et responsives adaptées à tous les écrans.',
            icon: 'site',
        },
        {
            title: "Design d'interface / UI-UX",
            description:
                "Conception d'identités visuelles distinctives et de parcours intuitifs. Prototypage soigné, micro-interactions harmonieuses et systèmes graphiques évolutifs.",
            icon: 'design',
        },
        {
            title: 'E-commerce & Web apps',
            description:
                "Boutiques en ligne élégantes orientées conversion et applications sur-mesure. Parcours d'achat simplifiés, synchronisation fluide et chargement instantané.",
            icon: 'commerce',
        },
    ],
};

function ServiceIcon({ name }) {
    const iconPaths = {
        site: (
            <>
                <rect x="3" y="4" width="18" height="13" rx="1.5" />
                <path d="M8 21h8m-4-4v4" />
            </>
        ),
        design: (
            <>
                <path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.5-3.3 1.6 1.6 0 0 1 1.2-2.7H18a3 3 0 0 0 3-3c0-5-4-9-9-9Z" />
                <circle cx="7.5" cy="11" r=".8" fill="currentColor" />
                <circle cx="10" cy="7.5" r=".8" fill="currentColor" />
                <circle cx="14" cy="7.5" r=".8" fill="currentColor" />
            </>
        ),
        commerce: (
            <>
                <rect x="5" y="7" width="14" height="14" rx="1.5" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </>
        ),
    };

    return (
        <svg
            aria-hidden="true"
            className="offers-service__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
        >
            {iconPaths[name]}
        </svg>
    );
}

function WhatsAppIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path
                d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1 1.1-4A8 8 0 1 1 20 11.5Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />
            <path
                d="M9 9.2c.4 2.1 1.7 3.4 3.8 3.8"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
        </svg>
    );
}

function SocialIcon({ name }) {
    const icons = {
        github: <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-2-10-4 12" />,
        linkedin: (
            <>
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8" cy="9" r="1.2" />
                <path d="M8 12v4m4-4v4m0-2a2 2 0 0 1 4 0v2" />
            </>
        ),
        instagram: (
            <>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
            </>
        ),
    };

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
        >
            {icons[name]}
        </svg>
    );
}

function Offres() {
    const [openFaqId, setOpenFaqId] = useState(null);

    return (
        <main className="offers-page page-enter">
            <section className="offers-hero" aria-labelledby="offers-title" data-reveal>
                <div className="offers-hero__content">
                    <h1 id="offers-title">{OFFERS_CONTENT.heroTitle}</h1>
                    <p>{OFFERS_CONTENT.heroSubtitle}</p>
                    <div className="offers-hero__actions">
                        <a
                            className="offers-button offers-button--primary"
                            href={OFFERS_CONTENT.whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsAppIcon />
                            {OFFERS_CONTENT.whatsappLabel}
                        </a>
                        <Link className="offers-button offers-button--secondary" to="/project">
                            <span aria-hidden="true">→</span>
                            {OFFERS_CONTENT.projectsLabel}
                        </Link>
                    </div>
                </div>
            </section>

            <section
                className="offers-section offers-services"
                aria-labelledby="services-title"
                data-reveal
            >
                <div className="offers-section__inner">
                    <header className="offers-section__header">
                        <h2 id="services-title">{OFFERS_CONTENT.servicesHeading}</h2>
                        <p>{OFFERS_CONTENT.servicesIntro}</p>
                    </header>
                    <div className="offers-services__grid">
                        {OFFERS_CONTENT.services.map((service) => (
                            <article className="offers-service" key={service.title} data-reveal>
                                <div className="offers-service__icon-box">
                                    <ServiceIcon name={service.icon} />
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="offers-section offers-projects"
                aria-labelledby="projects-title"
                data-reveal
            >
                <div className="offers-section__inner">
                    <header className="offers-section__header">
                        <h2 id="projects-title">{OFFERS_CONTENT.projectsHeading}</h2>
                        <p>{OFFERS_CONTENT.projectsIntro}</p>
                    </header>
                    <div className="offers-projects__list">
                        {PROJECTS.map((project) => (
                            <article className="offers-project" key={project.title} data-reveal>
                                {project.image ? (
                                    <img
                                        className="offers-project__image"
                                        src={project.image}
                                        alt={project.imageAlt}
                                    />
                                ) : (
                                    <div
                                        className="offers-project__placeholder"
                                        role="img"
                                        aria-label={project.imageAlt}
                                    />
                                )}
                                <div className="offers-project__content">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Voir le projet ${project.title} (nouvel onglet)`}
                                    >
                                        Voir le projet <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="offers-section offers-faq"
                aria-labelledby="faq-title"
                data-reveal
            >
                <div className="offers-section__inner offers-faq__inner">
                    <header className="offers-section__header offers-faq__header">
                        <h2 id="faq-title">{OFFERS_CONTENT.faqHeading}</h2>
                        <p>{OFFERS_CONTENT.faqIntro}</p>
                    </header>
                    <div className="offers-faq__list">
                        {OFFERS_CONTENT.faqs.map((faq) => {
                            const isOpen = openFaqId === faq.id;
                            const answerId = `offers-faq-answer-${faq.id}`;

                            return (
                                <article className="offers-faq__item" key={faq.id} data-reveal>
                                    <h3>
                                        <button
                                            className="offers-faq__question"
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={answerId}
                                            onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                                        >
                                            <span>{faq.question}</span>
                                            <svg
                                                aria-hidden="true"
                                                className={isOpen ? 'is-open' : ''}
                                                viewBox="0 0 20 20"
                                                fill="none"
                                            >
                                                <path
                                                    d="m5 7.5 5 5 5-5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </h3>
                                    <div className="offers-faq__answer" id={answerId} hidden={!isOpen}>
                                        <p>
                                            {faq.answer.map((line) => (
                                                <span key={line}>{line}</span>
                                            ))}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section
                className="offers-section offers-profile"
                aria-labelledby="profile-title"
                data-reveal
            >
                <div className="offers-profile__card">
                    <img
                        className="offers-profile__photo"
                        src={OFFERS_CONTENT.profilePhoto}
                        alt="Emmanuel NGOMPE"
                    />
                    <div className="offers-profile__content">
                        <img
                            className="offers-profile__logo"
                            src={OFFERS_CONTENT.profileLogo}
                            alt="NTEP"
                        />
                        <h2 id="profile-title">{OFFERS_CONTENT.profileHeading}</h2>
                        <p className="offers-profile__role">{OFFERS_CONTENT.profileTitle}</p>
                        <p className="offers-profile__description">
                            {OFFERS_CONTENT.profileDescription}
                        </p>
                        <p className="offers-profile__location">
                            {OFFERS_CONTENT.profileLocation}
                        </p>
                    </div>
                </div>
            </section>

            <section
                className="offers-contact-cta"
                aria-labelledby="contact-cta-title"
                data-reveal
            >
                <h2 id="contact-cta-title">{OFFERS_CONTENT.contactHeading}</h2>
                <p>{OFFERS_CONTENT.contactDescription}</p>
                <a
                    className="offers-button offers-button--primary"
                    href={OFFERS_CONTENT.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <WhatsAppIcon />
                    {OFFERS_CONTENT.whatsappLabel}
                </a>
                <nav className="offers-contact-cta__socials" aria-label="Réseaux sociaux">
                    {OFFERS_CONTENT.socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                        >
                            <SocialIcon name={social.icon} />
                        </a>
                    ))}
                </nav>
            </section>
        </main>
    );
}

export default Offres;