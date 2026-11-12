import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, AudioLines, BriefcaseBusiness,
  Code2, Command, Github, Instagram, Layers3, Menu, Music2, Sparkles,
  X, Zap
} from "lucide-react";

type Page = "home" | "about" | "projects";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/kaanqnw?mdxt=MXQ4cXZnMGlxeWFhaw==", icon: Instagram },
  { label: "TikTok", href: "https://tiktok.com/@beseteyzee", icon: AudioLines },
  { label: "Spotify", href: "https://open.spotify.com/user/31d7hxbnsgahyoidswkzyq4wkvny?si=YrzWXNHCQba7A-caJCvpdA&utm_source=copy-link", icon: Music2 }
];

const projects = [
  { number: "01", title: "Yeni fikirler", type: "Keşif / konsept", description: "Üzerinde çalıştığım fikirler ve denemeler burada yer alacak.", status: "Hazırlanıyor", tone: "blue" },
  { number: "02", title: "Dijital deneyimler", type: "Web / tasarım", description: "Dijital dünyada ürettiğim işler için ayrılmış alan.", status: "Yakında", tone: "violet" },
  { number: "03", title: "Kişisel laboratuvar", type: "Deney / öğrenme", description: "Yeni şeyler öğrendiğim, test ettiğim ve geliştirdiğim çalışmalar.", status: "Yakında", tone: "cyan" }
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [page]);

  const navigate = (next: Page) => setPage(next);

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className={`topbar ${scrolled ? "topbar-scrolled" : ""}`}>
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); navigate("home"); }}>
          <span className="brand-mark">K<span>.</span></span>
          <span className="brand-name">kaanqnw</span>
        </a>
        <nav className="desktop-nav" aria-label="Ana menü">
          {(["home", "about", "projects"] as Page[]).map((item) => (
            <button key={item} className={`nav-link ${page === item ? "active" : ""}`} onClick={() => navigate(item)}>
              {item === "home" ? "Ana sayfa" : item === "about" ? "Hakkımda" : "Projeler"}
            </button>
          ))}
        </nav>
        <a className="header-cta" href="mailto:hello@kaanqnw.com">İletişime geç <ArrowUpRight size={15} /></a>
        <button className="mobile-menu" aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          {(["home", "about", "projects"] as Page[]).map((item) => (
            <button key={item} onClick={() => navigate(item)}>{item === "home" ? "Ana sayfa" : item === "about" ? "Hakkımda" : "Projeler"} <ArrowUpRight size={16} /></button>
          ))}
          <a href="mailto:hello@kaanqnw.com">İletişime geç <ArrowUpRight size={16} /></a>
        </motion.nav>}
      </AnimatePresence>

      <main>
        <AnimatePresence mode="wait">
          {page === "home" && <Home key="home" navigate={navigate} />}
          {page === "about" && <About key="about" />}
          {page === "projects" && <Projects key="projects" />}
        </AnimatePresence>
      </main>

      <Footer navigate={navigate} />
      <div className="cursor-glow" aria-hidden="true" />
    </div>
  );
}

function Home({ navigate }: { navigate: (page: Page) => void }) {
  return <motion.div className="page" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .45 }}>
    <section className="hero section-wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="live-dot" /> KİŞİSEL DİJİTAL ALANIM <span className="eyebrow-line" /></div>
        <h1>Merhaba,<br />ben <span className="gradient-text">Kaan.</span><br /><span className="hero-muted">Dijital dünyada</span><br />kendi yolumu<br />oluşturuyorum<span className="blue-period">.</span></h1>
        <p className="hero-description">Fikirleri keşfetmeyi, yeni şeyler öğrenmeyi ve dijital dünyada kendime ait bir iz bırakmayı seviyorum.</p>
        <div className="hero-actions">
          <button className="button button-primary" onClick={() => navigate("about")}>Beni tanı <ArrowUpRight size={17} /></button>
          <button className="button button-ghost" onClick={() => navigate("projects")}>Projelerimi keşfet <ArrowRight size={16} /></button>
        </div>
        <div className="hero-socials">
          <span>BENİ TAKİP ET</span>
          {socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon size={17} /></a>)}
        </div>
      </div>
      <div className="hero-art" aria-label="K harfinden oluşan soyut 3 boyutlu görsel">
        <div className="art-orbit orbit-a" /><div className="art-orbit orbit-b" />
        <div className="art-core">
          <div className="art-k">K</div>
          <div className="art-glint" />
        </div>
        <div className="art-ring ring-one" /><div className="art-ring ring-two" />
        <div className="art-label label-top"><span>01 / 03</span><span>CREATIVE SPACE</span></div>
        <div className="art-label label-bottom"><span>KAANQN W</span><span>EST. 2026</span></div>
        <div className="floating-chip chip-one"><Sparkles size={14} /> Curiosity</div>
        <div className="floating-chip chip-two"><Code2 size={14} /> Digital</div>
      </div>
      <div className="scroll-cue"><span>KEŞFETMEYE DEVAM ET</span><ArrowDown size={14} /></div>
    </section>

    <section className="intro-strip section-wrap">
      <div className="strip-number">01 <span>—</span> MERHABA</div>
      <div className="strip-content"><h2>Bu alan, <span>benim dünyam.</span></h2><p>Kendimi, ilgilendiğim konuları ve zamanla ortaya koyacağım işleri tek bir yerde topluyorum.</p></div>
      <button className="round-link" onClick={() => navigate("about")} aria-label="Hakkımda sayfasına git"><ArrowUpRight /></button>
    </section>

    <section className="feature-section section-wrap">
      <div className="section-heading"><div><div className="eyebrow">DİJİTAL GÜNLÜĞÜM</div><h2>Merak et.<br /><span className="gradient-text">Üret. Geliş.</span></h2></div><p>Her yeni fikir, keşfedilmeyi bekleyen başka bir dünyanın kapısı.</p></div>
      <div className="feature-grid">
        <FeatureCard icon={<Layers3 />} number="01" title="Hakkımda" text="Beni, ilgi alanlarımı ve dijital dünyaya bakışımı keşfet." action="Beni tanı" onClick={() => navigate("about")} />
        <FeatureCard icon={<BriefcaseBusiness />} number="02" title="Projeler" text="Üzerinde çalıştığım fikirleri ve zamanla büyüyen işlerimi incele." action="Projeleri gör" onClick={() => navigate("projects")} />
        <FeatureCard icon={<Zap />} number="03" title="Bağlantıda kal" text="Sosyal platformlarda beni takip et, ürettiklerime göz at." action="Sosyal hesaplar" onClick={() => document.getElementById("social-links")?.scrollIntoView({ behavior: "smooth" })} />
      </div>
    </section>

    <section className="quote-section section-wrap"><div className="quote-mark">“</div><p>En iyi versiyonun, <span>merak etmeyi</span> bıraktığın yerde değil; başladığın yerde saklı.</p><div className="quote-caption">KAANQNW / KİŞİSEL NOTLAR</div></section>
  </motion.div>;
}

