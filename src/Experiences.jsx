import { Link } from "react-router-dom";

const experiences = [
  {
    id: "akb",
    nom: "AKB Communication",
    dates: "À partir du 20 décembre 2026",
    statut: "À venir",
  },
  {
    id: "dunenyo",
    nom: "Dunenyo Zan",
    dates: "15 août – 25 août 2026",
    statut: "Terminé",
  },
  {
    id: "adn",
    nom: "Académie Digitale Numérique (ADN)",
    dates: "1er juin 2026",
    statut: "Terminé",
  },
  {
    id: "roi-lapin",
    nom: "Le Roi Lapin",
    dates: "Depuis le 14 mai 2026",
    statut: "En cours",
    contribution:
      "Tournage, montage et publication de vidéos pour les réseaux sociaux.",
  },
  {
    id: "demarcation",
    nom: "Démarcation artisanale — 1re édition",
    dates: "27 décembre 2025",
    statut: "Terminé",
  },
  {
    id: "mayo-app",
    nom: "Midzo Tech SARL — Mayo App",
    dates: "6 janvier – 14 octobre 2025",
    statut: "Terminé",
  },
];

function Experiences() {
  return (
    <main className="page experiences-page">
      <header className="contact-heading">
        <p className="hero-kicker">Parcours professionnel</p>
        <h1>Expériences</h1>
        <p>
          Cette page présente les projets et leurs dates. Le travail réalisé
          par AKB est indiqué lorsqu’il est confirmé.
        </p>
      </header>

      <ol className="experience-list">
        {experiences.map((experience, index) => (
          <li
            className="experience-item"
            key={experience.id}
            style={{ "--card-index": index }}
          >
            <span className="experience-marker" aria-hidden="true" />
            <article className="experience-card">
              <div className="experience-card-heading">
                <p className="experience-date">{experience.dates}</p>
                <span
                  className={`experience-status ${
                    experience.statut === "En cours"
                      ? "status-current"
                      : experience.statut === "À venir"
                        ? "status-upcoming"
                        : "status-complete"
                  }`}
                >
                  {experience.statut}
                </span>
              </div>
              <h2>{experience.nom}</h2>
              {experience.contribution && (
                <p className="experience-contribution">
                  <strong>Travail réalisé par AKB :</strong>{" "}
                  {experience.contribution}
                </p>
              )}
            </article>
          </li>
        ))}
      </ol>

      <section className="closing-cta experience-cta">
        <p className="hero-kicker">Une collaboration en tête ?</p>
        <h2>Parlons de votre prochain projet.</h2>
        <Link to="/contact">
          Me contacter <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}

export default Experiences;
