/* Progressive enhancement: every section and destination works without JavaScript. */
document.body.classList.add('js');
// Desktop readers preview the PDF; smaller screens and touch devices download it.
const desktopCvPreview = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
const cvLinks = [...document.querySelectorAll('[data-cv-link]')];
function updateCvLinks() {
  cvLinks.forEach(link => {
    if (desktopCvPreview.matches) {
      link.removeAttribute('download');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.title = 'Preview PDF in a new tab; download using the PDF viewer controls';
      link.setAttribute('aria-description', 'Opens a PDF in a new tab with a download option.');
    } else {
      link.download = 'Ebrahim_Resume__UX_.pdf';
      link.removeAttribute('target');
      link.removeAttribute('rel');
      link.title = 'Download Ebrahim Ali’s CV as a PDF';
      link.setAttribute('aria-description', 'Downloads the CV as a PDF.');
    }
  });
}
updateCvLinks();
desktopCvPreview.addEventListener('change', updateCvLinks);
// Only the first-screen images and core stylesheet gate the initial skeleton.
const criticalImages = [...document.querySelectorAll('.portrait img')];
const imageReady = image => image.complete ? Promise.resolve() : new Promise(resolve => {
  image.addEventListener('load', resolve, {once:true});
  image.addEventListener('error', resolve, {once:true});
});
const styleReady = window.portfolioStylesReady ? Promise.resolve() : new Promise(resolve => {
  window.addEventListener('portfolio:styles', resolve, {once:true});
});
Promise.all([styleReady, ...criticalImages.map(imageReady)]).then(() => window.portfolioBoot?.finish());
﻿// Semantic HTML is the content source, including the no-JavaScript Designer fallback.
const portfolioData = {
  designer: {
    heading: 'Ideas into experiences.',
    summary: 'Four projects exploring how thoughtful design can make everyday tasks feel simpler.',
    toolsCopy: 'A considered toolkit for research, design, and prototyping.',
    skillsCopy: 'Understanding people, shaping interactions, and making ideas tangible.',
    heroCopy: 'I design intuitive, user-centered digital experiences by combining UX research, interaction design, and technical knowledge. My background in computer science helps me connect user needs with practical, scalable solutions.'
  },
  developer: {
    heading: 'Systems into solutions.',
    summary: 'Selected software, AI and cloud projects built around real operational needs.',
    toolsCopy: 'The technologies behind my web, cloud, and AI work.',
    skillsCopy: 'A foundation in web development, cloud services, AI, and data.',
    heroCopy: 'I build web, cloud, and AI-powered solutions grounded in real operational needs. My work spans citizen communication, health intelligence, student evaluation, and library management.'
  }
};
const heroStage = document.querySelector('.hero-stage');
const choices = [...document.querySelectorAll('[data-role], [data-track-choice]')];
const panels = [...document.querySelectorAll('[data-track-panel]')];
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const trackState = { activeTrack: 'designer', previewTrack: null, committed: false };
for (const [track, data] of Object.entries(portfolioData)) {
  data.projects = [...document.querySelectorAll(`#${track}-projects .project`)];
  data.tools = [...document.querySelectorAll(`.tool-marquee[data-track-panel="${track}"] .tool-set:first-child .tool-chip`)].map(node => node.textContent.trim());
  data.skills = panels.filter(node => node.matches('.skill-group') && node.dataset.trackPanel === track);
}
let portraitReveal = 50;
let portraitTarget = 50;
let portraitVelocity = 0;
let portraitAnimation = 0;
let portraitTime = 0;
function paintPortrait() {
  heroStage.style.setProperty('--portrait-reveal', portraitReveal.toFixed(3) + '%');
  const feather = Math.min(4, portraitReveal * .4, (100 - portraitReveal) * .4);
  heroStage.style.setProperty('--portrait-feather', feather.toFixed(3) + '%');
}
function animatePortrait(time) {
  const dt = Math.min((time - portraitTime) / 1000, .05);
  portraitTime = time;
  const frequency = 19;
  const offset = portraitReveal - portraitTarget;
  const helper = portraitVelocity + frequency * offset;
  const decay = Math.exp(-frequency * dt);
  portraitReveal = Math.max(0, Math.min(100, portraitTarget + (offset + helper * dt) * decay));
  portraitVelocity = (portraitVelocity - frequency * helper * dt) * decay;
  if (Math.abs(portraitReveal - portraitTarget) < .03 && Math.abs(portraitVelocity) < .3) {
    portraitReveal = portraitTarget;
    portraitVelocity = 0;
    portraitAnimation = 0;
    paintPortrait();
    return;
  }
  paintPortrait();
  portraitAnimation = requestAnimationFrame(animatePortrait);
}
function revealPortrait(track) {
  heroStage.dataset.portrait = track || 'split';
  portraitTarget = track === 'designer' ? 100 : track === 'developer' ? 0 : 50;
  if (motionPreference.matches) {
    cancelAnimationFrame(portraitAnimation);
    portraitAnimation = 0;
    portraitVelocity = 0;
    portraitReveal = portraitTarget;
    paintPortrait();
  } else if (!portraitAnimation) {
    portraitTime = performance.now();
    portraitAnimation = requestAnimationFrame(animatePortrait);
  }
}
function previewPortfolioTrack(track) {
  if (!portfolioData[track]) return;
  trackState.previewTrack = track;
  revealPortrait(track);
}
function restoreActiveTrack() {
  trackState.previewTrack = null;
  revealPortrait(trackState.committed || matchMedia('(max-width:767px)').matches ? trackState.activeTrack : null);
}
function setPortfolioTrack(track, { persist = true, announce = true, animate = true, committed = true } = {}) {
  if (!portfolioData[track]) return;
  // Anchor the section the visitor is reading when the two project lists differ in height.
  const anchors = [...document.querySelectorAll('main > section')];
  const readingSection = anchors.filter(node => node.getBoundingClientRect().top <= 140).at(-1);
  const oldTop = readingSection?.getBoundingClientRect().top;
  trackState.activeTrack = track;
  trackState.committed = committed;
  trackState.previewTrack = null;
  document.body.dataset.track = track;
  const data = portfolioData[track];
  choices.forEach(button => button.setAttribute('aria-pressed', String((button.dataset.role || button.dataset.trackChoice) === track)));
  panels.forEach(panel => {
    panel.getAnimations().forEach(animation => animation.cancel());
    panel.hidden = panel.dataset.trackPanel !== track;
    if (!panel.hidden && animate && !motionPreference.matches) {
      panel.animate([{ opacity: .25, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
  });
  document.querySelector('#projects-title').textContent = data.heading;
  document.querySelector('#projects .section-head p').textContent = data.summary;
  document.querySelector('[data-tools-description]').textContent = data.toolsCopy;
  document.querySelector('[data-skills-description]').textContent = data.skillsCopy;
  document.querySelector('[data-hero-copy]').textContent = data.heroCopy;
  if (announce) document.querySelector('.track-status').textContent = `${track === 'designer' ? 'Designer' : 'Developer'} portfolio selected`;
  document.querySelector('#hero-portrait').setAttribute('aria-label', `Ebrahim Ali — ${track} portrait`);
  restoreActiveTrack();
  if (readingSection && readingSection.id !== 'home' && oldTop != null) {
    window.scrollBy({ top: readingSection.getBoundingClientRect().top - oldTop, behavior: 'instant' });
  }
  if (persist) {
    try { sessionStorage.setItem('portfolio-track', track); } catch {}
    const url = new URL(location.href);
    url.searchParams.set('track', track);
    try { history.replaceState(null, '', url); } catch {}
  }
}
choices.forEach(button => {
  const track = button.dataset.role || button.dataset.trackChoice;
  button.addEventListener('click', () => setPortfolioTrack(track));
  if (button.matches('.role-switch')) {
    button.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') previewPortfolioTrack(track); });
    button.addEventListener('pointerleave', restoreActiveTrack);
    button.addEventListener('focus', () => previewPortfolioTrack(track));
    button.addEventListener('blur', restoreActiveTrack);
  }
});
heroStage.addEventListener('pointerleave', restoreActiveTrack);
motionPreference.addEventListener('change', restoreActiveTrack);
matchMedia('(max-width:767px)').addEventListener('change', restoreActiveTrack);
window.addEventListener('popstate', () => {
  const track = new URL(location.href).searchParams.get('track');
  if (portfolioData[track]) setPortfolioTrack(track, { persist: false });
});
let initialTrack = new URL(location.href).searchParams.get('track');
try { if (!portfolioData[initialTrack]) initialTrack = sessionStorage.getItem('portfolio-track'); } catch {}
setPortfolioTrack(portfolioData[initialTrack] ? initialTrack : 'designer', { persist: false, announce: Boolean(portfolioData[initialTrack]), animate: false, committed: Boolean(portfolioData[initialTrack]) });
// Continuous motion can be paused independently of the system motion preference.
const toolsSection = document.querySelector('.tool-section');
const toolsPause = document.querySelector('.tools-pause');
toolsPause.addEventListener('click', () => {
  const paused = toolsPause.getAttribute('aria-pressed') !== 'true';
  toolsPause.setAttribute('aria-pressed', String(paused));
  toolsPause.textContent = paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
  toolsSection.classList.toggle('is-paused', paused);
});
// Keep each repeated rail wide enough for the viewport without adding accessible duplicates.
function sizeToolRails() {
  document.querySelectorAll('.tool-marquee .tool-set').forEach(set => {
    set.style.minWidth = Math.max(document.documentElement.clientWidth, 960) + 'px';
  });
}
sizeToolRails();
window.addEventListener('resize', sizeToolRails, { passive: true });

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
const navLinks = [...menu.querySelectorAll('a[href^="#"]')];
menu.querySelector('.cta-mobile').addEventListener('click', () => closeMenu());
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu +';
  menu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close −' : 'Menu +';
  menu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
});
navLinks.forEach(link => link.addEventListener('click', () => {
  closeMenu();
  const section = document.querySelector(link.hash);
  section.focus({preventScroll: true});
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
const mobile = matchMedia('(max-width: 767px)');
mobile.addEventListener('change', () => closeMenu());
// Observe a narrow band below the header so tall sections remain active.
if ('IntersectionObserver' in window) {
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-15% 0px -65% 0px', threshold: 0});
  document.querySelectorAll('main > section').forEach(section => activeObserver.observe(section));
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-enter');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold: .08});
    document.querySelectorAll('.project, .skill-group, .about-grid').forEach(item => revealObserver.observe(item));
  }
}
