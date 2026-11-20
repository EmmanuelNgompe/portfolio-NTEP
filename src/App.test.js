import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test.each([
  ['/', "Hey, I'm Emmanuel NGOMPE, but you can call me Godson"],
  ['/project', 'Projects'],
  ['/about', 'Profile'],
  ['/offers', 'I design and develop thoughtful web experiences.'],
])('renders the %s page title', (path, title) => {
  localStorage.setItem('lang', 'en');
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

test('renders project cards with secure external links', () => {
  window.history.pushState({}, '', '/project');
  render(<App />);

  expect(screen.getAllByRole('article')).toHaveLength(3);
  const projectLink = screen.getByRole('link', {
    name: /Digital Wedding Invitation/,
  });
  expect(projectLink).toHaveAttribute('target', '_blank');
  expect(projectLink).toHaveAttribute('rel', 'noopener noreferrer');
});

test('renders the profile photo, CV link, and contact methods', () => {
  window.history.pushState({}, '', '/about');
  render(<App />);

  expect(screen.getByRole('img', { name: /Emmanuel NGOMPE, web developer/ })).toHaveAttribute(
    'src',
    '/emmanuel.jpg'
  );
  expect(screen.getByRole('link', { name: /See my CV/ })).toHaveAttribute(
    'href',
    '/cv-emmanuel-ngompe.pdf'
  );
  expect(screen.getAllByRole('listitem')).toHaveLength(5);
  expect(screen.getByRole('link', { name: 'Direct call' })).toHaveAttribute(
    'href',
    'tel:+237658476252'
  );
  expect(screen.getByRole('link', { name: 'WhatsApp (+237)' })).toHaveAttribute(
    'rel',
    'noopener noreferrer'
  );
});

test('renders the three offer services and shared projects', () => {
  window.history.pushState({}, '', '/offers');
  render(<App />);

  expect(screen.getByRole('heading', { name: 'What I can do for you' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Website creation' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Interface design / UI-UX' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'E-commerce & web apps' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Selected projects' })).toBeInTheDocument();
  expect(document.querySelectorAll('.offers-service')).toHaveLength(3);
  expect(document.querySelectorAll('.offers-project')).toHaveLength(3);
  localStorage.setItem('lang', 'en');
  const whatsappLinks = screen.getAllByRole('link', { name: /Write on WhatsApp|Write via WhatsApp/ });
  expect(whatsappLinks).toHaveLength(2);
  whatsappLinks.forEach((link) => {
    expect(link.getAttribute('href')).toContain('wa.me/237658476252?text=');
  });
});

test('allows only one FAQ answer to be expanded at a time', () => {
  window.history.pushState({}, '', '/offers');
  render(<App />);

  const firstQuestion = screen.getByRole('button', { name: "I don't have enough budget" });
  const secondQuestion = screen.getByRole('button', { name: 'Is it really worth it?' });

  fireEvent.click(firstQuestion);
  expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
  expect(secondQuestion).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(secondQuestion);
  expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
  expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
});

test('toggles and stores the selected color theme', () => {
  localStorage.setItem('lang', 'en');
  localStorage.clear();
  document.documentElement.setAttribute('data-theme', 'light');
  const themeColorMeta = document.createElement('meta');
  themeColorMeta.setAttribute('name', 'theme-color');
  document.head.appendChild(themeColorMeta);
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute('content', '#030712');
  expect(localStorage.getItem('theme')).toBe('dark');

  fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute('content', '#f3f6fa');
  expect(localStorage.getItem('theme')).toBe('light');
  themeColorMeta.remove();
});

test('toggles language, document language and WhatsApp message', () => {
  localStorage.setItem('lang', 'en');
  window.history.pushState({}, '', '/offers');
  render(<App />);

  expect(document.documentElement).toHaveAttribute('lang', 'en');
  fireEvent.click(screen.getByRole('button', { name: 'Switch to French' }));

  expect(document.documentElement).toHaveAttribute('lang', 'fr');
  expect(localStorage.getItem('lang')).toBe('fr');
  expect(document.title).toContain('Développeur web');
  expect(screen.getByRole('heading', { name: 'Je conçois et développe des expériences web soignées.' })).toBeInTheDocument();

  const whatsappLink = screen.getAllByRole('link', { name: 'Écrire sur WhatsApp' })[0];
  expect(whatsappLink.getAttribute('href')).toContain('Bonjour%20Emmanuel');
});
