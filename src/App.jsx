import { useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Agence from "./Agence.jsx";
import Accueil from "./Accueil.jsx";
import Contact from "./Contact.jsx";
import Experiences from "./Experiences.jsx";

function App() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  function fermerMenu() {
    setMenuOuvert(false);
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink className="logo" to="/" end onClick={fermerMenu}>
          AKB Communication
        </NavLink>
        <button
          className={`menu-toggle${menuOuvert ? " is-open" : ""}`}
          type="button"
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOuvert}
          aria-controls="primary-navigation"
          onClick={() => setMenuOuvert((ouvert) => !ouvert)}
        >
          <span />
          <span />
        </button>
        <nav
          className={`nav${menuOuvert ? " nav-open" : ""}`}
          id="primary-navigation"
          aria-label="Navigation principale"
        >
          <NavLink to="/" end onClick={fermerMenu}>
            Accueil
          </NavLink>
          <NavLink to="/experiences" onClick={fermerMenu}>Expériences</NavLink>
          <NavLink to="/agence" onClick={fermerMenu}>L’agence</NavLink>
          <NavLink className="nav-contact" to="/contact" onClick={fermerMenu}>
            Parlons du projet <span aria-hidden="true">↗</span>
          </NavLink>
        </nav>
      </header>

      <div className="route-content">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/agence" element={<Agence />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<main className="page not-found"><p className="hero-kicker">Erreur 404</p><h1>Cette page est introuvable.</h1><NavLink to="/">Retour à l’accueil</NavLink></main>} />
        </Routes>
      </div>

      <footer className="site-footer">
        <div className="footer-main">
          <Link className="footer-brand" to="/">
            AKB Communication
          </Link>
          <p>« Votre image, notre vision. »</p>
          <p>Lomé, Togo</p>
        </div>
        <div className="footer-contact">
          <a href="mailto:koffibricealy@gmail.com">koffibricealy@gmail.com</a>
          <a href="tel:+22893395377">+228 93 39 53 77</a>
          <a
            href="https://wa.me/22893395377"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
        <div className="footer-socials" aria-label="Réseaux sociaux">
          <span>Suivre AKB</span>
          <a
            href="https://www.tiktok.com/@akb.communication5"
            target="_blank"
            rel="noreferrer"
          >
            TikTok
          </a>
        </div>
        <span className="footer-credit">
          © {new Date().getFullYear()} AKB Communication
        </span>
      </footer>
    </div>
  );
}

export default App;