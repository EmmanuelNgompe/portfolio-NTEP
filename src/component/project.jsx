import '../style/project.css';
import PROJECTS from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';

function Project() {
    const { t } = useLanguage();
    return (
        <main className="projects-page page-enter">
            <h1 className="projects-page__title">{t('project.title')}</h1>
            <div className="projects-list">
                {PROJECTS.map((project) => (
                    <article className="project-card" key={project.titleKey} data-reveal>
                        {project.image ? (
                            <img
                                className="project-card__image"
                                src={project.image}
                                alt={t(project.imageAltKey)}
                                width={project.imageWidth}
                                height={project.imageHeight}
                                loading="lazy"
                            />
                        ) : (
                            <div
                                className="project-card__image-placeholder"
                                role="img"
                                aria-label={t(project.imageAltKey)}
                            />
                        )}
                        <div className="project-card__content">
                            <h2 className="project-card__title">{t(project.titleKey)}</h2>
                            <p className="project-card__description">{t(project.descriptionKey)}</p>
                            <ul className="project-card__technologies" aria-label={t('project.technologyLabel')}>
                                {project.technologies.map((technology) => (
                                    <li className="project-card__technology" key={technology}>
                                        {technology}
                                    </li>
                                ))}
                            </ul>
                            <a
                                className="project-card__link"
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
        </main>
    );
}

export default Project;