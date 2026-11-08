import { Link } from "react-router-dom";
import photographeImage from "../images/optimized/photographe_800x600.webp";

const services = [
  {
    numero: "01",
    titre: "Photo & vidéo",
    besoin: "Photo et vidéo",
    description:
      "Photos et vidéos pour les mariages, cérémonies, anniversaires, remises de diplômes et événements professionnels.",
    public: "Familles, entreprises, écoles et organisateurs d’événements.",
  },
  {
    numero: "02",
    titre: "Réseaux sociaux",
    besoin: "Gestion des réseaux sociaux",
    description:
      "Création de photos, vidéos courtes et publications pour faire connaître votre activité et garder le contact avec vos clients.",
    public: "Restaurants, boutiques, salons, hôtels et petites entreprises.",
  },
  {
    numero: "03",
    titre: "Sites web & applications mobiles",
    besoin: "Web et mobile",
    description:
      "Sites adaptés au téléphone pour présenter vos services, afficher un catalogue et faciliter les demandes par WhatsApp.",
    public: "Commerçants, indépendants, écoles et associations.",
  },
];

function Agence() {
  return (
    <main className="page agency-page">
      <section className="agency-intro">
        <div>
          <p className="hero-kicker">L’agence</p>
          <h1>AKB Communication</h1>
          <p className="agency-slogan">« Votre image, notre vision. »</p>
          <p className="agency-description">
            Basée à Lomé, AKB Communication vous accompagne en photo, vidéo,
            gestion des réseaux sociaux et création de solutions web et
            mobiles, avec une approche attentive à vos objectifs. Notre équipe
            se déplace dans toutes les villes du Togo ; les frais de déplacement
            sont précisés selon le lieu et la mission.
          </p>
          <Link className="agency-contact-link" to="/contact">
            Échanger sur votre projet <span aria-hidden="true">→</span>
          </Link>
        </div>
        <img
          src={photographeImage}
          alt="Le photographe d’AKB Communication au travail."
          loading="lazy"
        />
      </section>

      <section className="agency-services" aria-labelledby="agency-services-title">
        <div className="section-heading">
          <p className="hero-kicker">Nos prestations</p>
          <h2 id="agency-services-title">Une approche attentive, de bout en bout</h2>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.numero}>
              <span className="service-number">{service.numero}</span>
              <h3>{service.titre}</h3>
              <p>{service.description}</p>
              <p className="service-audience">
                <strong>Pour :</strong> {service.public}
              </p>
              <Link
                className="service-card-link"
                to={`/contact?besoin=${encodeURIComponent(service.besoin)}`}
              >
                Demander un devis <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="agency-contact">
        <div>
          <p className="hero-kicker">Parlons-en</p>
          <h2>AKB Communication, à Lomé, Togo</h2>
        </div>
        <div className="agency-contact-details">
          <a href="mailto:koffibricealy@gmail.com">koffibricealy@gmail.com</a>
          <a href="tel:+22893395377">+228 93 39 53 77</a>
          <a
            href="https://wa.me/22893395377"
            target="_blank"
            rel="noreferrer"
          >
            Nous écrire sur WhatsApp
          </a>
        </div>
      </section>
      <section className="agency-services" aria-labelledby="agency-references-title">
        <div className="section-heading">
          <p className="hero-kicker">Collaborations</p>
          <h2 id="agency-references-title">Des réalisations pour des marques</h2>
        </div>
        <div className="experience-preview-grid">
          <article>
            <span>GESTION DES RÉSEAUX SOCIAUX</span>
            <h3>Le Roi Lapin</h3>
            <p>
              Collaboration en cours : tournage, montage et publication de
              vidéos pour les réseaux sociaux.
            </p>
            <div className="reference-links" aria-label="Comptes officiels du Roi Lapin">
              <a href="https://www.tiktok.com/@leroilapin7" target="_blank" rel="noreferrer">
                TikTok <span aria-hidden="true">↗</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61584970780473" target="_blank" rel="noreferrer">
                Facebook <span aria-hidden="true">↗</span>
              </a>
              <a href="https://www.instagram.com/leroi_lapin/" target="_blank" rel="noreferrer">
                Instagram <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
          <article>
            <span>CRÉATION VIDÉO</span>
            <h3>Matrix Industries</h3>
            <p>Réalisation de vidéos pour mettre en valeur ses activités.</p>
            <div className="reference-links" aria-label="Compte TikTok de Matrix Industries">
              <a href="https://www.tiktok.com/@matrix_industrie" target="_blank" rel="noreferrer">
                TikTok <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Agence;
