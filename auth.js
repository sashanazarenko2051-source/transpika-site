// Auth helpers using localStorage
function getUser() { try { return JSON.parse(localStorage.getItem('et_user')); } catch { return null; } }
function setUser(u) { localStorage.setItem('et_user', JSON.stringify(u)); }
function logout() { localStorage.removeItem('et_user'); window.location.href = 'index.html'; }

// i18n - 11 European languages
const LANG_KEY = 'et_lang';
function getLang() { return localStorage.getItem(LANG_KEY) || 'cz'; }
function setLang(l) { localStorage.setItem(LANG_KEY, l); location.reload(); }

const LANGS = {
  uk: { flag:'ua', label:'UA', home:'Головна',      services:'Послуги',        routes:'Маршрути',    prices:'Ціни',     reviews:'Відгуки',     contact:'Контакти', login:'Увійти',        profile:'Мій профіль',  logout:'Вийти'        },
  cz: { flag:'cz', label:'CZ', home:'Domů',         services:'Služby',         routes:'Trasy',       prices:'Ceny',     reviews:'Recenze',     contact:'Kontakt',  login:'Přihlásit',     profile:'Můj profil',   logout:'Odhlásit'     },
  en: { flag:'gb', label:'EN', home:'Home',          services:'Services',       routes:'Routes',      prices:'Prices',   reviews:'Reviews',     contact:'Contact',  login:'Login',         profile:'My Profile',   logout:'Logout'       },
  pl: { flag:'pl', label:'PL', home:'Strona główna', services:'Usługi',         routes:'Trasy',       prices:'Ceny',     reviews:'Recenzje',    contact:'Kontakt',  login:'Zaloguj',       profile:'Mój profil',   logout:'Wyloguj'      },
  de: { flag:'de', label:'DE', home:'Startseite',    services:'Dienste',        routes:'Routen',      prices:'Preise',   reviews:'Bewertungen', contact:'Kontakt',  login:'Anmelden',      profile:'Mein Profil',  logout:'Abmelden'     },
  sk: { flag:'sk', label:'SK', home:'Domov',         services:'Služby',         routes:'Trasy',       prices:'Ceny',     reviews:'Recenzie',    contact:'Kontakt',  login:'Prihlásiť',     profile:'Môj profil',   logout:'Odhlásiť'     },
  hu: { flag:'hu', label:'HU', home:'Főoldal',       services:'Szolgáltatások', routes:'Útvonalak',   prices:'Árak',     reviews:'Vélemények',  contact:'Kapcsolat',login:'Belépés',       profile:'Profilom',     logout:'Kilépés'      },
  ro: { flag:'ro', label:'RO', home:'Acasă',         services:'Servicii',       routes:'Rute',        prices:'Prețuri',  reviews:'Recenzii',    contact:'Contact',  login:'Autentificare', profile:'Profilul meu', logout:'Deconectare'  },
  fr: { flag:'fr', label:'FR', home:'Accueil',       services:'Services',       routes:'Itinéraires', prices:'Prix',     reviews:'Avis',        contact:'Contact',  login:'Connexion',     profile:'Mon profil',   logout:'Déconnexion'  },
  it: { flag:'it', label:'IT', home:'Home',          services:'Servizi',        routes:'Percorsi',    prices:'Prezzi',   reviews:'Recensioni',  contact:'Contatto', login:'Accedi',        profile:'Il mio profilo',logout:'Esci'        },
  es: { flag:'es', label:'ES', home:'Inicio',        services:'Servicios',      routes:'Rutas',       prices:'Precios',  reviews:'Reseñas',     contact:'Contacto', login:'Entrar',        profile:'Mi perfil',    logout:'Salir'        },
};

