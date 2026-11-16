import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test.each([
  ['/', 'you can call me Godson'],
  ['/project', 'Projets'],
  ['/about', 'Profil'],
  ['/offers', 'Je conçois et développe des expériences web soignées.'],
])('renders the %s page title', (path, title) => {
  window.history.pushState({}, '', path);
  render(<App />);
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
});

test('shows the loading screen once per session and fades it out', () => {
  sessionStorage.clear();
  jest.useFakeTimers();

  const { unmount } = render(<App />);

  expect(screen.getByRole('status', { name: 'Loading portfolio' })).toBeInTheDocument();
  expect(sessionStorage.getItem('ntep-loading-seen')).toBe('true');

  act(() => jest.advanceTimersByTime(2000));
  expect(screen.getByRole('status')).toHaveClass('loading-screen--exiting');

  act(() => jest.advanceTimersByTime(600));
  expect(screen.queryByRole('status')).not.toBeInTheDocument();

  unmount();
  render(<App />);
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  jest.useRealTimers();
});

test('renders four project cards with secure external links', () => {
  window.history.pushState({}, '', '/project');
  render(<App />);

  expect(screen.getAllByRole('article')).toHaveLength(4);
  const projectLink = screen.getByRole('link', {
    name: 'Voir le projet Aurora Horology (nouvel onglet)',
  });
  expect(projectLink).toHaveAttribute('target', '_blank');
  expect(projectLink).toHaveAttribute('rel', 'noopener noreferrer');
});

test('renders the profile photo, CV link, and contact methods', () => {
  window.history.pushState({}, '', '/about');
  render(<App />);

  expect(screen.getByRole('img', { name: /Emmanuel, développeur web/ })).toHaveAttribute(
    'src',
    '/emmanuel.jpg'
  );
  expect(screen.getByRole('link', { name: /Voir mon CV/ })).toHaveAttribute(
    'href',
    '/cv-emmanuel-ngompe.pdf'
  );
  expect(screen.getAllByRole('listitem')).toHaveLength(5);
  expect(screen.getByRole('link', { name: 'Appel direct' })).toHaveAttribute(
    'href',
    'tel:+237658476252'
  );
  expect(screen.getByRole('link', { name: 'WhatsApp (+237)' })).toHaveAttribute(
    'rel',
    'noopener noreferrer'
  );
});

test('renders the three offer services and four shared projects', () => {
  window.history.pushState({}, '', '/offers');
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Ce que je fais pour vous' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Création de site' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: "Design d'interface / UI-UX" })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'E-commerce & Web apps' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Projets réalisés' })).toBeInTheDocument();
  expect(document.querySelectorAll('.offers-service')).toHaveLength(3);
  expect(document.querySelectorAll('.offers-project')).toHaveLength(4);
  const whatsappLinks = screen.getAllByRole('link', { name: /Écrire sur WhatsApp/ });
  expect(whatsappLinks).toHaveLength(2);
  whatsappLinks.forEach((link) => {
    expect(link).toHaveAttribute('href', 'https://wa.me/237658476252?text=Bonjour%20Emmanuel');
  });
});

test('allows only one FAQ answer to be expanded at a time', () => {
  window.history.pushState({}, '', '/offers');
  render(<App />);

  const firstQuestion = screen.getByRole('button', { name: "Je n'ai pas assez d'argent" });
  const secondQuestion = screen.getByRole('button', { name: 'Est-ce vraiment rentable ?' });

  fireEvent.click(firstQuestion);
  expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
  expect(secondQuestion).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(secondQuestion);
  expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
  expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
});
