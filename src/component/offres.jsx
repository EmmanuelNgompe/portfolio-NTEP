import { useState } from 'react';
import { Link } from 'react-router-dom';
import PROJECTS from '../data/projects';
import '../style/offres.css';
import { useLanguage } from '../i18n/LanguageContext';

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
        { id: 'budget' },
        { id: 'profitability' },
        { id: 'support' },
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
            titleKey: 'Website',
            description:
                'Développement de plateformes web rapides, accessibles et optimisées pour le référencement naturel. Architectures modernes et responsives adaptées à tous les écrans.',
            icon: 'site',
        },
        {
            titleKey: 'Ui',
            description:
                "Conception d'identités visuelles distinctives et de parcours intuitifs. Prototypage soigné, micro-interactions harmonieuses et systèmes graphiques évolutifs.",
            icon: 'design',
        },
        {
            titleKey: 'Commerce',
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
    const { t, language } = useLanguage();
    const [openFaqId, setOpenFaqId] = useState(null);
    const whatsappHref = `https://wa.me/237658476252?text=${encodeURIComponent(
        language === 'fr'
            ? 'Bonjour Emmanuel, j’aimerais discuter de mon projet web.'
            : 'Hello Emmanuel, I would like to discuss my web project.'
    )}`;

    return (
        <main className="offers-page page-enter">
            <section className="offers-hero" aria-labelledby="offers-title" data-reveal>
                <div className="offers-hero__content">
                    <h1 id="offers-title">{t('offers.heroTitle')}</h1>
                    <p>{t('offers.heroSubtitle')}</p>
                    <div className="offers-hero__actions">
                        <a
                            className="offers-button offers-button--primary"
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsAppIcon />
                            {t('offers.whatsapp')}
                        </a>
                        <Link className="offers-button offers-button--secondary" to="/project">
                            <span aria-hidden="true">→</span>
                            {t('offers.projects')}
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
                        <h2 id="services-title">{t('offers.servicesHeading')}</h2>
                        <p>{t('offers.servicesIntro')}</p>
                    </header>
                    <div className="offers-services__grid">
                        {OFFERS_CONTENT.services.map((service) => (
                            <article className="offers-service" key={service.titleKey} data-reveal>
                                <div className="offers-service__icon-box">
                                    <ServiceIcon name={service.icon} />
                                </div>
                                <h3>{t(`offers.service${service.titleKey}.title`)}</h3>
                                <p>{t(`offers.service${service.titleKey}.description`)}</p>
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
                        <h2 id="projects-title">{t('offers.projectsHeading')}</h2>
                        <p>{t('offers.projectsIntro')}</p>
                    </header>
                    <div className="offers-projects__list">
                        {PROJECTS.map((project) => (
                            <article className="offers-project" key={project.titleKey} data-reveal>
                                {project.image ? (
                                    <img
                                        className="offers-project__image"
                                        src={project.image}
                                        alt={t(project.imageAltKey)}
                                        width={project.imageWidth}
                                        height={project.imageHeight}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div
                                        className="offers-project__placeholder"
                                        role="img"
                                        aria-label={t(project.imageAltKey)}
                                    />
                                )}
                                <div className="offers-project__content">
                                    <h3>{t(project.titleKey)}</h3>
                                    <p>{t(project.descriptionKey)}</p>
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${t('project.view')} ${t(project.titleKey)} (${t('project.newTab')})`}
                                    >
                                        {t('project.view')} <span aria-hidden="true">→</span>
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
                        <h2 id="faq-title">{t('offers.faqHeading')}</h2>
                        <p>{t('offers.faqIntro')}</p>
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
                                            <span>{t(`offers.faq${faq.id === 'budget' ? 'Budget' : faq.id === 'profitability' ? 'Profit' : 'Support'}.question`)}</span>
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
                                            {['answer1', 'answer2'].map((answerKey) => (
                                                <span key={answerKey}>
                                                    {t(`offers.faq${faq.id === 'budget' ? 'Budget' : faq.id === 'profitability' ? 'Profit' : 'Support'}.${answerKey}`)}
                                                </span>
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
                        alt={t('offers.profileName')}
                        width="960"
                        height="1280"
                        loading="lazy"
                    />
                    <div className="offers-profile__content">
                        <img
                            className="offers-profile__logo"
                            src={OFFERS_CONTENT.profileLogo}
                            alt="NTEP"
                            width="1086"
                            height="362"
                            loading="lazy"
                        />
                        <h2 id="profile-title">{t('offers.profileName')}</h2>
                        <p className="offers-profile__role">{t('offers.profileTitle')}</p>
                        <p className="offers-profile__description">
                            {t('offers.profileDescription')}
                        </p>
                        <p className="offers-profile__location">
                            {t('offers.profileLocation')}
                        </p>
                    </div>
                </div>
            </section>

            <section
                className="offers-contact-cta"
                aria-labelledby="contact-cta-title"
                data-reveal
            >
                <h2 id="contact-cta-title">{t('offers.ctaTitle')}</h2>
                <p>{t('offers.ctaDescription')}</p>
                <a
                    className="offers-button offers-button--primary"
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <WhatsAppIcon />
                    {t('offers.whatsapp')}
                </a>
                <nav
                    className="offers-contact-cta__socials"
                    aria-label={language === 'fr' ? 'Réseaux sociaux' : 'Social networks'}
                >
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