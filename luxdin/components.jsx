// LuxDin — Shared UI components (Nav, Footer, Hero variants, Lightbox, Tweaks)
// Exposes to window.

const { useState, useEffect, useRef, useMemo } = React;

// ---------- Small helpers ----------
function cx(...a){ return a.filter(Boolean).join(" "); }

// Subtle striped placeholder visual with optional label OR a real image
function Placeholder({ label = "", img = null, style = {}, className = "" }) {
  if (img) {
    return (
      <div
        className={cx("ld-placeholder ld-placeholder-img", className)}
        style={{ ...style, backgroundImage: `url("${img}")` }}
        role="img"
        aria-label={label || "image"}
      />
    );
  }
  return (
    <div
      className={cx("ld-placeholder", className)}
      data-label={label}
      style={style}
      role="img"
      aria-label={label || "placeholder"}
    />
  );
}

// Icon set (minimal, stroked)
function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "sun":   return <svg {...common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
    case "moon":  return <svg {...common}><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"/></svg>;
    case "menu":  return <svg {...common}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
    case "close": return <svg {...common}><path d="M18 6L6 18M6 6l12 12"/></svg>;
    case "chev-l": return <svg {...common}><path d="M15 18l-6-6 6-6"/></svg>;
    case "chev-r": return <svg {...common}><path d="M9 18l6-6-6-6"/></svg>;
    case "tune":  return <svg {...common}><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>;
    case "plus":  return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case "minus": return <svg {...common}><path d="M5 12h14"/></svg>;
    case "check": return <svg {...common}><path d="M20 6L9 17l-5-5"/></svg>;
    default: return null;
  }
}

// Scroll reveal
function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".ld-reveal");
    // Immediately reveal everything — IntersectionObserver is flaky in preview iframes.
    // Animation still plays because CSS transitions trigger on class add.
    const reveal = () => {
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.2) el.classList.add("is-in");
      });
    };
    requestAnimationFrame(reveal);
    setTimeout(reveal, 300);

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-in"); }),
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach(el => io.observe(el));

    const onScroll = () => reveal();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [ref]);
}

