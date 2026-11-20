import '../style/about.css';
import { useLanguage } from '../i18n/LanguageContext';

const ABOUT_CONTENT = {
    photo: '/emmanuel.jpg',
    photoAlt: 'Emmanuel, web develloper and designer interface',
    cvHref: '/cv-emmanuel-ngompe.pdf',
    cvLabel: '→ See my CV',
    profileHeading: 'Profil',
    biography:
        'Développeur web junior avec quelque mois d’expérience et des projets solo, je suis titulaire d\'un BTS en génie logiciel et actuellement étudiant en IGL3 à ISSAM. Passionnée par la programmation web et les défis techniques, je m\'investis pleinement dans le travail en équipe. Mon expertise inclut le développement web, la gestion de projet et la résolution de problèmes complexes.',
    contactsHeading: 'Contacts',
    contactInvitation:
        'Pour une collaboration, un projet ou simplement échanger, contactez-moi.',
    contacts: [
        {
            id: 'whatsapp',
            label: 'WhatsApp (+237)',
            href: 'https://wa.me/237658476252?text=Bonjour%20Emmanuel',
            icon: 'whatsapp',
            external: true,
        },
        {
            id: 'github',
            label: 'GitHub',
            href: 'https://github.com/emmanuelngompe',
            icon: 'github',
            external: true,
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/emmanuel-ngompe/',
            icon: 'linkedin',
            external: true,
        },
        {
            id: 'instagram',
            label: 'Instagram',
            href: 'https://www.instagram.com/godsonfdd/',
            icon: 'instagram',
            external: true,
        },
        {
            id: 'phone',
            label: 'Appel direct',
            href: 'tel:+237658476252',
            icon: 'phone',
            external: false,
        },
    ],
};

function ContactIcon({ name }) {
    const iconPaths = {
        whatsapp: (
            <>
                <path d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1 1.1-4A8 8 0 1 1 20 11.5Z" />
                <path d="M8.5 8.5c.4 2.5 2.5 4.6 5 5l1-1 2 1c-.2 1.2-1 1.8-2.2 1.7-3.5-.5-6.2-3.2-6.7-6.7-.1-1.2.5-2 1.7-2.2l1 2-1 1.2Z" />
            </>
        ),
        github: (
            <>
                <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-2-10-4 12" />
            </>
        ),
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
        phone: <path d="m7 3 3 1-1 4-2 .5a14 14 0 0 0 8.5 8.5l.5-2 4-1 1 3c.3 1-.2 2-1.2 2.4A5 5 0 0 1 17 20C9.8 18.3 5.7 14.2 4 7a5 5 0 0 1 .6-3.8C5 3 6 2.7 7 3Z" />,
    };

    return (
        <svg
            aria-hidden="true"
            className="about-contact__icon"
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

function About() {
    const { t, language } = useLanguage();
    const whatsappHref = `https://wa.me/237658476252?text=${encodeURIComponent(
        language === 'fr'
            ? 'Bonjour Emmanuel, j’aimerais discuter de mon projet.'
            : 'Hello Emmanuel, I would like to discuss my project.'
    )}`;
    return (
        <main className="about-page page-enter">
            <div className="about-page__content">
                <figure className="about-photo" data-reveal>
                    <img
                        src={ABOUT_CONTENT.photo}
                        alt={t('about.photoAlt')}
                        width="960"
                        height="1280"
                        loading="lazy"
                    />
                    <a className="about-photo__cv" href={ABOUT_CONTENT.cvHref}>
                        <svg
                            aria-hidden="true"
                            className="about-photo__cv-icon"
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
                        {t('about.cvLabel')}
                        <span aria-hidden="true">→</span>
                    </a>
                </figure>

                <section
                    className="about-profile"
                    aria-labelledby="about-profile-heading"
                    data-reveal
                >
                    <h1 id="about-profile-heading">{t('about.profileHeading')}</h1>
                    <p>{t('about.biography')}</p>
                </section>

                <section
                    className="about-contacts"
                    aria-labelledby="about-contacts-heading"
                    data-reveal
                >
                    <h2 id="about-contacts-heading">{t('about.contactsHeading')}</h2>
                    <p>{t('about.invitation')}</p>
                    <ul className="about-contact-list">
                        {ABOUT_CONTENT.contacts.map((contact) => (
                            <li key={contact.id}>
                                <a
                                    className="about-contact"
                                    href={contact.id === 'whatsapp' ? whatsappHref : contact.href}
                                    target={contact.external ? '_blank' : undefined}
                                    rel={contact.external ? 'noopener noreferrer' : undefined}
                                >
                                    <ContactIcon name={contact.icon} />
                                    <span>{t(`about.${contact.id}`)}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
}

export default About;