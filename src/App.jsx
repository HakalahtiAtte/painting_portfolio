import { useState, useEffect, useRef } from "react";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Raleway:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black:   #0d0d0b;
    --dark:    #1c1c19;
    --mid:     #2a2a26;
    --border:  rgba(255,255,255,0.12);
    --cream:   #f0ece1;
    --body:    #d4d0c4;
    --muted:   #9a9488;
    --gold:    #b49b5a;
    --gold-lt: rgba(180,155,90,0.15);
    --sold:    #7a3030;
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-body:    'Raleway', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--body);
    font-family: var(--font-body);
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.7;
    letter-spacing: 0.01em;
    min-height: 100vh;
  }

  .forest-hero {
    position: relative;
    overflow: hidden;
    background: var(--black);
  }
  .forest-hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 100%, rgba(30,38,25,0.9) 0%, transparent 70%),
      linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%);
    z-index: 1;
  }
  .forest-hero > * { position: relative; z-index: 2; }

  /* Gallery card */
  .gallery-card {
    cursor: pointer;
    outline: none;
    border: 1px solid var(--border);
    background: var(--dark);
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  }
  .gallery-card:hover, .gallery-card:focus-visible {
    border-color: var(--gold);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px var(--gold);
  }
  .gallery-card img {
    transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s;
    filter: grayscale(15%);
  }
  .gallery-card:hover img, .gallery-card:focus-visible img {
    transform: scale(1.04);
    filter: grayscale(0%);
  }

  /* Nav */
  .nav-btn {
    background: none; border: none; cursor: pointer;
    font-family: var(--font-body);
    font-weight: 400;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 0.5rem 1rem;
    transition: color 0.2s;
    position: relative;
  }
  .nav-btn::after {
    content: '';
    position: absolute;
    bottom: 0; left: 1rem; right: 1rem;
    height: 1px;
    background: var(--gold);
    transform: scaleX(0);
    transition: transform 0.25s;
  }
  .nav-btn:hover { color: var(--cream); }
  .nav-btn:hover::after { transform: scaleX(1); }
  .nav-btn.active { color: var(--gold); }
  .nav-btn.active::after { transform: scaleX(1); }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(5,5,4,0.96);
    z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    padding: 1rem;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal-img { animation: scaleIn 0.25s ease; }
  @keyframes scaleIn { from { transform: scale(0.96); opacity:0; } to { transform: scale(1); opacity:1; } }

  .page-enter { animation: pageEnter 0.4s ease both; }
  @keyframes pageEnter {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .gold-rule { border: none; border-top: 1px solid var(--gold); opacity: 0.3; margin: 0; }

  .sold-badge {
    position: absolute; top: 10px; right: 10px;
    background: var(--sold); color: #f0c8c8;
    font-family: var(--font-body);
    font-size: 0.62rem; letter-spacing: 0.18em;
    text-transform: uppercase; padding: 3px 10px;
  }

  .ba-img {
    width: 100%; display: block;
    border: 1px solid var(--border);
    transition: border-color 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }
  .ba-img:hover { border-color: var(--gold); box-shadow: 0 8px 30px rgba(0,0,0,0.5); }

  /* Contact form inputs */
  .form-input {
    width: 100%;
    background: var(--dark);
    border: 1px solid var(--border);
    color: var(--cream);
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 400;
    padding: 0.85rem 1rem;
    outline: none;
    transition: border-color 0.2s;
    resize: none;
  }
  .form-input::placeholder { color: var(--muted); }
  .form-input:focus { border-color: var(--gold); }

  .form-btn {
    background: var(--gold);
    border: none;
    color: #0d0d0b;
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 1rem 2.5rem;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .form-btn:hover { background: #c4ac6a; transform: translateY(-1px); }
  .form-btn:disabled { background: var(--mid); color: var(--muted); cursor: not-allowed; transform: none; }

  .form-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
  @media (min-width: 540px) { .form-grid { grid-template-columns: 1fr 1fr; } }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--black); }
  ::-webkit-scrollbar-thumb { background: var(--mid); border-radius: 3px; }

  /* Hamburger — hidden on desktop, shown on mobile */
  .hamburger {
    display: none;
    background: none; border: none; cursor: pointer;
    padding: 0.5rem; flex-direction: column; justify-content: center;
  }
  .nav-desktop { display: flex; gap: 0.25rem; align-items: center; }
  .nav-mobile-menu {
    position: absolute; top: 64px; right: 0;
    background: rgba(13,13,11,0.97);
    border: 1px solid var(--border);
    min-width: 200px;
    z-index: 200;
    backdrop-filter: blur(12px);
  }

  @media (max-width: 600px) {
    .hamburger { display: flex; }
    .nav-desktop { display: none; }
  }

  /* About section — stack on mobile */
  @media (max-width: 600px) {
    .about-section { flex-direction: column; align-items: center; text-align: center; gap: 1.5rem !important; }
    .about-img { width: 140px !important; height: 140px !important; }
  }

  /* CustomPage grid — stack on mobile */
  @media (max-width: 640px) {
    .custom-grid { grid-template-columns: 1fr !important; }
  }

  /* Before/After drag slider */
  .ba-slider {
    position: relative;
    overflow: hidden;
    cursor: ew-resize;
    user-select: none;
    touch-action: none;
    border: 1px solid var(--border);
    transition: border-color 0.3s;
  }
  .ba-slider:hover { border-color: var(--gold); }
  .ba-slider img { display: block; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
  .ba-handle {
    position: absolute; top: 0; bottom: 0;
    width: 2px; background: var(--gold);
    transform: translateX(-50%);
    cursor: ew-resize;
  }
  .ba-handle-circle {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 44px; height: 44px;
    border-radius: 50%;
    background: var(--gold);
    display: flex; align-items: center; justify-content: center;
    color: #0d0d0b;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 2px 12px rgba(0,0,0,0.5);
  }
  .ba-label {
    position: absolute; bottom: 12px;
    font-family: var(--font-body);
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 4px 10px;
    background: rgba(13,13,11,0.75);
    color: var(--gold);
    pointer-events: none;
  }

  /* Atelier curtain reveal */
  .curtain {
    position: absolute; top: 0; bottom: 0;
    width: 50%; z-index: 10; pointer-events: none;
  }
  .curtain-left {
    left: 0;
    background:
      linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 50%),
      repeating-linear-gradient(180deg, transparent 0px, transparent 14px, rgba(0,0,0,0.07) 14px, rgba(0,0,0,0.07) 15px),
      linear-gradient(170deg, #3a1212 0%, #1e0808 25%, #2d1010 50%, #1e0808 75%, #3a1212 100%);
    border-right: 2px solid rgba(180,155,90,0.55);
    box-shadow: inset -16px 0 32px rgba(0,0,0,0.55);
    animation: curtainLeft 0.95s cubic-bezier(0.4,0,0.6,1) forwards;
  }
  .curtain-right {
    right: 0;
    background:
      linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 50%),
      repeating-linear-gradient(180deg, transparent 0px, transparent 14px, rgba(0,0,0,0.07) 14px, rgba(0,0,0,0.07) 15px),
      linear-gradient(190deg, #3a1212 0%, #1e0808 25%, #2d1010 50%, #1e0808 75%, #3a1212 100%);
    border-left: 2px solid rgba(180,155,90,0.55);
    box-shadow: inset 16px 0 32px rgba(0,0,0,0.55);
    animation: curtainRight 0.95s cubic-bezier(0.4,0,0.6,1) forwards;
  }
  @keyframes curtainLeft {
    from { transform: translateX(0); }
    to   { transform: translateX(-100%); }
  }
  @keyframes curtainRight {
    from { transform: translateX(0); }
    to   { transform: translateX(100%); }
  }
`;

function GlobalStyles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}

// SEO
const SITE_URL = "https://www.hakalahti.com";

function useSEO({ title, description, keywords, canonical }) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", "index, follow");
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = `${SITE_URL}${canonical}`;
    const setOG = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
      el.content = content;
    };
    setOG("og:title", title);
    setOG("og:description", description);
    setOG("og:type", "website");
    setOG("og:url", `${SITE_URL}${canonical}`);
    setOG("og:locale", "fi_FI");
    setOG("og:site_name", "Hakalahti – Öljymaalaukset");
  }, [title, description, keywords, canonical]);
}

const PAINTINGS = [
  { id: "taulu5",  src: "images/taulu5.webp",  title: "Lapinpöllö",              size: "41×30cm",  medium: "Öljymaalaus" },
  { id: "taulu6",  src: "images/taulu6.webp",  title: "Maakotka",                size: "42×40cm",  medium: "Öljymaalaus" },
  { id: "taulu7",  src: "images/taulu7.webp",  title: "Ilves",                   size: "40×68cm",  medium: "Öljymaalaus" },
  { id: "taulu8",  src: "images/taulu8.webp",  title: "Koivut",                  size: "45×85cm",  medium: "Öljymaalaus" },
  { id: "taulu9",  src: "images/taulu9.webp",  title: "Pitkospuut lintutornille",size: "90×120cm", medium: "Öljymaalaus" },
  { id: "taulu10", src: "images/taulu10.webp", title: "Talitiainen",             size: "22×22cm",  medium: "Öljymaalaus" },
  { id: "taulu11", src: "images/taulu11.webp", title: "Punatulkku",              size: "22×22cm",  medium: "Öljymaalaus" },
  { id: "taulu12", src: "images/taulu12.webp", title: "Töyhtötiainen",           size: "22×22cm",  medium: "Öljymaalaus" },
  { id: "taulu13", src: "images/taulu13.webp", title: "Tilhi",                   size: "22×22cm",  medium: "Öljymaalaus" },
  { id: "taulu14", src: "images/taulu14.webp", title: "Villihevonen",            size: "68×60cm",  medium: "Öljymaalaus" },
  { id: "taulu15", src: "images/taulu15.webp", title: "Karhu",                   size: "40×30cm",  medium: "Öljymaalaus" },
  { id: "taulu16", src: "images/taulu16.webp", title: "Hömötiainen",             size: "25×19cm",  medium: "Öljymaalaus" },
  { id: "taulu17", src: "images/taulu17.webp", title: "Hömötiaiset",             size: "30×30cm",  medium: "Öljymaalaus" },
  { id: "taulu18", src: "images/taulu18.webp", title: "Katse",                   size: "100×45cm", medium: "Öljymaalaus" },
  { id: "taulu20", src: "images/taulu20.webp", title: "Kotka",                   size: "90×50cm",  medium: "Öljymaalaus" },
  { id: "taulu21", src: "images/taulu21.webp", title: "Teeret",                  size: "40×30cm",  medium: "Öljymaalaus" },
  { id: "taulu22", src: "images/taulu22.webp", title: "Oja",                     size: "70×50cm",  medium: "Öljymaalaus" },
  { id: "taulu23", src: "images/taulu23.webp", title: "Mandariini ja Morsio",    size: "65×30cm",  medium: "Öljymaalaus" },
  { id: "taulu24", src: "images/taulu24.webp", title: "Ilta",                    size: "45×30cm",  medium: "Öljymaalaus" },
  { id: "taulu25", src: "images/taulu25.webp", title: "Joutsen",                 size: "85×60cm",  medium: "Öljymaalaus" },
  { id: "taulu26", src: "images/taulu26.webp", title: "Nuolihaukka",             size: "42×30cm",  medium: "Öljymaalaus" },
  { id: "taulu27", src: "images/taulu27.webp", title: "Metso",                   size: "68×60cm",  medium: "Öljymaalaus" },
  { id: "taulu28", src: "images/taulu28.webp", title: "Susi",                    size: "45×60cm",  medium: "Öljymaalaus" },
  { id: "taulu29", src: "images/taulu29.webp", title: "Lapinpöllö",              size: "45×85cm",  medium: "Öljymaalaus" },
  { id: "taulu33", src: "images/taulu33.webp", title: "Suojaväritys",            size: "25×100cm", medium: "Öljymaalaus" },
  { id: "taulu34", src: "images/taulu34.webp", title: "Pala Mäntyä",             size: "30×65cm",  medium: "Öljymaalaus" },
  { id: "taulu35", src: "images/taulu35.webp", title: "Pyytölamminoja",          size: "60×45cm",  medium: "Öljymaalaus" },
  { id: "taulu36", src: "images/taulu36.webp", title: "Alkulähteillä",           size: "100×75cm", medium: "Öljymaalaus" },
  { id: "taulu37", src: "images/taulu37.webp", title: "Joenmutka",               size: "80×60cm",  medium: "Öljymaalaus" },
  { id: "taulu38", src: "images/taulu38.webp", title: "Suopursut kukkii",        size: "80×60cm",  medium: "Öljymaalaus" },
  { id: "taulu39", src: "images/taulu39.webp", title: "Puro Kiekkikairassa",     size: "100×75cm", medium: "Öljymaalaus" },
  { id: "taulu40", src: "images/taulu40.webp", title: "Järvisuo, Mourunki",      size: "80×60cm",  medium: "Öljymaalaus" },
  { id: "taulu41", src: "images/taulu41.webp", title: "Koivikko",                size: "80×60cm",  medium: "Öljymaalaus" },
  { id: "taulu43", src: "images/taulu43.webp", title: "Onko lahdella lintuja",   size: "75×100cm", medium: "Öljymaalaus" },
  { id: "taulu44", src: "images/taulu44.webp", title: "Korpireitti",             size: "64×80cm",  medium: "Öljymaalaus" },
  { id: "taulu45", src: "images/taulu45.webp", title: "Köykkyrin luontopolun pitkospuut lumen peitossa",size: "60×80cm",  medium: "Öljymaalaus" },
  { id: "taulu46", src: "images/taulu46.webp", title: "Tundrahanhet", size: "80×60cm",  medium: "Öljymaalaus" },
  { id: "taulu47", src: "images/taulu47.webp", title: "Tarkkana",                size: "60×68cm",  medium: "Öljymaalaus" },
  { id: "taulu48", src: "images/taulu48.webp", title: "Näkymä Rastilammelle",   size: "65×85cm",  medium: "Öljymaalaus" },
];

const NUDE_PAINTINGS = [
  { id: "akti1", src: "images/akti1.webp" },
  { id: "akti2", src: "images/akti2.webp" },
];

const SOLD = [
  { id: "taulu1",  src: "images/taulu1.webp",  title: "Riekko" },
  { id: "taulu2",  src: "images/taulu2.webp",  title: "Talvi" },
  { id: "taulu3",  src: "images/taulu3.webp",  title: "Lapinpöllö" },
  { id: "taulu30", src: "images/taulu30.webp", title: "Koivikko" },
  { id: "taulu31", src: "images/taulu31.webp", title: "Koskikara" },
  { id: "taulu32", src: "images/taulu32.webp", title: "Västäräkki" },
  { id: "taulu19", src: "images/taulu19.webp", title: "Suopursumetsä" },
  { id: "taulu42", src: "images/taulu42.webp", title: "Matkalainen" },
];

function ForestSVG() {
  return (
    <svg viewBox="0 0 1200 340" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax slice"
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.55 }}
      aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d0d0b"/>
          <stop offset="100%" stopColor="#1a2018"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="340" fill="url(#sky)"/>
      {[60,140,220,310,400,490,580,660,750,840,920,1010,1100,1160].map((x,i) => (
        <polygon key={`bg${i}`} points={`${x},${340-(120+(i%3)*30)} ${x-22},340 ${x+22},340`} fill="#1e261a" opacity="0.6"/>
      ))}
      {[30,110,190,280,370,455,545,630,720,810,900,990,1080,1150].map((x,i) => {
        const h=160+(i%4)*25, w=28+(i%2)*6;
        return <polygon key={`mid${i}`} points={`${x},${340-h} ${x-w},340 ${x+w},340`} fill="#161c13" opacity="0.85"/>;
      })}
      {[0,80,170,260,350,440,530,620,710,800,890,980,1070,1150,1200].map((x,i) => {
        const h=200+(i%5)*18, w=35+(i%3)*8;
        return <polygon key={`fg${i}`} points={`${x},${340-h} ${x-w},340 ${x+w},340`} fill="#0f130c"/>;
      })}
      <rect y="325" width="1200" height="15" fill="#0d0d0b"/>
    </svg>
  );
}

function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const links = [
    { id: "home",    label: "Koti" },
    { id: "custom",  label: "Tilaustyöt" },
    { id: "contact", label: "Yhteydenotot" },
  ];
  const handleNav = (id) => { setPage(id); setOpen(false); };

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  return (
    <nav ref={navRef} aria-label="Päävalikko" style={{ position:"relative" }}>
      {/* Hamburger button — visible only on mobile via CSS class */}
      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Sulje valikko" : "Avaa valikko"}
        aria-expanded={open}
      >
        <span style={{ display:"block", width:22, height:2, background:"var(--cream)", marginBottom:5, transition:"all 0.2s", transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }}/>
        <span style={{ display:"block", width:22, height:2, background:"var(--cream)", marginBottom:5, transition:"all 0.2s", opacity: open ? 0 : 1 }}/>
        <span style={{ display:"block", width:22, height:2, background:"var(--cream)", transition:"all 0.2s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }}/>
      </button>
      {/* Desktop nav — always visible on wide screens */}
      <div className="nav-desktop">
        {links.map((l) => (
          <button key={l.id} className={`nav-btn${page===l.id?" active":""}`}
            onClick={() => handleNav(l.id)}
            aria-current={page===l.id ? "page" : undefined}>
            {l.label}
          </button>
        ))}
      </div>
      {/* Mobile dropdown */}
      {open && (
        <div className="nav-mobile-menu">
          {links.map((l) => (
            <button key={l.id} className={`nav-btn${page===l.id?" active":""}`}
              onClick={() => handleNav(l.id)}
              aria-current={page===l.id ? "page" : undefined}
              style={{ display:"block", width:"100%", textAlign:"right", padding:"0.85rem 1.5rem" }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Modal({ painting, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key==="Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);
  if (!painting) return null;
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={painting.title || "Maalaus"}>
      <div onClick={(e) => e.stopPropagation()} style={{ position:"relative", maxWidth:"90vw" }}>
        <button onClick={onClose} aria-label="Sulje"
          style={{ position:"absolute", top:-16, right:-16, background:"var(--mid)", border:"1px solid var(--border)", color:"var(--cream)", width:32, height:32, borderRadius:"50%", cursor:"pointer", fontSize:"0.9rem", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1 }}>
          ✕
        </button>
        <img className="modal-img" src={painting.src}
          alt={`${painting.title || "Maalaus"}${painting.size ? ` – öljymaalaus ${painting.size}` : " – öljymaalaus"}`}
          style={{ maxWidth:"85vw", maxHeight:"78vh", objectFit:"contain", display:"block" }}
          loading="eager"/>
        <div style={{ padding:"1rem 0.25rem 0", borderTop:"1px solid var(--border)", marginTop:"0.75rem" }}>
          {painting.title && <p style={{ fontFamily:"var(--font-display)", fontSize:"1.3rem", fontWeight:400, color:"var(--cream)", letterSpacing:"0.04em" }}>{painting.title}</p>}
          {painting.size && <p style={{ fontSize:"0.82rem", color:"var(--muted)", letterSpacing:"0.1em", marginTop:"0.25rem" }}>{painting.size} · {painting.medium}</p>}
        </div>
      </div>
    </div>
  );
}

function GalleryCard({ painting, onClick, priority = false }) {
  return (
    <article className="gallery-card" onClick={() => onClick(painting)}
      tabIndex={0} onKeyDown={(e) => { if (e.key==="Enter" || e.key===" ") onClick(painting); }}
      aria-label={painting.title ? `Avaa ${painting.title}` : "Avaa maalaus"}
      style={{ borderRadius:0, overflow:"hidden" }}>
      <div style={{ position:"relative", aspectRatio:"4/3", overflow:"hidden", background:"var(--mid)" }}>
        <img src={painting.src}
          alt={`${painting.title ? painting.title : "Maalaus"}${painting.size ? ` – ${painting.size} öljymaalaus` : " – öljymaalaus"}`}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}/>
        {painting.sold && <span className="sold-badge">Myyty</span>}
      </div>
      {(painting.title || painting.size || painting.medium) && (
        <div style={{ padding:"0.9rem 1rem 1.1rem", borderTop:"1px solid var(--border)" }}>
          {painting.title  && <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", fontWeight:400, color:"var(--cream)", letterSpacing:"0.04em", marginBottom:"0.3rem" }}>{painting.title}</h3>}
          {painting.size   && <p style={{ fontSize:"0.78rem", color:"var(--body)", letterSpacing:"0.08em", textTransform:"uppercase" }}>{painting.size}</p>}
          {painting.medium && <p style={{ fontSize:"0.78rem", color:"var(--gold)", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:"0.15rem" }}>{painting.medium}</p>}
        </div>
      )}
    </article>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ marginBottom:"2.5rem" }}>
      <p style={{ fontSize:"0.68rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"0.6rem" }}>
        Hakalahti
      </p>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.6rem,3vw,2.4rem)", fontWeight:300, color:"var(--cream)", letterSpacing:"0.02em", lineHeight:1.1 }}>
        {children}
      </h2>
      <div style={{ width:48, height:1, background:"var(--gold)", marginTop:"1rem", opacity:0.7 }}/>
    </div>
  );
}

const FORMSPREE_ID = "xdaplyop";

function ContactForm() {
  const [form, setForm]     = useState({ name:"", email:"", message:"" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name:"", email:"", message:"" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ padding:"2rem", border:"1px solid var(--gold)", background:"var(--dark)", textAlign:"center" }}>
        <p style={{ fontSize:"0.68rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"0.75rem" }}>Viesti lähetetty</p>
        <p style={{ color:"var(--cream)", fontFamily:"var(--font-display)", fontSize:"1.3rem", fontWeight:300 }}>Kiitos! Vastaan mahdollisimman pian.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
      <div className="form-grid">
        <div>
          <label htmlFor="contact-name" style={{ display:"block", fontSize:"0.68rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"0.5rem" }}>
            Nimi
          </label>
          <input id="contact-name" className="form-input" type="text" name="name" value={form.name}
            onChange={handleChange} placeholder="Etunimi Sukunimi" autoComplete="name" required/>
        </div>
        <div>
          <label htmlFor="contact-email" style={{ display:"block", fontSize:"0.68rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"0.5rem" }}>
            Sähköposti
          </label>
          <input id="contact-email" className="form-input" type="email" name="email" value={form.email}
            onChange={handleChange} placeholder="sinun@email.fi" autoComplete="email" required/>
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" style={{ display:"block", fontSize:"0.68rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"0.5rem" }}>
          Viesti
        </label>
        <textarea id="contact-message" className="form-input" name="message" value={form.message}
          onChange={handleChange} placeholder="Kerro mitä sinulla on mielessä — taulun osto, tilaustyö tai muu kysymys..."
          rows={5} maxLength={2000} required/>
      </div>
      {status === "error" && (
        <p style={{ color:"#e08080", fontSize:"0.88rem" }}>Jotain meni pieleen. Kokeile uudelleen tai lähetä sähköpostia suoraan.</p>
      )}
      <div style={{ display:"flex", justifyContent:"flex-end" }}>
        <button className="form-btn" type="submit" disabled={status==="sending"}>
          {status === "sending" ? "Lähetetään..." : "Lähetä viesti"}
        </button>
      </div>
    </form>
  );
}

function HomePage({ setModal }) {
  useSEO({
    title: "Hakalahti – Öljymaalaukset | Osta alkuperäistaulu Kempeleestä",
    description: "Osta alkuperäinen käsinmaalattu öljymaalaus Kempeleestä. Hakalahden uniikkeja tauluja olohuoneeseen — lintuaiheita, maisemia ja luontoa. Tilaustyöt myös.",
    keywords: "öljymaalaus, taulu kempele, alkuperäismaalaus, käsinmaalattu taulu, uniikki maalaus, taulu olohuoneeseen, suomalainen taide, osta maalaus, lintumaalaus, luontomaalaus, hakalahti, seinätaide kotiin",
    canonical: "/",
  });

  return (
    <div className="page-enter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org", "@type":"Person",
        name:"Janne Hakalahti", jobTitle:"Taidemaalari",
        description:"Suomalainen taidemaalari Kempeleestä. Käsinmaalattuja öljymaalauksia: lintuaiheita, maisemia ja luontoa.",
        email:"janne.hakalahti@gmail.com", url:SITE_URL,
        address:{ "@type":"PostalAddress", addressLocality:"Kempele", addressCountry:"FI" },
      })}}/>

      {/* Hero */}
      <section className="forest-hero" aria-labelledby="hero-title"
        style={{ height:"clamp(280px,45vh,420px)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <ForestSVG/>
        <div style={{ textAlign:"center", padding:"2rem" }}>
          <p style={{ fontSize:"0.68rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem" }}>
            Öljymaalaukset · Kempele
          </p>
          <h1 id="hero-title"
            style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.8rem,7vw,5rem)", fontWeight:300, letterSpacing:"0.08em", color:"var(--cream)", lineHeight:1 }}>
            Hakalahti
          </h1>
          <p style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"clamp(1rem,2.5vw,1.4rem)", color:"#c8c4b8", marginTop:"0.8rem", fontWeight:300 }}>
            Käsinmaalattuja öljymaalauksia luonnosta
          </p>
          <div style={{ width:1, height:48, background:"var(--gold)", margin:"2rem auto 0", opacity:0.5 }}/>
        </div>
      </section>

      {/* Gallery — gap increased from 1px to 1rem */}
      <section aria-labelledby="gallery-heading" style={{ maxWidth:1280, margin:"0 auto", padding:"5rem 2rem 4rem" }}>
        <SectionTitle><span id="gallery-heading">Alkuperäiset öljymaalaukset</span></SectionTitle>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:"1rem" }}>
          {PAINTINGS.map((p, index) => <GalleryCard key={p.id} painting={p} onClick={setModal} priority={index === 0}/>)}
        </div>
      </section>

      <hr className="gold-rule" style={{ maxWidth:1280, margin:"0 auto" }}/>

      {/* Sold */}
      <section aria-labelledby="sold-heading" style={{ maxWidth:1280, margin:"0 auto", padding:"4rem 2rem" }}>
        <SectionTitle><span id="sold-heading">Myydyt taulut</span></SectionTitle>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:"1rem" }}>
          {SOLD.map((p) => <GalleryCard key={p.id} painting={{ ...p, sold:true }} onClick={setModal}/>)}
        </div>
      </section>

      <hr className="gold-rule" style={{ maxWidth:1280, margin:"0 auto" }}/>
      <NudeSection setModal={setModal}/>

      <hr className="gold-rule" style={{ maxWidth:1280, margin:"0 auto" }}/>

      {/* About — "Janne Hakalahti" kept here as it's the artist bio */}
      <section aria-labelledby="about-heading"
        className="about-section" style={{ maxWidth:900, margin:"0 auto", padding:"5rem 2rem 6rem", display:"flex", gap:"4rem", flexWrap:"wrap", alignItems:"flex-start" }}>
        <img src="images/janne.webp" alt="Janne Hakalahti, taidemaalari Kempele" loading="lazy"
          className="about-img" style={{ width:180, height:180, objectFit:"cover", border:"1px solid var(--border)", flexShrink:0, filter:"grayscale(30%)" }}/>
        <div style={{ flex:1, minWidth:240 }}>
          <p style={{ fontSize:"0.68rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"0.8rem" }}>Taiteilijasta</p>
          <h2 id="about-heading"
            style={{ fontFamily:"var(--font-display)", fontSize:"2rem", fontWeight:300, color:"var(--cream)", marginBottom:"1.5rem", letterSpacing:"0.04em" }}>
            Janne Hakalahti — taidemaalari, Kempele
          </h2>
          {[
            "Jannen taulut ovat pääasiassa luontoaiheisia käsinmaalattuja öljymaalauksia. Lintuaiheita lienee enemmistö töistä — maisemat ja muutkin aihepiirit pääsevät toisinaan siveltimen alle.",
            "Monien taulujen inspiraatio saa alkunsa Jannen omista luontokokemuksista. Jokainen maalaus on uniikki alkuperäisteos, maalattu laadukkailla öljyväreillä kankaalle.",
            "Tauluja on myytävänä, ja tilaustyöt onnistuvat myös.",
          ].map((t, i) => (
            <p key={i} style={{ color:"var(--body)", lineHeight:1.85, marginBottom:"0.9rem" }}>{t}</p>
          ))}
        </div>
      </section>

    </div>
  );
}


function GatePanel({ onOpen }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"4.5rem 2rem", border:"1px solid var(--border)", background:"var(--dark)", textAlign:"center", gap:"1.25rem" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"1rem", width:"100%", maxWidth:260 }}>
        <div style={{ flex:1, height:1, background:"var(--gold)", opacity:0.35 }}/>
        <span style={{ color:"var(--gold)", fontSize:"0.85rem", opacity:0.65 }}>✦</span>
        <div style={{ flex:1, height:1, background:"var(--gold)", opacity:0.35 }}/>
      </div>
      <p style={{ color:"var(--muted)", maxWidth:380, lineHeight:1.9, fontSize:"0.88rem", letterSpacing:"0.02em" }}>
        Tämä osio sisältää taiteellista alastomuutta esittäviä maalauksia.
      </p>
      <button className="form-btn" onClick={onOpen} style={{ marginTop:"0.25rem" }}>
        Avaa osio
      </button>
    </div>
  );
}

function NudeSection({ setModal }) {
  const [state, setState] = useState("closed"); // "closed" | "revealing" | "open"
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleOpen = () => {
    setState("revealing");
    timerRef.current = setTimeout(() => setState("open"), 1050);
  };

  return (
    <section aria-labelledby="nude-heading" style={{ maxWidth:1280, margin:"0 auto", padding:"4rem 2rem" }}>
      <SectionTitle><span id="nude-heading">Ihmishahmo taiteessa</span></SectionTitle>

      {state === "closed" ? (
        <GatePanel onOpen={handleOpen}/>
      ) : (
        <div style={{ position:"relative", overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:"1rem", animation:"pageEnter 0.5s ease 0.85s both" }}>
            {NUDE_PAINTINGS.map((p) => <GalleryCard key={p.id} painting={p} onClick={setModal}/>)}
          </div>
          {state === "revealing" && (
            <>
              <div className="curtain curtain-left"/>
              <div className="curtain curtain-right"/>
            </>
          )}
        </div>
      )}
    </section>
  );
}

function CustomPage({ setPage }) {
  useSEO({
    title: "Tilaustyöt – Hakalahti | Öljymaalaus tilauksesta, Kempele",
    description: "Tilaa oma öljymaalaus Hakalahdelta Kempeleestä. Käsinmaalattu taulu valokuvan pohjalta — linnut, maisemat, lemmikit.",
    keywords: "tilausmaalaus, öljymaalaus tilauksesta, lemmikkimuotokuva, lintumaalaus tilaus, käsinmaalattu lahja, taulu tilauksesta kempele, taulu tilauksesta oulu",
    canonical: "/tilaustyot",
  });
  return (
    <div className="page-enter" style={{ maxWidth:680, margin:"0 auto", padding:"5rem 2rem 6rem" }}>
      <SectionTitle>Tilaustyöt</SectionTitle>
      <h1 style={{ fontFamily:"var(--font-display)", fontSize:"1.6rem", fontWeight:300, color:"var(--cream)", marginBottom:"1.5rem", letterSpacing:"0.04em" }}>
        Öljymaalaus tilauksesta
      </h1>
      {[
        "Maalaan myös tilauksesta uniikki öljymaalaus sinulle tai lahjaksi.",
        "Käsinmaalattu taulu voidaan tehdä valokuvan pohjalta — esimerkiksi linnuista, maisemista tai lemmikeistä. Jokainen tilaustyö on alkuperäinen, uniikki maalaus.",
        "Käytän töissäni laadukkaita öljyvärejä ja kankaita.",
      ].map((t, i) => (
        <p key={i} style={{ color:"var(--body)", lineHeight:1.85, marginBottom:"1rem" }}>{t}</p>
      ))}
      <div style={{ marginTop:"2.5rem", padding:"1.5rem 2rem", border:"1px solid var(--border)", background:"var(--dark)" }}>
        <p style={{ fontSize:"0.68rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"0.75rem" }}>Kiinnostuitko?</p>
        <p style={{ color:"var(--body)", lineHeight:1.85, marginBottom:"1.25rem" }}>
          Ota yhteyttä ja kerro toiveistasi — sovitaan yksityiskohdat yhdessä.
        </p>
        <button className="form-btn" onClick={() => setPage("contact")}>Ota yhteyttä</button>
      </div>
    </div>
  );
}

function ContactPage() {
  useSEO({
    title: "Yhteydenotot – Hakalahti | Taulut Kempele",
    description: "Ota yhteyttä. Kysy tilausmaalauksia, taulujen hintoja tai lisätietoja.",
    keywords: "ota yhteyttä, hakalahti yhteystiedot, taulut kempele",
    canonical: "/yhteydenotot",
  });
  return (
    <div className="page-enter" style={{ maxWidth:680, margin:"0 auto", padding:"5rem 2rem 6rem" }}>
      <SectionTitle>Ota yhteyttä</SectionTitle>
      <h1 style={{ fontFamily:"var(--font-display)", fontSize:"1.6rem", fontWeight:300, color:"var(--cream)", marginBottom:"0.75rem", letterSpacing:"0.04em" }}>
        Kiinnostuitko tauluista tai tilaustöistä?
      </h1>
      <p style={{ color:"var(--body)", marginBottom:"2.5rem" }}>
        Täytä lomake tai lähetä sähköpostia suoraan —{" "}
        <a href="mailto:janne.hakalahti@gmail.com"
          style={{ color:"var(--gold)", textDecoration:"none", borderBottom:"1px solid rgba(180,155,90,0.4)" }}>
          janne.hakalahti@gmail.com
        </a>
      </p>
      <ContactForm/>
    </div>
  );
}

export default function App() {
  const [page, setPage]   = useState("home");
  const [modal, setModal] = useState(null);

  const renderPage = () => {
    if (page === "custom")  return <CustomPage setPage={setPage}/>;
    if (page === "contact") return <ContactPage/>;
    return <HomePage setModal={setModal}/>;
  };

  return (
    <>
      <GlobalStyles/>

      <header style={{
        position:"sticky", top:0, zIndex:100,
        background:"rgba(13,13,11,0.93)",
        backdropFilter:"blur(12px)",
        borderBottom:"1px solid var(--border)",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 2rem", height:64,
      }}>
        <button onClick={() => setPage("home")}
          style={{ background:"none", border:"none", cursor:"pointer", textAlign:"left" }}
          aria-label="Etusivulle">
          <div style={{ fontFamily:"var(--font-display)", fontSize:"1.45rem", fontWeight:400, color:"var(--cream)", letterSpacing:"0.1em", lineHeight:1 }}>
            Hakalahti
          </div>
          <div style={{ fontSize:"0.58rem", letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", marginTop:"4px" }}>
            Öljymaalaukset
          </div>
        </button>
        <Nav page={page} setPage={setPage}/>
      </header>

      <main>{renderPage()}</main>

      <footer style={{ borderTop:"1px solid var(--border)", padding:"2.5rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
        <p style={{ fontSize:"0.72rem", letterSpacing:"0.15em", color:"var(--muted)", textTransform:"uppercase" }}>
          © Hakalahti — Öljymaalaukset, Kempele
        </p>
        <p style={{ fontSize:"0.72rem", letterSpacing:"0.12em", color:"var(--muted)", textTransform:"uppercase" }}>
          hakalahti.com
        </p>
      </footer>

      {modal && <Modal painting={modal} onClose={() => setModal(null)}/>}
    </>
  );
}