// ---------- Nav ----------
function Nav({ page, onNav, lang, setLang, theme, setTheme, t }) {
  const [open, setOpen] = useState(false);
  const items = [
    { id: "home", label: t.nav.home },
    { id: "menu", label: t.nav.menu },
    { id: "lunch", label: t.nav.lunch },
    { id: "about", label: t.nav.about },
    { id: "chambre", label: t.nav.chambre },
    { id: "julbord", label: t.nav.julbord },
    { id: "contact", label: t.nav.contact }
  ];

  return (
    <nav className="ld-nav">
      <div className="ld-nav-inner">
        <div className="ld-logo" onClick={() => onNav("home")} role="button" tabIndex={0}>
          <span className="ld-logo-mark"></span>LuxDin
        </div>
        <ul className="ld-nav-links">
          {items.map(it => (
            <li key={it.id}>
              <a
                className={cx("ld-nav-link", page === it.id && "is-active")}
                onClick={() => onNav(it.id)}
              >{it.label}</a>
            </li>
          ))}
        </ul>
        <div className="ld-nav-actions">
          <div className="ld-lang" role="group" aria-label="language">
            <button className={cx(lang === "sv" && "is-active")} onClick={() => setLang("sv")}>SV</button>
            <button className={cx(lang === "en" && "is-active")} onClick={() => setLang("en")}>EN</button>
          </div>
          <button className="ld-icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="toggle theme">
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <button className="ld-btn ld-btn-primary ld-btn-sm" onClick={() => onNav("booking")}>
            {t.nav.booking}
          </button>
          <button className="ld-icon-btn ld-mobile-toggle" onClick={() => setOpen(v => !v)} aria-label="menu">
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <div style={{
          padding: "12px 20px 24px",
          borderTop: "1px solid var(--ld-line-2)",
          display: "flex", flexDirection: "column", gap: 4
        }}>
          {items.map(it => (
            <a key={it.id} className={cx("ld-nav-link", page === it.id && "is-active")}
               onClick={() => { onNav(it.id); setOpen(false); }}>
              {it.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---------- Footer ----------
function Footer({ t }) {
  return (
    <footer className="ld-footer">
      <div className="ld-container">
        <div className="ld-footer-top">
          <div className="ld-footer-brand">
            <div className="ld-logo" style={{ color: "var(--ld-highlight)" }}>
              <span className="ld-logo-mark"></span>LuxDin
            </div>
            <p>{t.footer.blurb}</p>
          </div>
          <div>
            <h5>{t.footer.visit}</h5>
            <p style={{ whiteSpace: "pre-line" }}>{t.footer.address}</p>
          </div>
          <div>
            <h5>{t.footer.hours}</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
              {t.footer.hoursList.map(([l,v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5>{t.footer.reach}</h5>
            <a href={`tel:${t.footer.phone}`}>{t.footer.phone}</a><br/>
            <a href={`mailto:${t.footer.emailAddr}`}>{t.footer.emailAddr}</a>
          </div>
        </div>
        <div className="ld-footer-bottom">
          <span>© 2026 LuxDin</span>
          <span>{t.tagline}</span>
        </div>
      </div>
    </footer>
  );
}

// ---------- Lightbox ----------
function Lightbox({ item, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);
  if (!item) return null;
  return (
    <div className="ld-lightbox" onClick={onClose}>
      <button className="ld-lightbox-close" onClick={onClose}><Icon name="close" size={22}/></button>
      <div className="ld-lightbox-inner" onClick={e => e.stopPropagation()}>
        <Placeholder label={item.label} className="ld-lightbox-frame" />
        {item.caption && <div className="ld-lightbox-cap">{item.caption}</div>}
      </div>
    </div>
  );
}

// ---------- Tweaks panel ----------
function TweaksPanel({ enabled, tweaks, setTweaks }) {
  const [collapsed, setCollapsed] = useState(false);
  if (!enabled) return null;

  const hue = tweaks.accentHue;
  const swatches = [
    { id: "brass",  hue: 32 },   // default warm
    { id: "sage",   hue: 140 },
    { id: "wine",   hue: 0 },
    { id: "ink",    hue: 220 },
    { id: "plum",   hue: 300 }
  ];

  return (
    <div className={cx("ld-tweaks", collapsed && "is-collapsed")}>
      <div className="ld-tweaks-head" onClick={() => setCollapsed(v => !v)}>
        <h5>Tweaks</h5>
        <Icon name={collapsed ? "plus" : "minus"} size={14}/>
      </div>
      <div className="ld-tweaks-body">
        <div className="ld-tweak-row">
          <label>Stilvariant</label>
          <div className="ld-tweak-options">
            {["classic","modern"].map(v => (
              <button key={v}
                className={cx("ld-tweak-opt", tweaks.hero === v && "is-active")}
                onClick={() => setTweaks({ ...tweaks, hero: v })}>{v}</button>
            ))}
          </div>
        </div>
        <div className="ld-tweak-row">
          <label>Accentton</label>
          <div className="ld-tweak-options">
            {swatches.map(s => (
              <div key={s.id}
                className={cx("ld-tweak-swatch", hue === s.hue && "is-active")}
                style={{ background: `oklch(0.62 0.12 ${s.hue})` }}
                onClick={() => setTweaks({ ...tweaks, accentHue: s.hue })}
                title={s.id}/>
            ))}
          </div>
        </div>
        <div className="ld-tweak-row">
          <label>Typografi</label>
          <div className="ld-tweak-options">
            {[
              { id: "cormorant", label: "Cormorant" },
              { id: "fraunces",  label: "Fraunces" },
              { id: "ppneue",    label: "Neue" }
            ].map(f => (
              <button key={f.id}
                className={cx("ld-tweak-opt", tweaks.font === f.id && "is-active")}
                onClick={() => setTweaks({ ...tweaks, font: f.id })}>{f.label}</button>
            ))}
          </div>
        </div>
        <div className="ld-tweak-row">
          <label>Täthet</label>
          <div className="ld-tweak-options">
            {["airy","normal","dense"].map(d => (
              <button key={d}
                className={cx("ld-tweak-opt", tweaks.density === d && "is-active")}
                onClick={() => setTweaks({ ...tweaks, density: d })}>{d}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Placeholder, Icon, Nav, Footer, Lightbox, TweaksPanel, cx, useReveal });
