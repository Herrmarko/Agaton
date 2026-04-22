/* Shared Agaton navbar + footer injector.
   Usage: include <script src="agaton-chrome.js" data-active="menu"></script> in head.
   Pages will get nav + footer auto-rendered into their respective mount points.
*/
(function(){
  const script = document.currentScript;
  const active = script?.dataset?.active || '';

  const LINKS = [
    { key: 'home',     label: 'Hem',       href: 'Agaton.html' },
    { key: 'menu',     label: 'Meny',      href: 'menu.html' },
    { key: 'lunch',    label: 'Lunch',     href: 'lunch.html' },
    { key: 'about',    label: 'Om oss',    href: 'om-oss.html' },
    { key: 'news',     label: 'Stora Sällskap',  href: 'stora-sallskap.html' },
    { key: 'contact',  label: 'Kontakt',   href: 'faq.html' },
  ];

  function render(){
    const nav = document.getElementById('agaton-nav');
    if (nav){
      const onDark = nav.dataset.onDark === 'true';
      nav.outerHTML = `
        <nav class="navbar ${onDark ? 'on-dark' : ''}" id="navbar">
          <a href="Agaton.html" class="brand">
            <img src="agaton_logo_dark.svg" class="brand-logo brand-logo-light" alt="Agaton Ristorante e Pizzeria" width="96" height="46">
            <img src="agaton_logo.svg" class="brand-logo brand-logo-dark" alt="Agaton Ristorante e Pizzeria" width="96" height="46">
          </a>
          <div class="nav-links">
            ${LINKS.map(l => `<a href="${l.href}" class="nav-link ${l.key === active ? 'active' : ''}">${l.label}</a>`).join('')}
          </div>
          <div class="nav-ctas">
            <a href="menu.html" class="nav-cta nav-cta-ghost">Se menyn</a>
            <a href="Agaton.html#booking" class="nav-cta">Boka bord</a>
          </div>
        </nav>
      `;
    }

    const foot = document.getElementById('agaton-footer');
    if (foot){
      foot.outerHTML = `
        <footer class="footer">
          <div class="footer-top">
            <div class="footer-brand">
              <img src="agaton_logo.svg" alt="Agaton Ristorante e Pizzeria" width="140" height="66" style="display:block; margin-bottom: 18px;">
              <p style="color:color-mix(in oklab,var(--cream) 70%,transparent);font-size:14px;line-height:1.7;margin-top:6px;max-width:34ch;">Vedugnspizza, handgjord pasta och ärlig italiensk mat sedan 1999.</p>
            </div>
            <div class="footer-col">
              <h4>Öppettider</h4>
              <ul class="footer-hours">
                <li><span>Måndag</span><span>17 – 22</span></li>
                <li><span>Tisdag</span><span>17 – 22</span></li>
                <li><span>Onsdag</span><span>17 – 22</span></li>
                <li><span>Torsdag</span><span>17 – 23</span></li>
                <li><span>Fredag</span><span>17 – 00</span></li>
                <li><span>Lördag</span><span>17 – 00</span></li>
                <li><span>Söndag</span><span>Stängt</span></li>
              </ul>
            </div>
            <div class="footer-col"><h4>Besök oss</h4><p>Västerlånggatan 72<br>111 29 Stockholm<br><br>+46 08 20 72 99<br>info@restaurangagaton.se</p></div>
            <div class="footer-col"><h4>Meny & Boka</h4><ul><li><a href="menu.html">À la carte</a></li><li><a href="lunch.html">Veckans lunch</a></li><li><a href="stora-sallskap.html">Stora sällskap</a></li><li><a href="chambre-separee.html">Privat matsal</a></li><li><a href="catering.html">Catering</a></li><li><a href="Agaton.html#booking">Boka bord</a></li><li><a href="faq.html">Vanliga frågor</a></li></ul></div>
          </div>
          <div class="footer-bottom"><span>© Agaton Ristorante · Stockholm</span><span>Placeholder-innehåll markerat XX</span></div>
        </footer>
      `;
    }

    // Scroll state
    const n = document.getElementById('navbar');
    if (n){
      // Force scrolled state if requested
      const forceScrolled = document.body.dataset.forceScrolled === 'true';
      if (forceScrolled) {
        n.classList.add('scrolled');
      }
      const onScroll = () => {
        if (forceScrolled) return;
        window.scrollY > 60 ? n.classList.add('scrolled') : n.classList.remove('scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  function mountTweaks(){
    if (document.getElementById('agaton-tweaks-fab')) return;

    const THEMES = [
      { id: '',         name: 'Trattoria', swatch: '#B23A2E' },
      { id: 'verde',    name: 'Verde',     swatch: '#556B40' },
      { id: 'ink',      name: 'Ink',       swatch: '#1A1613' },
      { id: 'costiera', name: 'Costiera',  swatch: '#0F2235' },
    ];
    const FONTS = [
      { id: 'classico',   name: 'Classico' },
      { id: 'romantico',  name: 'Romantico' },
      { id: 'moderno',    name: 'Moderno' },
      { id: 'editoriale', name: 'Editoriale' },
    ];
    const DENS = [
      { id: 'compact', name: 'Tight' },
      { id: '',        name: 'Balanced' },
      { id: 'airy',    name: 'Airy' },
    ];

    // Lazy-load additional font families
    const extraFonts = document.createElement('link');
    extraFonts.rel = 'stylesheet';
    extraFonts.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@400;500;600&family=DM+Serif+Display:ital@0;1&display=swap';
    document.head.appendChild(extraFonts);

    const saved = JSON.parse(localStorage.getItem('agaton-tweaks') || '{}');
    const state = { theme: saved.theme || '', font: saved.font || 'classico', density: saved.density || '' };

    const apply = () => {
      const root = document.documentElement;
      if (state.theme) root.setAttribute('data-theme', state.theme); else root.removeAttribute('data-theme');
      root.setAttribute('data-font', state.font);
      if (state.density) root.setAttribute('data-density', state.density); else root.removeAttribute('data-density');
      localStorage.setItem('agaton-tweaks', JSON.stringify(state));
    };
    apply();

    const fab = document.createElement('button');
    fab.id = 'agaton-tweaks-fab';
    fab.className = 'tweaks-fab show';
    fab.innerHTML = 'Aa';
    fab.title = 'Tweaks';
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'agaton-tweaks-panel';
    panel.className = 'tweaks-panel';
    panel.innerHTML = `
      <h3>Tweaks</h3>
      <div class="tsub">Smaka på stilen</div>
      <div class="tweaks-group">
        <label>Palett</label>
        <div class="tw-chips" data-group="theme">
          ${THEMES.map(t => `<button class="tw-chip ${state.theme === t.id ? 'active' : ''}" data-val="${t.id}"><span class="tw-swatch" style="background:${t.swatch}"></span>${t.name}</button>`).join('')}
        </div>
      </div>
      <div class="tweaks-group">
        <label>Typografi</label>
        <div class="tw-chips" data-group="font">
          ${FONTS.map(f => `<button class="tw-chip ${state.font === f.id ? 'active' : ''}" data-val="${f.id}">${f.name}</button>`).join('')}
        </div>
      </div>
      <div class="tweaks-group">
        <label>Density</label>
        <div class="tw-chips" data-group="density">
          ${DENS.map(d => `<button class="tw-chip ${state.density === d.id ? 'active' : ''}" data-val="${d.id}">${d.name}</button>`).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    fab.addEventListener('click', () => panel.classList.toggle('show'));
    panel.addEventListener('click', (e) => {
      const chip = e.target.closest('.tw-chip');
      if (!chip) return;
      const group = chip.parentElement.dataset.group;
      state[group] = chip.dataset.val;
      chip.parentElement.querySelectorAll('.tw-chip').forEach(c => c.classList.toggle('active', c === chip));
      apply();
    });

    window.addEventListener('message', (e) => {
      if (e.data?.type === '__deactivate_edit_mode'){ fab.classList.remove('show'); panel.classList.remove('show'); }
      if (e.data?.type === '__activate_edit_mode'){ fab.classList.add('show'); }
    });
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(_){}
  }

  // Inject shared footer CSS (once)
  if (!document.getElementById('agaton-chrome-css')){
    const css = document.createElement('style');
    css.id = 'agaton-chrome-css';
    css.textContent = `
      .footer{ padding: 100px 48px 36px; background: var(--wood); }
      .footer-top{ display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.1fr; gap: 56px; padding-bottom: 72px; border-bottom: 1px solid color-mix(in oklab, var(--cream) 12%, transparent); max-width: 1600px; margin: 0 auto; }
      .footer-hours{ list-style: none; display: flex; flex-direction: column; gap: 7px; font-variant-numeric: tabular-nums; }
      .footer-hours li{ display: flex; justify-content: space-between; font-size: 13.5px; color: color-mix(in oklab, var(--cream) 82%, transparent); padding-bottom: 6px; border-bottom: 1px solid color-mix(in oklab, var(--cream) 8%, transparent); }
      .footer-hours li span:first-child{ font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: color-mix(in oklab, var(--cream) 55%, transparent); align-self: center; }
      .footer-col h4{ font-family: var(--sans); font-size: 10px; letter-spacing: .28em; text-transform: uppercase; color: var(--cream-3); margin-bottom: 22px; font-weight: 500; }
      .footer-col ul{ list-style: none; display: flex; flex-direction: column; gap: 12px; }
      .footer-col a{ color: color-mix(in oklab, var(--cream) 82%, transparent); font-size: 15px; transition: color .3s var(--ease); }
      .footer-col a:hover{ color: var(--candle); }
      .footer-col p{ color: color-mix(in oklab, var(--cream) 72%, transparent); font-size: 14px; line-height: 1.75; }
      .footer-bottom{ max-width: 1600px; margin: 36px auto 0; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: color-mix(in oklab, var(--cream) 55%, transparent); }
      @media (max-width: 900px){
        .footer{ padding: 60px 20px 24px; }
        .footer-top{ grid-template-columns: 1fr 1fr; gap: 40px; }
      }
      @media (max-width: 600px){
        .footer-top{ grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(css);
  }

  /* ============== IMAGE PICKER ============== */
  function mountImagePicker(){
    const ALL = {
      food: Array.from({length:35},(_,i)=>i+1).filter(n=>![6,24].includes(n)).map(n=>`photos/food-${String(n).padStart(2,'0')}.jpg`),
      interior: Array.from({length:12},(_,i)=>`photos/interior-${String(i+1).padStart(2,'0')}.jpg`),
      team: Array.from({length:4},(_,i)=>`photos/team-${String(i+1).padStart(2,'0')}.jpg`),
    };
    const POOL = [...ALL.food, ...ALL.interior, ...ALL.team];

    const STORAGE_KEY = 'agaton-image-swaps';
    const load = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch(_) { return {}; } };
    const save = (m) => localStorage.setItem(STORAGE_KEY, JSON.stringify(m));

    // Build a stable key for each image based on its DOM path + original src
    const keyOf = (img) => {
      const orig = img.dataset.origSrc || img.getAttribute('src');
      let path = '';
      let el = img;
      while (el && el !== document.body){
        const parent = el.parentElement;
        if (!parent) break;
        const idx = Array.from(parent.children).indexOf(el);
        path = `${el.tagName}:${idx}>` + path;
        el = parent;
      }
      return location.pathname.split('/').pop() + '::' + path + '::' + orig;
    };

    // Apply persisted swaps + make clickable
    const swaps = load();
    const enhance = () => {
      document.querySelectorAll('img').forEach(img => {
        if (img.dataset.pickerReady) return;
        // Skip logos, nav icons, footer brand
        const src = img.getAttribute('src') || '';
        if (!src.includes('photos/')) return;
        if (!img.dataset.origSrc) img.dataset.origSrc = src;
        img.dataset.pickerReady = '1';
        const k = keyOf(img);
        if (swaps[k]) img.src = swaps[k];
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
          e.preventDefault(); e.stopPropagation();
          openPicker(img);
        });
      });
    };

    let overlay = null;
    function openPicker(targetImg){
      if (overlay) overlay.remove();
      const currentSrc = targetImg.getAttribute('src');
      overlay = document.createElement('div');
      overlay.className = 'agaton-img-picker';
      overlay.innerHTML = `
        <div class="aip-backdrop"></div>
        <div class="aip-panel">
          <div class="aip-head">
            <div>
              <div class="aip-eyebrow">Byt bild</div>
              <h3>Välj från biblioteket</h3>
            </div>
            <button class="aip-close" aria-label="Stäng">✕</button>
          </div>
          <div class="aip-tabs">
            <button class="aip-tab active" data-tab="all">Alla</button>
            <button class="aip-tab" data-tab="food">Mat</button>
            <button class="aip-tab" data-tab="interior">Miljö</button>
            <button class="aip-tab" data-tab="team">Team</button>
          </div>
          <div class="aip-grid"></div>
          <div class="aip-foot">
            <button class="aip-reset">Återställ till original</button>
            <div class="aip-hint">Klicka på en bild för att välja</div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      const grid = overlay.querySelector('.aip-grid');
      const renderGrid = (tab) => {
        const list = tab === 'all' ? POOL : ALL[tab];
        grid.innerHTML = list.map(src => `
          <button class="aip-thumb ${src === currentSrc ? 'active' : ''}" data-src="${src}">
            <img src="${src}" loading="lazy" alt="">
          </button>
        `).join('');
      };
      renderGrid('all');

      const close = () => { overlay.remove(); overlay = null; document.body.style.overflow = ''; };
      overlay.querySelector('.aip-close').addEventListener('click', close);
      overlay.querySelector('.aip-backdrop').addEventListener('click', close);

      overlay.querySelectorAll('.aip-tab').forEach(t => {
        t.addEventListener('click', () => {
          overlay.querySelectorAll('.aip-tab').forEach(x => x.classList.toggle('active', x === t));
          renderGrid(t.dataset.tab);
        });
      });

      grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.aip-thumb');
        if (!btn) return;
        const newSrc = btn.dataset.src;
        targetImg.src = newSrc;
        const m = load();
        const k = keyOf(targetImg);
        if (newSrc === targetImg.dataset.origSrc) delete m[k]; else m[k] = newSrc;
        save(m);
        close();
      });

      overlay.querySelector('.aip-reset').addEventListener('click', () => {
        const orig = targetImg.dataset.origSrc;
        targetImg.src = orig;
        const m = load();
        delete m[keyOf(targetImg)];
        save(m);
        close();
      });

      // Esc to close
      const onKey = (e) => { if (e.key === 'Escape'){ close(); window.removeEventListener('keydown', onKey); } };
      window.addEventListener('keydown', onKey);
    }

    // CSS for picker
    if (!document.getElementById('aip-css')){
      const css = document.createElement('style');
      css.id = 'aip-css';
      css.textContent = `
        img[data-picker-ready]{ transition: outline .2s ease, outline-offset .2s ease; }
        img[data-picker-ready]:hover{ outline: 3px solid var(--brick, #B23A2E); outline-offset: -3px; }
        .agaton-img-picker{ position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center; }
        .aip-backdrop{ position: absolute; inset: 0; background: rgba(20,12,8,.72); backdrop-filter: blur(6px); }
        .aip-panel{ position: relative; width: min(980px, 92vw); max-height: 88vh; background: var(--cream, #FBF8F4); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 40px 100px rgba(0,0,0,.5); }
        .aip-head{ display: flex; justify-content: space-between; align-items: flex-start; padding: 28px 32px 20px; border-bottom: 1px solid rgba(46,26,16,.08); }
        .aip-eyebrow{ font-family: var(--sans, system-ui); font-size: 10px; letter-spacing: .28em; text-transform: uppercase; color: var(--brick, #B23A2E); font-weight: 600; margin-bottom: 6px; }
        .aip-head h3{ font-family: var(--display, 'Cormorant Garamond', serif); font-style: italic; font-weight: 400; font-size: 28px; color: var(--wood, #2E1A10); }
        .aip-close{ background: transparent; border: 1px solid rgba(46,26,16,.2); width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 14px; color: var(--wood, #2E1A10); transition: background .2s, border-color .2s; }
        .aip-close:hover{ background: var(--wood, #2E1A10); color: var(--cream, #FBF8F4); border-color: var(--wood, #2E1A10); }
        .aip-tabs{ display: flex; gap: 8px; padding: 18px 32px 0; flex-wrap: wrap; }
        .aip-tab{ background: transparent; border: 1px solid rgba(46,26,16,.15); border-radius: 999px; padding: 7px 16px; font-family: var(--sans, system-ui); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; font-weight: 500; color: var(--wood, #2E1A10); cursor: pointer; transition: all .2s ease; }
        .aip-tab:hover{ border-color: var(--brick, #B23A2E); }
        .aip-tab.active{ background: var(--wood, #2E1A10); color: var(--cream, #FBF8F4); border-color: var(--wood, #2E1A10); }
        .aip-grid{ display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; padding: 20px 32px; overflow-y: auto; flex: 1; }
        .aip-thumb{ position: relative; aspect-ratio: 1; border: 2px solid transparent; border-radius: 8px; overflow: hidden; cursor: pointer; padding: 0; background: #eee; transition: transform .2s ease, border-color .2s ease; }
        .aip-thumb img{ width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
        .aip-thumb:hover{ border-color: var(--brick, #B23A2E); transform: translateY(-2px); }
        .aip-thumb:hover img{ transform: scale(1.05); }
        .aip-thumb.active{ border-color: var(--brick, #B23A2E); box-shadow: 0 0 0 2px rgba(178,58,46,.25); }
        .aip-thumb.active::after{ content: "✓"; position: absolute; top: 6px; right: 6px; background: var(--brick, #B23A2E); color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; }
        .aip-foot{ display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; border-top: 1px solid rgba(46,26,16,.08); background: rgba(46,26,16,.03); }
        .aip-reset{ background: transparent; border: none; color: var(--wood, #2E1A10); font-family: var(--sans, system-ui); font-size: 12px; letter-spacing: .14em; text-transform: uppercase; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; padding: 6px 0; }
        .aip-reset:hover{ color: var(--brick, #B23A2E); }
        .aip-hint{ font-family: var(--sans, system-ui); font-size: 11px; color: rgba(46,26,16,.55); letter-spacing: .08em; }
        @media (max-width: 600px){
          .aip-head{ padding: 20px; }
          .aip-head h3{ font-size: 22px; }
          .aip-tabs{ padding: 14px 20px 0; }
          .aip-grid{ padding: 16px 20px; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); }
          .aip-foot{ padding: 12px 20px; flex-direction: column; gap: 8px; align-items: flex-start; }
        }
      `;
      document.head.appendChild(css);
    }

    enhance();
    // Re-run after DOM mutations (e.g. navbar injected later)
    const mo = new MutationObserver(() => enhance());
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => { render(); mountTweaks(); mountImagePicker(); });
  } else {
    render();
    mountTweaks();
    mountImagePicker();
  }
})();
