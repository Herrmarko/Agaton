// LuxDin — Pages (Home variants, Menu, Lunch, Booking, About, Julbord, Chambre, Contact)
const { useState: useStateP, useEffect: useEffectP, useMemo: useMemoP } = React;

// ========================= HERO VARIANTS =========================
// CLASSIC — matches original Dinely: dark moody interior hero, centered italic script
function HeroClassic({ t, onNav, onOpenLightbox }) {
  const IMG = window.LD_IMAGES;
  return (
    <section className="ld-hero-classic">
      <div className="hcl-bg">
        <Placeholder img={IMG.heroInterior} label="Matsalen — kväll" style={{ width: "100%", height: "100%", borderRadius: 0, border: 0 }}/>
      </div>
      <div className="hcl-content">
        <div className="hcl-rule"><span/></div>
        <span className="hcl-eyebrow ld-reveal">{t.hero.eyebrow}</span>
        <h1 className="hcl-title ld-reveal">
          <em>Savor</em> the <em>exquisite</em> <em>flavors</em>.
        </h1>
        <p className="hcl-lead ld-reveal">{t.hero.lead}</p>
        <div className="hcl-actions ld-reveal">
          <button className="ld-btn ld-btn-accent ld-btn-lg" onClick={() => onNav("booking")}>{t.hero.cta1}</button>
          <button className="ld-btn ld-btn-ghost ld-btn-lg" style={{ color: "#F6F1E8", borderColor: "rgba(246,241,232,.4)" }}
            onClick={() => onNav("menu")}>{t.hero.cta2}</button>
        </div>
        <div className="hcl-meta ld-reveal">
          {t.hero.meta.map(m => (
            <div key={m.label}>
              <span>{m.label}</span>
              <strong>{m.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// MODERN — matches LuxDin v2: light cream, centered italic script title with subdued overlay word
function HeroModern({ t, onNav, onOpenLightbox }) {
  const IMG = window.LD_IMAGES;
  return (
    <section className="ld-hero-modern">
      <div className="hm2-top ld-reveal">
        <div className="hm2-rule"><span/></div>
        <span className="hm2-eyebrow">{t.hero.eyebrow}</span>
        <h1 className="hm2-title">
          Upptäck Vår<br/>
          <em>Dining</em> <span className="hm2-ghost">Experience</span>
        </h1>
        <p className="hm2-lead">{t.hero.lead}</p>
        <div className="hm2-actions">
          <button className="ld-btn ld-btn-accent ld-btn-lg" onClick={() => onNav("booking")}>{t.hero.cta1}</button>
          <button className="ld-btn ld-btn-ghost ld-btn-lg" onClick={() => onNav("menu")}>{t.hero.cta2}</button>
        </div>
      </div>
      <div className="hm2-image ld-reveal" onClick={() => onOpenLightbox({ label: "Matsalen", img: IMG.heroInterior, caption: "Matsalen · kvällsbelysning" })}>
        <Placeholder img={IMG.heroInterior} label="Matsalen" style={{ width: "100%", height: "100%", borderRadius: 0, border: 0 }}/>
      </div>
    </section>
  );
}

// ========================= HOME =========================
function HomePage({ t, onNav, onOpenLightbox, variant }) {
  const ref = React.useRef(null);
  useReveal(ref);
  const Hero = variant === "modern" ? HeroModern : HeroClassic;
  return (
    <div ref={ref} data-variant={variant || "classic"}>
      <Hero t={t} onNav={onNav} onOpenLightbox={onOpenLightbox} />

      {/* About features */}
      <section className="ld-section">
        <div className="ld-container">
          <div className="ld-section-header ld-reveal">
            <span className="ld-eyebrow">{t.about.eyebrow}</span>
            <h2 className="ld-h1">{t.about.title1}<em className="ld-italic">{t.about.title1em}</em>{t.about.title2}</h2>
            <p>{t.about.lead}</p>
          </div>
          <div className="ld-feature-trio">
            {t.about.features.map(f => (
              <div key={f.n} className="ld-feature-card ld-reveal">
                <span className="ld-num">{f.n}</span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu teaser — big food image + text + two buttons */}
      <section className="ld-section ld-menu-teaser">
        <div className="ld-container ld-menu-teaser-grid ld-reveal">
          <div className="mt-visual" onClick={() => onOpenLightbox({ label: "Matsalen — uppdukat", img: window.LD_IMAGES.menuSpread, caption: "Matsalen · uppdukat" })}>
            <Placeholder img={window.LD_IMAGES.menuSpread} label="Matsalen — uppdukat" style={{ width: "100%", height: "100%" }}/>
          </div>
          <div className="mt-text">
            <span className="ld-eyebrow">{t.menuTeaser.eyebrow}</span>
            <h2 className="ld-h1" style={{ margin: "16px 0 20px" }}>
              {t.menuTeaser.title}<em className="ld-italic">{t.menuTeaser.titleem}</em>.
            </h2>
            <p className="ld-body-lg">{t.menuTeaser.lead}</p>
            <ul className="mt-bullets">
              {t.menuTeaser.bullets.map((b,i) => <li key={i}>{b}</li>)}
            </ul>
            <div className="mt-actions">
              <button className="ld-btn ld-btn-primary ld-btn-lg" onClick={() => onNav("menu")}>{t.menuTeaser.cta1}</button>
              <button className="ld-btn ld-btn-ghost ld-btn-lg" onClick={() => onNav("lunch")}>{t.menuTeaser.cta2}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / press */}
      <section className="ld-section ld-testimonial-section">
        <div className="ld-container ld-testimonial ld-reveal">
          <div className="tt-portrait">
            <Placeholder img={window.LD_IMAGES.testimonialPortrait} label="Kritiker" style={{ width: "100%", height: "100%" }}/>
          </div>
          <div className="tt-body">
            <span className="ld-eyebrow" style={{ color: "var(--ld-highlight)" }}>{t.testimonial.eyebrow}</span>
            <blockquote>&ldquo;{t.testimonial.quote}&rdquo;</blockquote>
            <cite>{t.testimonial.cite}</cite>
          </div>
        </div>
      </section>

      {/* Chef narrative */}
      <section className="ld-section" style={{ background: "var(--ld-bg-2)" }}>
        <div className="ld-container">
          <div className="ld-narrative ld-reveal">
            <div className="ld-narrative-visual">
              <Placeholder img={window.LD_IMAGES.chefPass} label="Kökschef vid passet" style={{ width: "100%", height: "100%" }}/>
            </div>
            <div>
              <span className="ld-eyebrow">Kökschefen</span>
              <blockquote>{t.chef.quote}</blockquote>
              <cite>{t.chef.cite}</cite>
              <div style={{ marginTop: 32 }}>
                <button className="ld-btn ld-btn-primary" onClick={() => onNav("about")}>{t.nav.about}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA — booking */}
      <section className="ld-section">
        <div className="ld-container ld-reveal ld-booking-cta">
          <span className="ld-eyebrow" style={{ color: "var(--ld-highlight)" }}>Boka bord</span>
          <h2 className="ld-h1" style={{ margin: "16px 0 20px", color: "var(--ld-bg)" }}>
            En kväll skriven för er.
          </h2>
          <p style={{ maxWidth: 540, margin: "0 auto 32px", color: "color-mix(in oklab, var(--ld-bg) 75%, transparent)", fontSize: 17, lineHeight: 1.7 }}>
            {t.booking.lead}
          </p>
          <button className="ld-btn ld-btn-accent ld-btn-lg" onClick={() => onNav("booking")}>{t.hero.cta1}</button>
        </div>
      </section>
    </div>
  );
}

// ========================= MENU =========================
function MenuPage({ t, lang, onNav }) {
  const [filter, setFilter] = useStateP("all");
  const ref = React.useRef(null);
  useReveal(ref);

  const items = window.LD_MENU_ITEMS;
  const filtered = useMemoP(() => {
    if (filter === "all") return items;
    if (filter === "v") return items.filter(i => i.tags.includes("v"));
    return items.filter(i => i.cat === filter);
  }, [filter]);

  const grouped = useMemoP(() => {
    const g = { starter: [], main: [], dessert: [] };
    filtered.forEach(i => { if (g[i.cat]) g[i.cat].push(i); });
    return g;
  }, [filtered]);

  return (
    <div ref={ref}>
      <section className="ld-menu-hero ld-reveal">
        <div className="ld-menu-hero-img">
          <Placeholder img={window.LD_IMAGES.menuScene} label="Matsalen · uppdukat" style={{ width: "100%", height: "100%", borderRadius: 0, border: 0 }}/>
        </div>
        <div className="ld-menu-hero-text">
          <span className="ld-eyebrow">{t.menu.eyebrow}</span>
          <h1 className="ld-h1" style={{ margin: "18px 0 20px", fontSize: "clamp(52px, 7vw, 104px)" }}>
            {t.menu.title}<em className="ld-italic">{t.menu.titleem}</em>{t.menu.title2}
          </h1>
          <p className="ld-body-lg">{t.menu.lead}</p>
          <div style={{ display: "inline-flex", gap: 12, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <button className="ld-btn ld-btn-accent" onClick={() => onNav("booking")}>{t.nav.booking}</button>
            <button className="ld-btn ld-btn-ghost" onClick={() => onNav("lunch")}>{t.nav.lunch}</button>
          </div>
        </div>
      </section>
      <div className="ld-menu-filter">
        <div className="ld-filter-row">
          {t.menu.filters.map(f => (
            <button key={f.id}
              className={cx("ld-filter-btn", filter === f.id && "is-active")}
              onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="ld-menu-list">
        {["starter","main","dessert"].map(cat => {
          const arr = grouped[cat] || [];
          if (!arr.length) return null;
          return (
            <div key={cat} className="ld-menu-category ld-reveal">
              <div className="ld-menu-category-title">
                <h3>{t.menu.categories[cat]}</h3>
                <span className="ld-rule"/>
              </div>
              {arr.map((it, i) => {
                const d = lang === "en" ? it.en : it.sv;
                return (
                  <div key={i} className="ld-menu-item">
                    <div>
                      <div className="ld-menu-item-top">
                        <h4>{d.n}</h4>
                        <span className="tags">
                          {it.tags.includes("signature") && <span className="tag tag-signature">Signatur</span>}
                          {it.tags.includes("v") && <span className="tag tag-v">V</span>}
                          {it.tags.includes("gf") && <span className="tag tag-gf">GF</span>}
                        </span>
                      </div>
                      <p>{d.desc}</p>
                    </div>
                    <span className="price">{it.price}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div style={{ textAlign: "center", marginTop: 64 }}>
          <button className="ld-btn ld-btn-primary" onClick={() => onNav("booking")}>{t.nav.booking}</button>
        </div>
      </div>
    </div>
  );
}

// ========================= LUNCH =========================
function LunchPage({ t, onNav, onOpenLightbox }) {
  const ref = React.useRef(null);
  useReveal(ref);
  const l = t.lunchPage;
  return (
    <div ref={ref}>
      <section className="ld-lunch-hero ld-reveal">
        <div className="ld-lunch-hero-img">
          <Placeholder img={window.LD_IMAGES.lunchScene} label="Lunch i matsalen" style={{ width: "100%", height: "100%", borderRadius: 0, border: 0 }}/>
        </div>
        <div className="ld-lunch-hero-text">
          <span className="ld-eyebrow">{l.eyebrow}</span>
          <h1 className="ld-h1" style={{ margin: "18px 0 20px", fontSize: "clamp(52px, 7vw, 104px)" }}>
            {l.title}<em className="ld-italic">{l.titleem}</em>{l.title2}
          </h1>
          <p className="ld-body-lg">{l.lead}</p>
          <div className="ld-lunch-meta">
            <div><span>Tider</span><strong>{l.hours}</strong></div>
            <div><span>Dagens</span><strong>{l.price}</strong></div>
            <div><span>Tillägg</span><strong>{l.priceUp}</strong></div>
          </div>
        </div>
      </section>

      <section className="ld-section">
        <div className="ld-container">
          <div className="ld-section-header ld-reveal" style={{ marginBottom: 40 }}>
            <span className="ld-eyebrow">{l.today}</span>
            <h2 className="ld-h2">Vecka 47</h2>
          </div>
          <div className="ld-lunch-table ld-reveal">
            {l.weekdays.map((w, i) => (
              <div key={i} className={cx("ld-lunch-row", w.status === "Stängt" || w.status === "Closed" ? "is-closed" : "")}>
                <div className="ll-day">{w.day}</div>
                {w.status ? (
                  <div className="ll-closed">{w.status}</div>
                ) : (
                  <>
                    <div className="ll-dish">{w.dish}</div>
                    <div className="ll-alt">{w.alt}</div>
                  </>
                )}
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", color: "var(--ld-muted)", fontSize: 14, marginTop: 40, fontStyle: "italic" }}>
            {l.footnote}
          </p>
        </div>
      </section>

      <section className="ld-section" style={{ background: "var(--ld-bg-2)", textAlign: "center" }}>
        <div className="ld-container-narrow ld-reveal">
          <span className="ld-eyebrow">Boka lunchbord</span>
          <h2 className="ld-h2" style={{ margin: "14px 0 20px" }}>45 minuter som räcker hela dagen.</h2>
          <p className="ld-body-lg" style={{ maxWidth: 560, margin: "0 auto 28px" }}>
            Tajt tid? Säg det när ni bokar så ser vi till att ni är tillbaka vid skrivbordet i tid.
          </p>
          <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button className="ld-btn ld-btn-primary ld-btn-lg" onClick={() => onNav("booking")}>{t.nav.booking}</button>
            <button className="ld-btn ld-btn-ghost ld-btn-lg" onClick={() => onNav("menu")}>À la carte</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ========================= BOOKING =========================
function BookingPage({ t, onNav }) {
  const [step, setStep] = useStateP(0);
  const [data, setData] = useStateP({
    date: null, time: null, guests: 2, type: "dinner",
    name: "", email: "", phone: "", notes: ""
  });

  // calendar — next 42 days
  const today = new Date();
  const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthName = startMonth.toLocaleString("sv-SE", { month: "long", year: "numeric" });
  const firstDay = (startMonth.getDay() + 6) % 7; // monday-start
  const daysInMonth = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
  const cells = [];
  for (let i=0; i<firstDay; i++) cells.push(null);
  for (let d=1; d<=daysInMonth; d++) cells.push(d);

  const times = ["17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00"];
  const unavailable = new Set(["18:00","20:30"]);

  const steps = t.booking.steps;
  const canNext =
    (step === 0 && data.date) ||
    (step === 1 && data.time) ||
    (step === 2 && data.guests > 0) ||
    (step === 3 && data.name && data.email);

  return (
    <div className="ld-booking-wrap">
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <span className="ld-eyebrow">{t.nav.booking}</span>
        <h1 className="ld-h1" style={{ margin: "16px 0 14px" }}>{t.booking.title}</h1>
        <p className="ld-body" style={{ maxWidth: 540, margin: "0 auto" }}>{t.booking.lead}</p>
      </div>

      <div className="ld-booking-card">
        <div className="ld-booking-steps">
          <div className="ld-booking-step-bar"/>
          {steps.map((s, i) => (
            <div key={s} className={cx("ld-booking-step", i === step && "is-active", i < step && "is-done")}>
              <span className="ld-booking-step-num">{i < step ? "✓" : i+1}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div>
            <div className="ld-calendar-header">
              <h4 style={{ textTransform: "capitalize" }}>{monthName}</h4>
              <div style={{ display: "flex", gap: 4 }}>
                {[["dinner", t.booking.dinner], ["lunch", t.booking.lunch]].map(([k,l]) => (
                  <button key={k}
                    className={cx("ld-chip", data.type === k && "ld-chip-accent")}
                    style={{ cursor: "pointer" }}
                    onClick={() => setData({...data, type: k})}>{l}</button>
                ))}
              </div>
            </div>
            <div className="ld-calendar">
              {["M","T","O","T","F","L","S"].map((d,i) => (
                <div key={i} className="ld-calendar-dow">{d}</div>
              ))}
              {cells.map((c, i) => {
                if (!c) return <div key={i}/>;
                const dateStr = `${startMonth.getFullYear()}-${String(startMonth.getMonth()+1).padStart(2,"0")}-${String(c).padStart(2,"0")}`;
                const disabled = c < today.getDate();
                const dateObj = new Date(today.getFullYear(), today.getMonth(), c);
                const closed = dateObj.getDay() === 0 || dateObj.getDay() === 1;
                const dis = disabled || closed;
                return (
                  <button key={i}
                    className={cx("ld-calendar-cell",
                      dis && "is-disabled",
                      data.date === dateStr && "is-selected",
                      c === today.getDate() && "is-today"
                    )}
                    disabled={dis}
                    onClick={() => !dis && setData({...data, date: dateStr})}>
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h4 className="ld-h3" style={{ margin: "8px 0 4px" }}>Välj tid</h4>
            <p className="ld-small">Vi serverar avsmakningsmenyn hela kvällen.</p>
            <div className="ld-time-grid">
              {times.map(tm => {
                const u = unavailable.has(tm);
                return (
                  <button key={tm}
                    className={cx("ld-time-slot", data.time === tm && "is-selected", u && "is-unavail")}
                    disabled={u}
                    onClick={() => !u && setData({...data, time: tm})}>
                    {tm}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <span className="ld-label">{t.booking.labelGuests}</span>
            <div className="ld-guest-picker">
              <button onClick={() => setData({...data, guests: Math.max(1, data.guests-1)})}><Icon name="minus"/></button>
              <div className="count ld-num">{data.guests}</div>
              <button onClick={() => setData({...data, guests: Math.min(12, data.guests+1)})}><Icon name="plus"/></button>
            </div>
            <p className="ld-small">Sällskap över 8 gäster — kontakta oss för Chambre Séparée.</p>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label className="ld-label">{t.booking.name}</label>
              <input className="ld-input" value={data.name} onChange={e => setData({...data, name: e.target.value})}/>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label className="ld-label">{t.booking.email}</label>
                <input type="email" className="ld-input" value={data.email} onChange={e => setData({...data, email: e.target.value})}/>
              </div>
              <div>
                <label className="ld-label">{t.booking.phone}</label>
                <input type="tel" className="ld-input" value={data.phone} onChange={e => setData({...data, phone: e.target.value})}/>
              </div>
            </div>
            <div>
              <label className="ld-label">{t.booking.notes}</label>
              <textarea className="ld-textarea" rows={3} value={data.notes} onChange={e => setData({...data, notes: e.target.value})}/>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="ld-success">
            <div className="ld-success-mark"><Icon name="check" size={40}/></div>
            <h2 className="ld-h2">{t.booking.confirmTitle}</h2>
            <p className="ld-body" style={{ maxWidth: 460, margin: "12px auto 0" }}>{t.booking.confirmBody}</p>
            <div className="ld-summary">
              <div><span>Datum</span><strong>{data.date}</strong></div>
              <div><span>Tid</span><strong>{data.time}</strong></div>
              <div><span>Gäster</span><strong>{data.guests}</strong></div>
              <div><span>Namn</span><strong>{data.name}</strong></div>
            </div>
            <button className="ld-btn ld-btn-primary" onClick={() => onNav("home")}>Till startsidan</button>
          </div>
        )}

        {step < 4 && (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, gap: 12 }}>
            <button className="ld-btn ld-btn-ghost" disabled={step === 0}
              onClick={() => setStep(step-1)}>{t.booking.back}</button>
            <button className="ld-btn ld-btn-primary" disabled={!canNext}
              onClick={() => setStep(step+1)}>
              {step === 3 ? t.booking.submit : t.booking.next}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ========================= ABOUT =========================
function AboutPage({ t, onNav }) {
  const ref = React.useRef(null);
  useReveal(ref);
  return (
    <div ref={ref}>
      <section className="ld-section">
        <div className="ld-container">
          <div className="ld-section-header ld-reveal">
            <span className="ld-eyebrow">{t.about.eyebrow}</span>
            <h1 className="ld-h1">{t.about.title1}<em className="ld-italic">{t.about.title1em}</em>{t.about.title2}</h1>
            <p>{t.about.lead}</p>
          </div>
          <div className="ld-feature-split ld-reveal">
            <div className="ld-feature-split-visual">
              <Placeholder img={window.LD_IMAGES.brigade} label="Kökschef & brigad" style={{ width: "100%", height: "100%" }}/>
            </div>
            <div>
              <span className="ld-eyebrow">Brigaden</span>
              <h2 className="ld-h2">Sex händer, ett pass.</h2>
              <p className="ld-body-lg" style={{ marginTop: 16 }}>
                Vi är ett litet kök med tre kockar på passet. Det ger oss tid att vara noggranna — och utrymme att improvisera när något oväntat kommer in genom bakdörren.
              </p>
              <ul>
                <li>Elin Holm · Kökschef sedan 2014</li>
                <li>Marcus Lind · Souschef</li>
                <li>Nora Asp · Patisserie</li>
                <li>Jonatan Ek · Sommelier</li>
              </ul>
              <button className="ld-btn ld-btn-primary" onClick={() => onNav("booking")}>{t.nav.booking}</button>
            </div>
          </div>
        </div>
      </section>
      <section className="ld-section" style={{ background: "var(--ld-bg-2)" }}>
        <div className="ld-container ld-narrative ld-reveal">
          <div>
            <span className="ld-eyebrow">Filosofi</span>
            <blockquote>{t.chef.quote}</blockquote>
            <cite>{t.chef.cite}</cite>
          </div>
          <div className="ld-narrative-visual">
            <Placeholder img={window.LD_IMAGES.produce} label="Råvara · närbild" style={{ width: "100%", height: "100%" }}/>
          </div>
        </div>
      </section>
    </div>
  );
}

// ========================= JULBORD =========================
function JulbordPage({ t, onNav, onOpenLightbox }) {
  const ref = React.useRef(null);
  useReveal(ref);
  return (
    <div ref={ref}>
      <section className="ld-section" style={{ paddingBottom: 0 }}>
        <div className="ld-container">
          <div className="ld-section-header ld-reveal">
            <span className="ld-eyebrow">{t.julbord.eyebrow}</span>
            <h1 className="ld-h1">{t.julbord.title}<em className="ld-italic">{t.julbord.titleem}</em></h1>
            <p>{t.julbord.lead}</p>
            <div style={{ marginTop: 28, display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <span className="ld-chip ld-chip-accent">{t.julbord.priceNote}</span>
              <span className="ld-chip">{t.julbord.dates}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="ld-section" style={{ paddingTop: 40 }}>
        <div className="ld-container">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 16, gridAutoRows: 260 }}>
            {[
              { label: "Sillbordet", caption: "Sill i fyra sinnesstämningar", img: window.LD_IMAGES.jul1, style: { gridRow: "span 2" } },
              { label: "Julskinkan", caption: "Dijon och timjan", img: window.LD_IMAGES.jul2 },
              { label: "Desserter", caption: "Saffransbrûlée & risgrynsglass", img: window.LD_IMAGES.jul3 },
              { label: "Glöggen", caption: "Ankomst kl. 18", img: window.LD_IMAGES.jul4 },
              { label: "Matsalen vid jul", caption: "Matsalen vid jul", img: window.LD_IMAGES.jul5, style: { gridColumn: "span 2" } }
            ].map((g, i) => (
              <div key={i}
                className="ld-reveal"
                style={{ borderRadius: "var(--r-md)", overflow: "hidden", cursor: "pointer", ...g.style }}
                onClick={() => onOpenLightbox(g)}>
                <Placeholder img={g.img} label={g.label} style={{ width: "100%", height: "100%" }}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu split */}
      <section className="ld-section" style={{ background: "var(--ld-bg-2)" }}>
        <div className="ld-container ld-feature-split ld-reveal">
          <div>
            <span className="ld-eyebrow">Vad som serveras</span>
            <h2 className="ld-h2">Ett bord dukat <em className="ld-italic">varsamt</em>.</h2>
            <p className="ld-body-lg">Vi dukar upp i omgångar, så att varje rätt kan serveras som den ska — i rätt temperatur, i rätt ordning, med rätt glas.</p>
            <ul>
              {t.julbord.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button className="ld-btn ld-btn-primary" onClick={() => onNav("booking")}>Boka julbord</button>
          </div>
          <div className="ld-feature-split-visual">
            <Placeholder img={window.LD_IMAGES.jul1} label="Julbord · uppdukat" style={{ width: "100%", height: "100%" }}/>
          </div>
        </div>
      </section>
    </div>
  );
}

// ========================= CHAMBRE SEPAREE =========================
function ChambrePage({ t, onNav }) {
  const ref = React.useRef(null);
  useReveal(ref);
  return (
    <div ref={ref}>
      <section className="ld-section">
        <div className="ld-container">
          <div className="ld-section-header ld-reveal">
            <span className="ld-eyebrow">Privat matsal</span>
            <h1 className="ld-h1">Ett rum för <em className="ld-italic">långa kvällar</em>.</h1>
            <p>Vår Chambre Séparée rymmer upp till 14 gäster i en avskild matsal med egen ingång, egen servitör och en meny komponerad för kvällen.</p>
          </div>
          <div className="ld-feature-split ld-reveal">
            <div className="ld-feature-split-visual">
              <Placeholder img={window.LD_IMAGES.chambre} label="Chambre Séparée" style={{ width: "100%", height: "100%" }}/>
            </div>
            <div>
              <span className="ld-eyebrow">Vad som ingår</span>
              <h2 className="ld-h2">En kväll som era gäster inte glömmer.</h2>
              <ul>
                <li>Upp till 14 gäster, avskild matsal</li>
                <li>Dedikerad servitör och sommelier</li>
                <li>Meny komponerad tillsammans med kökschefen</li>
                <li>Välkomstdrink och kanapéer</li>
                <li>Egen ljudanläggning för tal och musik</li>
              </ul>
              <button className="ld-btn ld-btn-primary" onClick={() => onNav("contact")}>Begär offert</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ========================= CONTACT =========================
function ContactPage({ t }) {
  const [sent, setSent] = useStateP(false);
  return (
    <section className="ld-section">
      <div className="ld-container" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 4vw, 64px)",
        alignItems: "start"
      }}>
        <div>
          <span className="ld-eyebrow">Kontakt</span>
          <h1 className="ld-h1" style={{ margin: "16px 0 24px" }}>
            Hör av <em className="ld-italic">er.</em>
          </h1>
          <p className="ld-body-lg" style={{ marginBottom: 32 }}>
            Frågor om meny, allergier, presentkort eller större sällskap? Skicka några rader så återkommer vi inom en arbetsdag.
          </p>
          <div style={{ display: "grid", gap: 24 }}>
            <div>
              <span className="ld-label">Besök oss</span>
              <p style={{ whiteSpace: "pre-line" }}>{t.footer.address}</p>
            </div>
            <div>
              <span className="ld-label">Ring oss</span>
              <a href={`tel:${t.footer.phone}`}>{t.footer.phone}</a>
            </div>
            <div>
              <span className="ld-label">Mejla</span>
              <a href={`mailto:${t.footer.emailAddr}`}>{t.footer.emailAddr}</a>
            </div>
            <div>
              <span className="ld-label">{t.footer.hours}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {t.footer.hoursList.map(([l,v]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--ld-line-2)", padding: "8px 0", fontSize: 14 }}>
                    <span>{l}</span><span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{
          background: "var(--ld-surface)",
          border: "1px solid var(--ld-line)",
          borderRadius: "var(--r-lg)",
          padding: "clamp(28px, 3vw, 48px)"
        }}>
          {sent ? (
            <div className="ld-success">
              <div className="ld-success-mark"><Icon name="check" size={36}/></div>
              <h2 className="ld-h2">Tack!</h2>
              <p className="ld-body">Vi hör av oss snart.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "grid", gap: 16 }}>
              <div>
                <label className="ld-label">{t.booking.name}</label>
                <input className="ld-input" required/>
              </div>
              <div>
                <label className="ld-label">{t.booking.email}</label>
                <input className="ld-input" type="email" required/>
              </div>
              <div>
                <label className="ld-label">Ämne</label>
                <select className="ld-select">
                  <option>Allmän fråga</option>
                  <option>Presentkort</option>
                  <option>Privat sällskap</option>
                  <option>Catering</option>
                  <option>Allergier</option>
                </select>
              </div>
              <div>
                <label className="ld-label">Meddelande</label>
                <textarea className="ld-textarea" rows={5} required/>
              </div>
              <button type="submit" className="ld-btn ld-btn-primary">Skicka</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  HomePage, MenuPage, LunchPage, BookingPage, AboutPage, JulbordPage, ChambrePage, ContactPage,
  HeroClassic, HeroModern
});
