import '../style/project.css';
import PROJECTS from '../data/projects';

function Project() {
    return (
        <main className="projects-page page-enter">
            <h1 className="projects-page__title">Projets</h1>
            <div className="projects-list">
                {PROJECTS.map((project) => (
                    <article className="project-card" key={project.title} data-reveal>
                        {project.image ? (
                            <img
                                className="project-card__image"
                                src={project.image}
                                alt={project.imageAlt}
                            />
                        ) : (
                            <div
                                className="project-card__image-placeholder"
                                role="img"
                                aria-label={project.imageAlt}
                            />
                        )}
                        <div className="project-card__content">
                            <h2 className="project-card__title">{project.title}</h2>
                            <p className="project-card__description">{project.description}</p>
                            <ul className="project-card__technologies" aria-label="Technologies">
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
                                aria-label={`Voir le projet ${project.title} (nouvel onglet)`}
                            >
                                Voir le projet <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default Project;