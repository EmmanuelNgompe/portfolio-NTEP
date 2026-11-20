import { useEffect, useRef, useState } from 'react';

const DARK_THEME = 'dark';

function readTheme() {
  return document.documentElement.getAttribute('data-theme') === DARK_THEME
    ? DARK_THEME
    : 'light';
}

function readReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

function parseHexColor(value, fallback) {
  const match = value.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (!match) return fallback;

  const hex = match[1].length === 3
    ? match[1].split('').map((character) => character + character).join('')
    : match[1];

  return [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
}

function HeroBackground() {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState(readTheme);
  const [reducedMotion, setReducedMotion] = useState(readReducedMotion);

  useEffect(() => {
    const root = document.documentElement;
    const themeObserver = new MutationObserver(() => setTheme(readTheme()));
    themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => themeObserver.disconnect();
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!motionPreference) return undefined;

    const handleMotionChange = (event) => setReducedMotion(event.matches);
    motionPreference.addEventListener?.('change', handleMotionChange);
    motionPreference.addListener?.(handleMotionChange);

    return () => {
      motionPreference.removeEventListener?.('change', handleMotionChange);
      motionPreference.removeListener?.(handleMotionChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || theme === DARK_THEME) return undefined;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let nodes = [];
    let isPageVisible = !document.hidden;
    const rootStyles = getComputedStyle(document.documentElement);
    const primary = parseHexColor(rootStyles.getPropertyValue('--primary'), [8, 111, 184]);
    const silver = parseHexColor(rootStyles.getPropertyValue('--silver'), [146, 157, 169]);
    const deep = parseHexColor(rootStyles.getPropertyValue('--primary-deep'), [11, 35, 65]);
    const nodeColors = [primary, primary, silver, silver, deep];

    function setCanvasSize() {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const nodeCount = width <= 600 ? 25 : 50;
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        velocityX: (Math.random() - 0.5) * 0.16,
        velocityY: (Math.random() - 0.5) * 0.16,
        radius: 1.4 + Math.random() * 1.2,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
        opacity: 0.18 + Math.random() * 0.18,
      }));

      drawNetwork();
    }

    function drawNetwork() {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 0.7;

      for (let firstIndex = 0; firstIndex < nodes.length; firstIndex += 1) {
        const firstNode = nodes[firstIndex];
        for (let secondIndex = firstIndex + 1; secondIndex < nodes.length; secondIndex += 1) {
          const secondNode = nodes[secondIndex];
          const distanceX = firstNode.x - secondNode.x;
          const distanceY = firstNode.y - secondNode.y;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

          if (distance < 140) {
            context.beginPath();
            context.strokeStyle = `rgba(${primary.join(',')}, ${(1 - distance / 140) * 0.2})`;
            context.moveTo(firstNode.x, firstNode.y);
            context.lineTo(secondNode.x, secondNode.y);
            context.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        context.beginPath();
        context.fillStyle = `rgba(${node.color.join(',')}, ${node.opacity})`;
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fill();
      });
    }

    function animate() {
      if (!isPageVisible || reducedMotion) return;

      nodes.forEach((node) => {
        node.x += node.velocityX;
        node.y += node.velocityY;

        if (node.x < 0 || node.x > width) node.velocityX *= -1;
        if (node.y < 0 || node.y > height) node.velocityY *= -1;
      });

      drawNetwork();
      animationFrame = window.requestAnimationFrame(animate);
    }

    function startAnimation() {
      window.cancelAnimationFrame(animationFrame);
      if (isPageVisible && !reducedMotion) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        drawNetwork();
      }
    }

    function handleVisibilityChange() {
      isPageVisible = !document.hidden;
      startAnimation();
    }

    setCanvasSize();
    startAnimation();
    window.addEventListener('resize', setCanvasSize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', setCanvasSize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [theme, reducedMotion]);

  return (
    <div
      className={`hero-background${theme === 'light' ? ' hero-background--light' : ' hero-background--dark'}`}
      aria-hidden="true"
    >
      <div className="hero-background__orbs">
        <span className="hero-background__orb hero-background__orb--one" />
        <span className="hero-background__orb hero-background__orb--two" />
        <span className="hero-background__orb hero-background__orb--three" />
        <span className="hero-background__orb hero-background__orb--four" />
        <span className="hero-background__orb hero-background__orb--five" />
        <span className="hero-background__orb hero-background__orb--six" />
      </div>
      <canvas className="hero-background__canvas" ref={canvasRef} />
    </div>
  );
}

export default HeroBackground;
