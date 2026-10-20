# Ebrahim Ali — Designer & Developer portfolio

Production: https://ebromo2003-tech.github.io/EBRAHIM/
Repository: ebromo2003-tech/EBRAHIM

A static, single-page portfolio using HTML, CSS and vanilla JavaScript. No build step or runtime dependencies are required. `index.html` is the published entry; `Ebrahim Portfolio.html` is kept identical for the existing local workflow.

## Portfolio paths

The hero is the primary Designer/Developer selector. Hover or keyboard focus previews a portrait; click, Enter or Space commits the track. A compact navigation selector remains available on desktop and inside the mobile menu. A central `trackState` in `script.js` separates preview and active selection. `portfolioData` holds copy and structured references to semantic HTML projects, tools and skills.

The chosen track updates project content, headings, hero copy, tools, skills, portrait and accessible active states. The choice is retained in sessionStorage; `?track=designer` and `?track=developer` support direct links. Fresh desktop visits show a feathered 50/50 portrait; mobile shows the Designer portrait until selection. Desktop neutral state still presents Designer work by default. Switching while reading preserves the current section's viewport position.

Designer projects and all original Prototype/Presentation destinations are preserved: Document Organizer, Roots, Bahrain Fort and Wajba. Developer projects are limited to Health Signal Detection System, Tawasual, TaqyeemPro and UOB Online Library Management System. Project dates and library details follow the owner's brief; technology, experience and education follow `Ebrahim_Resume__UX_.pdf`. Covers use typography and official local logos, not fabricated application screenshots. Both tracks use the same alternating project grid, media ratio, typography, tags and action family.

## Confidential project destinations

The owner confirmed NDA restrictions for the development projects. All eight Presentation/Website actions are native disabled buttons with `aria-disabled=true`; accompanying text explains confidentiality. No public project URLs were supplied or invented, and no future availability is promised. The resume supports web/dashboard deliverables for the first three projects; the library project is explicitly a Laravel web system. No Mobile App destination is claimed.

## Portraits and assets

Designer: `Painterly Emirati Portrait with Abstract Strokes.png`.
Developer: `Modern Software Engineer Portrait.png`.

Both images occupy identical bounds with the same crop and object position. A feathered reveal mask animates with a critically damped spring; an outer mask softens the perimeter into the page. There is no border, outline or rounded frame. Reduced motion applies the destination immediately. Original images remain unchanged. The visible Designer image has high fetch priority; the Developer portrait is preloaded.

Organization logos are stored locally as `logo-MoH.png`, `logo-iGA.png`, `logo-BQA.png` and `logo-UOB.png`, with sources in `THIRD_PARTY_NOTICES.md`. The health project includes both MoH and iGA branding. Logo aspect ratios are preserved inside restrained containers.

## Tools, skills and shared content

The tools rail sits between About and Skills, switches with the portfolio path, loops continuously and pauses on hover/focus . Reduced motion shows a wrapped static list and hides the decorative duplicate. Designer tools are Figma, FigJam, Balsamiq, Framer and Canva. Development tools and the Web & Mobile, Cloud & AI and Databases skill groups use resume-backed technologies. Collaboration is shared.

About, education, experience, contact and the CV stay shared. More in my CV uses the contact-detail interaction pattern. Desktop fine-pointer users preview the PDF in a new tab; touch/smaller-screen users download it. Mail links retain the existing hiring and freelance draft templates. Opening a draft does not send a message.

## Accessibility and fallback

Native buttons expose `aria-pressed`; an aria-live region announces committed selection. Hover previews do not change the active track. Keyboard focus stays on the initiating control. Portrait layers are decorative inside a single accessible portrait description. Existing skip navigation, semantic sections, active navigation, focus feedback, mobile menu/Escape, reduced motion, lazy project images and loading fail-safe remain.

Without JavaScript, Designer projects, navigation, contact and PDF download remain available. External links retain new-tab protections. Google Fonts has system fallbacks. No framework or external animation runtime is added.

## Deployment

The production repository's existing `.github/workflows/static.yml` deploys the static root on pushes to main. The workspace's `.github/workflows/deploy.yml` is an alternative workflow that explicitly packages HTML/CSS/JS/PNG/PDF files; do not install both simultaneously. All asset references are relative and retain their original case. QA files under `.qa/` are excluded from publishing.

## Verification

Chrome checks cover 1440×900, 1280×800, 1024×768, 768×1024, 430×932, 390×844 and 360×800 in both tracks. Checks include hover/focus versus committed selection, Enter, mobile selector and Escape, session persistence/query links, shared portrait geometry and 16:9 media, disabled NDA actions, scroll anchoring, hover/focus motion pause, static reduced-motion tools, preserved Designer URLs, desktop CV preview, exact PDF response bytes, no-JavaScript fallback, horizontal overflow, local asset responses and JavaScript errors.

Detailed scripts, screenshots and results are in ignored `.qa/`. Lighthouse scores and authenticated access to external Figma/Canva destinations are not claimed.


The hero now pairs a generous portrait with two complete, clickable project-path panels. Each names the discipline, its four projects and a clear Explore work action. Tools use circular icon-and-label medallions; the separate Pause motion button is removed at the owner’s request. Hover/focus still pauses the rail and reduced motion still produces a static list.


The hero restores Designer / centered portrait / Developer. Only the committed role is bold; hover previews do not change font weight. Decorative hero prompts, category micro-labels, project-cover indexes and duplicate cover tags are removed. The selection announcement is screen-reader-only. Both tracks share the same tag font, size, padding, height and radius. Circular tools remain.
