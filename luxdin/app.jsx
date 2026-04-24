// LuxDin — App shell (wires everything together)
const { useState: useS, useEffect: useE } = React;

function App() {
  // Persisted prefs
  const [page, setPage] = useS(() => localStorage.getItem("ld_page") || "home");
  const [lang, setLang] = useS(() => localStorage.getItem("ld_lang") || "sv");
  const [theme, setTheme] = useS(() => localStorage.getItem("ld_theme") || "light");
  const DEFAULT_TWEAKS = { hero: "classic", accentHue: 32, font: "cormorant", density: "normal" };
  const [tweaks, setTweaks] = useS(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ld_tweaks_v3"));
      return saved && typeof saved === "object" ? { ...DEFAULT_TWEAKS, ...saved } : DEFAULT_TWEAKS;
    } catch(e){ return DEFAULT_TWEAKS; }
  });
  const [tweaksOn, setTweaksOn] = useS(false);
  const [lightbox, setLightbox] = useS(null);

  // Persist
  useE(() => localStorage.setItem("ld_page", page), [page]);
  useE(() => localStorage.setItem("ld_lang", lang), [lang]);
  useE(() => localStorage.setItem("ld_theme", theme), [theme]);
  useE(() => { if (tweaks) localStorage.setItem("ld_tweaks_v3", JSON.stringify(tweaks)); }, [tweaks]);

  // Theme attr on <html>
  useE(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Apply tweaks (accent hue, font, density)
  useE(() => {
    if (!tweaks) return;
    const r = document.documentElement;
    // Accent from hue using oklch (consistent chroma/lightness)
    r.style.setProperty("--ld-accent", `oklch(0.67 0.10 ${tweaks.accentHue})`);
    r.style.setProperty("--ld-accent-2", `oklch(0.52 0.10 ${tweaks.accentHue})`);
    r.style.setProperty("--ld-highlight", `oklch(0.78 0.10 ${tweaks.accentHue})`);
    // Font
    const fontMap = {
      cormorant: `'Cormorant Garamond', Georgia, serif`,
      fraunces:  `'Fraunces', 'Cormorant Garamond', Georgia, serif`,
      ppneue:    `'Instrument Serif', 'Cormorant Garamond', Georgia, serif`
    };
    r.style.setProperty("--ld-display", fontMap[tweaks.font] || fontMap.cormorant);
    r.style.setProperty("--ld-serif",   fontMap[tweaks.font] || fontMap.cormorant);
    // Density → line-height/padding hint via data attr
    r.setAttribute("data-density", tweaks.density);
  }, [tweaks]);

  // Tweaks integration: host toolbar
  useE(() => {
    const onMsg = (e) => {
      if (!e.data || !e.data.type) return;
      if (e.data.type === "__activate_edit_mode") setTweaksOn(true);
      if (e.data.type === "__deactivate_edit_mode") setTweaksOn(false);
    };
    window.addEventListener("message", onMsg);
    // announce after listener registered
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const t = window.LD_CONTENT[lang];
  const handleNav = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "instant" }); };
  const openLb = (item) => setLightbox(item);

  const tw = tweaks;

  let content;
  switch (page) {
    case "home":    content = <HomePage t={t} onNav={handleNav} onOpenLightbox={openLb} variant={tw.hero}/>; break;
    case "menu":    content = <MenuPage t={t} lang={lang} onNav={handleNav}/>; break;
    case "lunch":   content = <LunchPage t={t} onNav={handleNav} onOpenLightbox={openLb}/>; break;
    case "booking": content = <BookingPage t={t} onNav={handleNav}/>; break;
    case "about":   content = <AboutPage t={t} onNav={handleNav}/>; break;
    case "julbord": content = <JulbordPage t={t} onNav={handleNav} onOpenLightbox={openLb}/>; break;
    case "chambre": content = <ChambrePage t={t} onNav={handleNav}/>; break;
    case "contact": content = <ContactPage t={t}/>; break;
    default: content = <HomePage t={t} onNav={handleNav} onOpenLightbox={openLb} variant={tw.hero}/>;
  }

  return (
    <div className="ld-shell" data-screen-label={`LuxDin · ${page}`}>
      <Nav page={page} onNav={handleNav} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t}/>
      <main style={{ flex: 1 }}>{content}</main>
      <Footer t={t}/>
      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)}/>}
      <TweaksPanel enabled={tweaksOn} tweaks={tw} setTweaks={setTweaks}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