function FeatureCard({ icon, number, title, text, action, onClick }: { icon: React.ReactNode; number: string; title: string; text: string; action: string; onClick: () => void }) {
  return <button className="feature-card" onClick={onClick}><div className="feature-top">{icon}<span>{number}</span></div><div><h3>{title}</h3><p>{text}</p></div><div className="feature-action">{action}<ArrowUpRight size={16} /></div></button>;
}

function About() {
  return <motion.div className="page inner-page section-wrap" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
    <div className="eyebrow"><span className="live-dot" /> 02 / HAKKIMDA</div>
    <div className="inner-hero"><h1>Biraz <span className="gradient-text">ben,</span><br />biraz da<br />hayallerim.</h1><div className="inner-lead"><p>Ben Kaan. Burası kendimi tanıttığım, ilgi alanlarımı paylaştığım ve dijital yolculuğumu belgelediğim kişisel alanım.</p><span className="small-rule" /> <span className="muted-small">TANIŞTIĞIMA MEMNUN OLDUM.</span></div></div>
    <div className="about-panel glass-panel"><div className="panel-icon"><Command /></div><div><div className="eyebrow">YAKLAŞIMIM</div><h2>Öğrenmeye açık.<br /><span className="gradient-text">Üretmeye istekli.</span></h2><p>Yeni teknolojileri ve yaratıcı fikirleri keşfetmek, denemek ve öğrendiklerimi gerçek projelere dönüştürmek istiyorum. Bu site de yolculuğumun yaşayan bir parçası.</p></div><div className="panel-index">K / 2026</div></div>
    <div className="about-bottom"><div><span className="eyebrow">ŞU AN ODAĞIMDA</span><h3>Keşfetmek ve<br />kendimi geliştirmek.</h3></div><p>Bu sayfa zamanla yeni bilgiler, deneyimler ve kişisel hedeflerle güncellenecek. Şimdilik başlangıç noktası burası.</p></div>
  </motion.div>;
}

function Projects() {
  return <motion.div className="page inner-page section-wrap" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
    <div className="eyebrow"><span className="live-dot" /> 03 / PROJELER</div>
    <div className="projects-heading"><h1>Fikirden<br /><span className="gradient-text">gerçeğe.</span></h1><p>Bu bölüm, üzerinde çalıştığım ve ileride burada paylaşacağım projeler için hazırlandı.</p></div>
    <div className="project-list">{projects.map((project) => <article className={`project-card ${project.tone}`} key={project.number}><div className="project-number">{project.number} <span>—</span> {project.type}</div><div className="project-body"><div><h2>{project.title}</h2><p>{project.description}</p></div><span className="project-status"><i />{project.status}</span></div><div className="project-decoration"><div className="deco-cube" /></div></article>)}</div>
    <div className="projects-note"><Sparkles size={17} /><p>Yeni çalışmalar eklendikçe bu sayfa güncellenecek.</p></div>
  </motion.div>;
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return <footer className="footer section-wrap" id="social-links">
    <div className="footer-top"><div><div className="eyebrow">BİR MERHABA YETER</div><h2>Bağlantıda<br /><span className="gradient-text">kalalım.</span></h2></div><a className="footer-mail" href="mailto:hello@kaanqnw.com">hello@kaanqnw.com <ArrowUpRight size={18} /></a></div>
    <div className="footer-bottom"><a className="brand footer-brand" href="#home" onClick={(e) => { e.preventDefault(); navigate("home"); }}><span className="brand-mark">K<span>.</span></span><span className="brand-name">kaanqnw</span></a><div className="footer-socials">{socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon size={17} /></a>)}</div><span className="copyright">© 2026 KAAN. TÜM HAKLARI SAKLIDIR.</span></div>
  </footer>;
}

export default App;