function renderNav(activePage = '') {
  const user = getUser();
  const lang = getLang();
  const t = LANGS[lang] || LANGS.uk;
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const langMenuItems = Object.entries(LANGS).map(([code, l]) =>
    `<button class="lang-option${code===lang?' active':''}" onclick="setLang('${code}')">
      <img src="https://flagcdn.com/w20/${l.flag}.png" width="18" height="12" alt="${l.label}" style="border-radius:2px;">
      <span>${l.label}</span>
    </button>`
  ).join('');

  nav.innerHTML = `
    <a href="index.html" class="nav-logo">
      <img src="https://flagcdn.com/w20/cz.png" width="20" height="14" alt="CZ" style="border-radius:2px;vertical-align:middle;">
      <img src="https://flagcdn.com/w20/ua.png" width="20" height="14" alt="UA" style="border-radius:2px;vertical-align:middle;margin-left:3px;">
      <span class="logo-name" style="margin-left:6px;">Transpika</span>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="index.html" class="${activePage==='home'?'active':''}">` + t.home + `</a>
      <a href="services.html" class="${activePage==='services'?'active':''}">` + t.services + `</a>
      <a href="routes.html" class="${activePage==='routes'?'active':''}">` + t.routes + `</a>
      <a href="prices.html" class="${activePage==='prices'?'active':''}">` + t.prices + `</a>
      <a href="reviews.html" class="${activePage==='reviews'?'active':''}">` + t.reviews + `</a>
      <a href="contact.html" class="${activePage==='contact'?'active':''}">` + t.contact + `</a>
    </div>
    <div class="nav-right">
      <div class="lang-dropdown" id="langDropdown">
        <button class="lang-current" onclick="toggleLangMenu(event)">
          <img src="https://flagcdn.com/w20/${t.flag}.png" width="18" height="12" alt="${t.label}" style="border-radius:2px;">
          <span>${t.label}</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style="margin-left:2px;"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <div class="lang-menu" id="langMenu">${langMenuItems}</div>
      </div>
      <button class="theme-btn" onclick="toggleTheme()" id="themeBtn" title="Змінити тему">☀️</button>
      ${user
        ? `<a href="profile.html" class="btn-profile"><span class="avatar-mini">${user.name.charAt(0).toUpperCase()}</span>${user.name.split(' ')[0]}</a>
           <button onclick="logout()" class="btn-logout" title="` + t.logout + `">↩</button>`
        : `<a href="login.html" class="btn-blue">` + t.login + `</a>`
      }
      <div class="burger" id="burger" onclick="toggleMobileMenu()">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;

  // mobile menu
  let mm = document.getElementById('mobileMenu');
  if (!mm) {
    mm = document.createElement('div');
    mm.id = 'mobileMenu';
    mm.className = 'mobile-menu';
    document.body.insertBefore(mm, document.body.firstChild.nextSibling);
  }
  mm.innerHTML = `
    <a href="index.html">` + t.home + `</a>
    <a href="services.html">` + t.services + `</a>
    <a href="routes.html">` + t.routes + `</a>
    <a href="prices.html">` + t.prices + `</a>
    <a href="reviews.html">` + t.reviews + `</a>
    <a href="contact.html">` + t.contact + `</a>
    ${user ? `<a href="profile.html">` + t.profile + `</a><a href="#" onclick="logout()">` + t.logout + `</a>` : `<a href="login.html">` + t.login + `</a>`}
  `;

  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
  });

  // close lang menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#langDropdown')) closeLangMenu();
  }, { once: false });
}

function toggleLangMenu(e) {
  e.stopPropagation();
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.toggle('open');
}
function closeLangMenu() {
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.remove('open');
}

function toggleMobileMenu() {
  const mm = document.getElementById('mobileMenu');
  if (mm) mm.classList.toggle('open');
}

// Render footer
function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
    <div class="footer-grid container">
      <div class="footer-brand">
        <span class="logo">🇨🇿🇺🇦 Transpika</span>
        <p>Spolehlivá přeprava mezi Českou republikou a Ukrajinou od roku 2019. Důvěřují nám tisíce zákazníků.</p>
        <div class="social-links" style="margin-top:16px;">
          <a href="#" title="Facebook">f</a>
          <a href="#" title="Instagram">📷</a>
          <a href="#" title="Telegram">✈</a>
        </div>
      </div>
      <div class="footer-col"><h5>Služby</h5><ul>
        <li><a href="services.html">Nákladní</a></li>
        <li><a href="services.html">Osobní</a></li>
        <li><a href="services.html">Stěhování</a></li>
        <li><a href="services.html">Hodinový pronájem</a></li>
      </ul></div>
      <div class="footer-col"><h5>Trasy</h5><ul>
        <li><a href="routes.html">Praha → Kyjev</a></li>
        <li><a href="routes.html">Praha → Lvov</a></li>
        <li><a href="routes.html">Brno → Charkov</a></li>
        <li><a href="routes.html">Ostrava → Užhorod</a></li>
      </ul></div>
      <div class="footer-col"><h5>Informace</h5><ul>
        <li><a href="reviews.html">Recenze</a></li>
        <li><a href="reviews.html#faq">FAQ / Clo</a></li>
        <li><a href="prices.html">Ceny</a></li>
        <li><a href="contact.html">Kontakt</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom container">
      <span>© 2025 Transpika. Všechna práva vyhrazena.</span>
      <span>Licence EU 🚛 č. 123456</span>
    </div>
  `;
}

// Scroll reveal
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// Toast
function showToast(msg, color='#1a56db') {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.style.background = color;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// FAQ toggle
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(b => { b.classList.remove('open'); b.nextElementSibling.classList.remove('open'); });
  if (!isOpen) { btn.classList.add('open'); answer.classList.add('open'); }
}

// Dark / Light theme
const THEME_KEY = 'et_theme';
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
}
function toggleTheme() {
  const current = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(saved);
}

// Float contacts
function renderFloat() {
  const el = document.createElement('div');
  el.className = 'float-contacts';
  el.innerHTML = ``;
  document.body.appendChild(el);
}
