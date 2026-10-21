import { useState, useEffect, useRef } from "react";




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
  { id: "taulu49", src: "images/taulu49.webp", title: "Haastaja",               size: "130×88cm", medium: "Öljymaalaus" },
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

const ROUTES = {
  "/":             "home",
  "/tilaustyot":   "custom",
  "/yhteydenotot": "contact",
  "/tietosuoja":   "privacy",
};
const PATHS = { home: "/", custom: "/tilaustyot", contact: "/yhteydenotot", privacy: "/tietosuoja" };
function pathToPage(path) { return ROUTES[path] ?? "home"; }

function PageLink({ page, navigate, children, onNavigate, ...props }) {
  return <a {...props} href={PATHS[page]} onClick={(event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(page);
    onNavigate?.();
  }}>{children}</a>;
}

function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const links = [
    { id: "home",    label: "Koti" },
    { id: "custom",  label: "Tilaustyöt" },
    { id: "contact", label: "Yhteydenotot" },
  ];

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
          <PageLink key={l.id} page={l.id} navigate={setPage} onNavigate={() => setOpen(false)} className={`nav-btn${page===l.id?" active":""}`}
            aria-current={page===l.id ? "page" : undefined}>
            {l.label}
          </PageLink>
        ))}
      </div>
      {/* Mobile dropdown */}
      {open && (
        <div className="nav-mobile-menu">
          {links.map((l) => (
            <PageLink key={l.id} page={l.id} navigate={setPage} onNavigate={() => setOpen(false)} className={`nav-btn${page===l.id?" active":""}`}
              aria-current={page===l.id ? "page" : undefined}
              style={{ display:"block", width:"100%", textAlign:"right", padding:"0.85rem 1.5rem" }}>
              {l.label}
            </PageLink>
          ))}
        </div>
      )}
    </nav>
  );
}

function Modal({ painting, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const opener = document.activeElement;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    dialog.querySelector("button").focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus();
    };
  }, []);
  if (!painting) return null;
  return (
    <dialog ref={dialogRef} className="modal-overlay" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-label={painting.title || "Maalaus"}>
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
    </dialog>
  );
}

function GalleryCard({ painting, onClick, priority = false }) {
  return (
    <article className="gallery-card"
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
          {painting.title  && <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", fontWeight:400, color:"var(--cream)", letterSpacing:"0.04em", marginBottom:"0.3rem" }}><button type="button" className="gallery-open" onClick={() => onClick(painting)} aria-label={`Avaa ${painting.title}`}>{painting.title}</button></h3>}
          {painting.size   && <p style={{ fontSize:"0.78rem", color:"var(--body)", letterSpacing:"0.08em", textTransform:"uppercase" }}>{painting.size}</p>}
          {painting.medium && <p style={{ fontSize:"0.78rem", color:"var(--gold)", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:"0.15rem" }}>{painting.medium}</p>}
        </div>
      )}
      {!painting.title && <button type="button" className="gallery-open" onClick={() => onClick(painting)} aria-label="Avaa maalaus"/>}
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

const TEXT_LINK_STYLE = { color:"var(--gold)", textDecoration:"underline", overflowWrap:"anywhere" };

function HomePage({ setModal }) {
  useSEO({
    title: "Hakalahti – Öljymaalaukset | Osta alkuperäistaulu Kempeleestä",
    description: "Osta alkuperäinen käsinmaalattu öljymaalaus Kempeleestä. Hakalahden uniikkeja tauluja olohuoneeseen — lintuaiheita, maisemia ja luontoa. Tilaustyöt myös.",
    keywords: "öljymaalaus, taulu kempele, alkuperäismaalaus, käsinmaalattu taulu, uniikki maalaus, taulu olohuoneeseen, suomalainen taide, osta maalaus, lintumaalaus, luontomaalaus, hakalahti, seinätaide kotiin",
    canonical: "/",
  });

  return (
    <div className="page-enter">

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
        <PageLink className="form-btn" page="contact" navigate={setPage}>Ota yhteyttä</PageLink>
      </div>
    </div>
  );
}

function ContactPage({ navigate }) {
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
        Kysy taulujen hinnoista tai kerro toiveesi sähköpostitse:{" "}
        <a href="mailto:janne.hakalahti@gmail.com"
          style={TEXT_LINK_STYLE}>
          janne.hakalahti@gmail.com
        </a>
      </p>
      <a className="form-btn" href="mailto:janne.hakalahti@gmail.com">Lähetä sähköpostia</a>
      <p style={{ color:"var(--muted)", marginTop:"1rem", lineHeight:1.7 }}>
        Linkki avaa sähköpostiohjelmasi. Voit myös kopioida yllä olevan osoitteen.
      </p>
      <p style={{ marginTop:"1.5rem" }}>
        <PageLink page="privacy" navigate={navigate} style={TEXT_LINK_STYLE}>Tietosuojaseloste</PageLink>
      </p>
    </div>
  );
}

