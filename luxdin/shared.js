// Shared nav + footer + interactions for all LuxDin pages
(function(){
  const current = (document.body.dataset.page || '').trim();

  const nav = `
<nav class="navbar ${document.body.dataset.navSolid === 'true' ? 'solid' : ''}" id="navbar">
  <a href="LuxDin.html" class="logo">Lux<span class="dot"></span>Din</a>
  <ul class="nav-links">
    <li><a href="menu.html" class="${current==='menu'?'current':''}">Meny</a></li>
    <li><a href="lunch.html" class="${current==='lunch'?'current':''}">Lunch</a></li>
    <li><a href="om-oss.html" class="${current==='om-oss'?'current':''}">Om oss</a></li>
    <li><a href="chambre-separee.html" class="${current==='chambre'?'current':''}">Chambre</a></li>
    <li><a href="julbord.html" class="${current==='julbord'?'current':''}">Julbord</a></li>
    <li><a href="catering.html" class="${current==='catering'?'current':''}">Catering</a></li>
    <li><a href="aktuellt.html" class="${current==='aktuellt'?'current':''}">Aktuellt</a></li>
    <li><a href="faq.html" class="${current==='faq'?'current':''}">FAQ</a></li>
  </ul>
  <div class="nav-actions">
    <a href="LuxDin.html#contact" class="nav-cta">Boka bord</a>
    <button class="mobile-menu-btn" id="menuBtn" aria-label="Meny">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
  </div>
</nav>
<div class="mobile-panel" id="mobilePanel">
  <a href="LuxDin.html">Hem</a>
  <a href="menu.html">Meny</a>
  <a href="lunch.html">Lunch</a>
  <a href="om-oss.html">Om oss</a>
  <a href="chambre-separee.html">Chambre Séparée</a>
  <a href="julbord.html">Julbord</a>
  <a href="catering.html">Catering</a>
  <a href="aktuellt.html">Aktuellt</a>
  <a href="faq.html">FAQ</a>
  <a href="LuxDin.html#contact" class="btn btn-cream">Boka bord</a>
</div>`;

  const footer = `
<footer class="site-footer">
  <div class="footer-top">
    <div class="footer-logo">Lux<span class="dot"></span>Din</div>
    <div class="footer-tagline">Nordisk råvara · Franskt hantverk · Östermalm</div>
  </div>
  <div class="footer-grid">
    <div class="footer-col">
      <h4>Besök</h4>
      <p>Riddargatan 12<br/>114 35 Stockholm</p>
      <a href="tel:+4681234567" style="margin-top:14px;">+46 8 123 45 67</a>
      <a href="mailto:bord@luxdin.se">bord@luxdin.se</a>
    </div>
    <div class="footer-col">
      <h4>Menyn</h4>
      <a href="menu.html">À la carte</a>
      <a href="menu.html">Avsmakningsmeny</a>
      <a href="lunch.html">Lunch</a>
      <a href="menu.html#drycker">Vinkällaren</a>
    </div>
    <div class="footer-col">
      <h4>Upplevelser</h4>
      <a href="chambre-separee.html">Chambre Séparée</a>
      <a href="julbord.html">Julbord</a>
      <a href="catering.html">Catering</a>
      <a href="aktuellt.html">Event</a>
    </div>
    <div class="footer-col footer-hours">
      <h4>Öppettider</h4>
      <div class="row"><span>Tis – Tor</span><span>17:30 – 23:00</span></div>
      <div class="row"><span>Fre – Lör</span><span>17:30 – 00:00</span></div>
      <div class="row"><span>Sön – Mån</span><span>Stängt</span></div>
      <div class="row lunch"><span>Lunch Tis – Fre</span><span>11:30 – 14:00</span></div>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 LuxDin · Alla rättigheter förbehållna</span>
    <div class="footer-social">
      <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
      <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
      <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
    </div>
    <span>Riddargatan 12 · 114 35 Stockholm</span>
  </div>
</footer>`;

  // Inject
  const navMount = document.getElementById('nav-mount');
  const footMount = document.getElementById('footer-mount');
  if (navMount) navMount.outerHTML = nav;
  if (footMount) footMount.outerHTML = footer;

  // Scroll
  const navEl = document.getElementById('navbar');
  addEventListener('scroll', () => {
    if (!navEl) return;
    navEl.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile
  const menuBtn = document.getElementById('menuBtn');
  const panel = document.getElementById('mobilePanel');
  menuBtn?.addEventListener('click', () => panel.classList.toggle('open'));
  panel?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => panel.classList.remove('open')));

  // Reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(r => io.observe(r));

  // Magnetic buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      btn.style.transform = `translate(${x*0.12}px, ${y*0.18}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();
