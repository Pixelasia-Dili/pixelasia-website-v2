#!/usr/bin/env node
/**
 * Pixelasia Website v2 — Build Script
 * Pure Node.js (no npm dependencies).
 * Reads _data/*.json, replaces {{TOKEN}} in index.template.html → index.html
 */
'use strict';

const fs = require('fs');
const path = require('path');

// ── Load data ──────────────────────────────────────────────────────────────
function load(name) {
  const filePath = path.join('_data', `${name}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const site     = load('site');
const hero     = load('hero');
const work     = load('work');
const proofbar = load('proofbar');
const feat     = load('case');
const services = load('services');
const about    = load('about');
const team     = load('team');
const diff     = load('diff');
const contact  = load('contact');

// ── Read template ──────────────────────────────────────────────────────────
let html = fs.readFileSync('index.template.html', 'utf8');

// ── Helpers ────────────────────────────────────────────────────────────────
/** HTML-escape a value for safe insertion in text content and attribute values */
function esc(str) {
  return String(str != null ? str : '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Replace all occurrences of {{TOKEN}} with value (value already escaped where needed) */
function set(token, value) {
  html = html.split('{{' + token + '}}').join(String(value != null ? value : ''));
}

// ── Site Settings ──────────────────────────────────────────────────────────
set('SITE_TITLE',        esc(site.title));
set('SITE_DESCRIPTION',  esc(site.description));
set('SITE_URL',          esc(site.url));
set('SITE_COMPANY',      esc(site.company));
set('SITE_LEGAL',        esc(site.legal));
set('SITE_EMAIL',        esc(site.email));
set('SITE_PHONE',        esc(site.phone));
set('SITE_WHATSAPP',     esc(site.whatsapp));
set('SITE_FACEBOOK',     esc(site.facebookUrl));
set('SITE_YOUTUBE',      esc(site.youtubeUrl));
set('SITE_LOGO_PURPLE',  esc(site.logoPurple));
set('SITE_LOGO_WHITE',   esc(site.logoWhite));
set('SITE_OG_IMAGE',     esc(site.ogImage));
set('PRIMARY_COLOR',     esc(site.primaryColor));
set('PRIMARY_HOVER',     esc(site.primaryColorHover));
set('PRIMARY_RGB',       esc(site.primaryColorRgb));

// ── Hero ───────────────────────────────────────────────────────────────────
set('HERO_HEADLINE',        esc(hero.headline));
set('HERO_HEADLINE_ITALIC', esc(hero.headlineItalic));
set('HERO_SUBTITLE',        esc(hero.subtitle));
set('HERO_BTN1_TEXT',       esc(hero.button1Text));
set('HERO_BTN1_LINK',       esc(hero.button1Link));
set('HERO_BTN2_TEXT',       esc(hero.button2Text));
set('HERO_BTN2_LINK',       esc(hero.button2Link));

// Hero slides (loop)
const slidesHtml = (hero.slides || []).map((s, i) => {
  const cls = `hero__slide hero__slide--${i + 1}`;
  const load = i === 0 ? 'fetchpriority="high"' : 'loading="lazy"';
  return `      <img class="${cls}" src="${esc(s.src)}" alt="${esc(s.alt)}" ${load}>`;
}).join('\n');
set('HERO_SLIDES', slidesHtml);

// ── Selected Work ──────────────────────────────────────────────────────────
set('WORK_HEADING', esc(work.heading));

const workHtml = (work.projects || []).map(p => `
        <article class="work-card">
          <div class="work-card__img">
            <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">
            <div class="work-card__overlay">
              <span class="work-card__badge">${esc(p.category)}</span>
              <div class="work-card__info">
                <h3 class="work-card__title">${esc(p.title)}</h3>
                <p class="work-card__meta">${esc(p.meta)}</p>
              </div>
            </div>
          </div>
        </article>`).join('\n');
set('WORK_PROJECTS', workHtml);

// ── Proof Bar ──────────────────────────────────────────────────────────────
(proofbar.stats || []).forEach((s, i) => {
  set(`PROOF${i + 1}_NUMBER`, esc(s.number));
  set(`PROOF${i + 1}_LABEL`,  esc(s.label));
});

// ── Featured Case ──────────────────────────────────────────────────────────
set('CASE_LABEL',      esc(feat.label));
set('CASE_TITLE',      esc(feat.title));
set('CASE_IMAGE',      esc(feat.image));
set('CASE_CHALLENGE',  esc(feat.challenge));
set('CASE_PRODUCTION', esc(feat.production));
set('CASE_RESULT',     esc(feat.result));

// ── Services ───────────────────────────────────────────────────────────────
set('SERVICES_HEADING', esc(services.heading));

const servicesHtml = (services.items || []).map(s => `
        <div class="service-card">
          <div class="service-card__icon" aria-hidden="true">${esc(s.icon)}</div>
          <h3 class="service-card__title">${esc(s.title)}</h3>
          <p class="service-card__text">${esc(s.text)}</p>
        </div>`).join('\n');
set('SERVICES_ITEMS', servicesHtml);

// ── About ──────────────────────────────────────────────────────────────────
(about.quotes || []).forEach((q, i) => set(`ABOUT_QUOTE${i + 1}`, esc(q)));
set('ABOUT_BODY', esc(about.body));

// ── Team ───────────────────────────────────────────────────────────────────
set('TEAM_HEADING', esc(team.heading));

const teamHtml = (team.members || []).map((m, i) => `
        <div class="team-card${i === 0 ? ' team-card--large' : ''}">
          <div class="team-card__img">
            <img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">
            <div class="team-card__overlay">
              <p class="team-card__name">${esc(m.name)}</p>
              <p class="team-card__role">${esc(m.role)}</p>
            </div>
          </div>
        </div>`).join('\n');
set('TEAM_MEMBERS', teamHtml);

// ── DIFF ───────────────────────────────────────────────────────────────────
set('DIFF_LABEL',      esc(diff.label));
// title allows \n → <br>
set('DIFF_TITLE',      esc(diff.title).replace(/\\n|\n/g, '<br>'));
set('DIFF_BODY',       esc(diff.body));
set('DIFF_BTN_TEXT',   esc(diff.buttonText));
set('DIFF_BTN_LINK',   esc(diff.buttonLink));
set('DIFF_BG_IMAGE',   esc(diff.backgroundImage));
set('DIFF_SIDE_IMAGE', esc(diff.sideImage));

// ── Contact ────────────────────────────────────────────────────────────────
set('CONTACT_TITLE_ITALIC', esc(contact.titleItalic));
set('CONTACT_TITLE_MAIN',   esc(contact.titleMain));
set('CONTACT_SUBTITLE',     esc(contact.subtitle));

// ── Warn about remaining tokens ────────────────────────────────────────────
const remaining = html.match(/\{\{[A-Z0-9_]+\}\}/g);
if (remaining) {
  console.warn('⚠️  Unresolved tokens:', [...new Set(remaining)].join(', '));
}

// ── Write output ───────────────────────────────────────────────────────────
fs.writeFileSync('index.html', html);
console.log('✅  Built index.html successfully');