function PrivacySection({ title, children }) {
  return (
    <section style={{ marginTop:"2.25rem" }}>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:"1.35rem", fontWeight:400, color:"var(--cream)", marginBottom:"0.75rem", letterSpacing:"0.03em" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function PrivacyText({ children }) {
  return <p style={{ color:"var(--body)", lineHeight:1.85, marginBottom:"1rem" }}>{children}</p>;
}

function PrivacyPage() {
  useSEO({
    title: "Tietosuojaseloste – Hakalahti",
    description: "Näin sähköpostiviestejä ja sivuston teknisiä tietoja käsitellään.",
    keywords: "tietosuojaseloste, hakalahti",
    canonical: "/tietosuoja",
  });
  return (
    <div className="page-enter" style={{ maxWidth:680, margin:"0 auto", padding:"5rem 2rem 6rem" }}>
      <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.8rem,5vw,2.4rem)", fontWeight:300, color:"var(--cream)", letterSpacing:"0.03em", lineHeight:1.15 }}>
        Tietosuojaseloste
      </h1>
      <div style={{ width:48, height:1, background:"var(--gold)", margin:"1rem 0 0", opacity:0.7 }}/>

      <PrivacySection title="Kuka vastaa tiedoistasi?">
        <PrivacyText>
          Rekisterinpitäjä on taidemaalari Janne Hakalahti, Kempele.
          Yhteydenotot ja tietosuoja-asiat:{" "}
          <a href="mailto:janne.hakalahti@gmail.com" style={TEXT_LINK_STYLE}>janne.hakalahti@gmail.com</a>.
        </PrivacyText>
      </PrivacySection>

      <PrivacySection title="Kun lähetät sähköpostia">
        <PrivacyText>
          Jos otat yhteyttä sähköpostitse, Janne käyttää sähköpostiosoitettasi, mahdollista nimeäsi ja viestisi tietoja vastaamiseen.
          Osto- ja tilaustyökyselyissä peruste on sopimusta edeltävien toimien tekeminen pyynnöstäsi;
          muissa kysymyksissä oikeutettu etu vastata yhteydenottoihin.
          Viestit käsitellään Gmailissa. Yhteydenottoon liittyviä viestejä säilytetään asian ja siihen
          liittyvien jatkokysymysten käsittelyn ajan. Viestit poistetaan, kun niitä ei enää tarvita näihin tarkoituksiin.
          Toteutuneisiin kauppoihin liittyviä tietoja voidaan säilyttää pidempään siltä osin kuin se on tarpeen
          lakisääteisten velvoitteiden täyttämiseksi tai kauppaan liittyvien oikeusvaateiden selvittämiseksi.
          Yhteydenotto on vapaaehtoista, mutta vastaaminen edellyttää toimivaa sähköpostiosoitetta.
        </PrivacyText>
      </PrivacySection>

      <PrivacySection title="Sivuston käyttö">
        <PrivacyText>
          Sivustolla ei ole yhteydenottolomaketta, evästeitä eikä selaimessa toimivaa seurantaa.
          Fontit ja kuvat ladataan sivustolta.
          Sivuston välittävä Cloudflare käsittelee teknisiä tietoja, kuten IP-osoitteita, sivuston
          toimittamiseksi ja suojaamiseksi. Peruste on oikeutettu etu pitää sivusto toimivana ja turvallisena.
          Janne näkee palvelinpyyntöihin perustuvia yhteenvetotilastoja. Sivustolla ei tehdä profilointia eikä automaattisia päätöksiä.
          Teknisten tietojen säilytys määräytyy Cloudflaren käytäntöjen mukaan.
        </PrivacyText>
      </PrivacySection>

      <PrivacySection title="Palveluntarjoajat">
        <PrivacyText>
          Google ja Cloudflare voivat käsitellä tietoja myös EU:n ja ETA:n ulkopuolella.
          Ne kertovat käyttävänsä siirtojen suojana muun muassa EU:n ja Yhdysvaltojen
          tietosuojakehystä ja vakiosopimuslausekkeita. Lisätietoja käsittelystä ja suojatoimista:{" "}
          <a href="https://policies.google.com/privacy?hl=fi" style={TEXT_LINK_STYLE}>Googlen tietosuojakäytäntö</a>
          {" "}ja{" "}
          <a href="https://www.cloudflare.com/privacypolicy/" style={TEXT_LINK_STYLE}>Cloudflaren tietosuojakäytäntö</a>.
        </PrivacyText>
      </PrivacySection>

      <PrivacySection title="Oikeutesi">
        <PrivacyText>
          Voit pyytää tietojesi tarkastamista, oikaisua tai poistamista ottamalla yhteyttä Janneen.
          Voit myös pyytää käsittelyn rajoittamista, vastustaa oikeutettuun etuun perustuvaa käsittelyä
          ja pyytää tietojen siirtämistä soveltuvin osin. Pyyntöihin vastataan yleensä kuukauden kuluessa.
          Pelkkää sivukäyntiä ei välttämättä voida yhdistää sinuun. Jos tietojasi ei pystytä tunnistamaan,
          siitä kerrotaan sinulle. Tarvittaessa teknisiä tietoja selvitetään Cloudflaren kanssa.
          Jos epäilet tietojesi lainvastaista käsittelyä, voit tehdä valituksen{" "}
          <a href="https://tietosuoja.fi" style={TEXT_LINK_STYLE}>tietosuojavaltuutetun toimistolle</a>.
        </PrivacyText>
      </PrivacySection>
    </div>
  );
}

export default function App() {
  const [page, setPage]   = useState(() => pathToPage(window.location.pathname));
  const [modal, setModal] = useState(null);

  const navigate = (id) => {
    if (window.location.pathname !== PATHS[id]) window.history.pushState({}, "", PATHS[id] ?? "/");
    setPage(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    const onPop = () => setPage(pathToPage(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const renderPage = () => {
    if (page === "custom")  return <CustomPage setPage={navigate}/>;
    if (page === "contact") return <ContactPage navigate={navigate}/>;
    if (page === "privacy") return <PrivacyPage/>;
    return <HomePage setModal={setModal}/>;
  };

  return (
    <>


      <header style={{
        position:"sticky", top:0, zIndex:100,
        background:"rgba(13,13,11,0.93)",
        backdropFilter:"blur(12px)",
        borderBottom:"1px solid var(--border)",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 2rem", height:64,
      }}>
        <PageLink page="home" navigate={navigate}
          style={{ textDecoration:"none", textAlign:"left" }}
          aria-label="Etusivulle">
          <div style={{ fontFamily:"var(--font-display)", fontSize:"1.45rem", fontWeight:400, color:"var(--cream)", letterSpacing:"0.1em", lineHeight:1 }}>
            Hakalahti
          </div>
          <div style={{ fontSize:"0.58rem", letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", marginTop:"4px" }}>
            Öljymaalaukset
          </div>
        </PageLink>
        <Nav page={page} setPage={navigate}/>
      </header>

      <main>{renderPage()}</main>

      <footer style={{ borderTop:"1px solid var(--border)", padding:"2.5rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
        <p style={{ fontSize:"0.72rem", letterSpacing:"0.15em", color:"var(--muted)", textTransform:"uppercase" }}>
          © Hakalahti — Öljymaalaukset, Kempele
        </p>
        <nav aria-label="Alatunniste" style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"0.5rem 1.5rem" }}>
          <PageLink page="privacy" navigate={navigate}
            style={{ fontSize:"0.72rem", letterSpacing:"0.12em", color:"var(--muted)", textTransform:"uppercase", textDecoration:"underline", display:"inline-block", padding:"0.3rem 0" }}>
            Tietosuojaseloste
          </PageLink>
          <span style={{ fontSize:"0.72rem", letterSpacing:"0.12em", color:"var(--muted)", textTransform:"uppercase" }}>
            hakalahti.com
          </span>
        </nav>
      </footer>

      {modal && <Modal painting={modal} onClose={() => setModal(null)}/>}
    </>
  );
}
