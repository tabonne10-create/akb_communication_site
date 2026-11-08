import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import portraitFondateurImage from "../images/optimized/portrait-fondateur-akb.webp";
import processionImage from "../images/optimized/Procession africaine aux paniers tressés.webp";
import portraitFeteImage from "../images/optimized/portrait_fete_800x600.webp";
import portraitTressesImage from "../images/optimized/Portrait de fête aux tresses dorées.webp";
import portraitCeremonieImage from "../images/optimized/Portrait cérémoniel aux couleurs éclatantes.webp";
import poigneeMainImage from "../images/optimized/Poignée de main sous le chapiteau.webp";
import ceremonieImage from "../images/optimized/Cérémonie ouest-africaine aux couleurs éclatantes.webp";
import panierImage from "../images/optimized/Cérémonie africaine au panier tressé.webp";
import coupleImage from "../images/optimized/couple_ceremonie_800x600.webp";
import photographeImage from "../images/optimized/photographe_800x600.webp";
import formationAdnImage from "../images/optimized/formation-adn-groupe.webp";
import intervenantAdnImage from "../images/optimized/formation-adn-intervenant.webp";
import atelierImage from "../images/optimized/atelier-intervenant.webp";
import formationParticipantsImage from "../images/optimized/formation-participants.webp";
import mariageVertImage from "../images/optimized/mariage-tenues-vertes.webp";
import octobreRoseImage from "../images/optimized/octobre-rose.webp";
import mariageEmotionImage from "../images/optimized/mariage-emotion.webp";
import portraitNocturneImage from "../images/optimized/portrait-nocturne.webp";
import demarcationVideo from "../videos/première édition de la DÉMARCATION ARTISANALE.mp4";
import makafuiVideo from "../videos/doigts de la fée Makafui merci pour votre participation.mp4";

const projets = [
  {
    id: 1,
    titre: "La procession",
    categorie: "Cérémonie",
    description:
      "Une procession haute en couleur, entre tenues traditionnelles et paniers tressés.",
    image: processionImage,
    alt: "Des participantes en tenues colorées portent des paniers tressés lors d'une procession.",
  },
  {
    id: 2,
    titre: "Portrait de fête",
    categorie: "Portrait",
    description:
      "Un portrait lumineux réalisé pendant une célébration, avec une ambiance chaleureuse.",
    image: portraitFeteImage,
    alt: "Portrait d'une femme vêtue de rose dans une salle décorée de ballons.",
  },
  {
    id: 3,
    titre: "Éclat doré",
    categorie: "Portrait",
    description:
      "Mise en valeur d'un style affirmé et de longues tresses dorées.",
    image: portraitTressesImage,
    alt: "Portrait d'une femme aux longues tresses blondes et dorées.",
  },
  {
    id: 4,
    titre: "Rencontre sous le chapiteau",
    categorie: "Événement",
    description:
      "Un échange capturé sur le vif au cœur d'un événement haut en couleur.",
    image: poigneeMainImage,
    alt: "Deux hommes se serrent la main sous un chapiteau coloré.",
  },
  {
    id: 5,
    titre: "Traditions et couleurs",
    categorie: "Cérémonie",
    description:
      "Une scène de cérémonie qui met à l'honneur les costumes et les traditions.",
    image: ceremonieImage,
    alt: "Des participantes en tenues traditionnelles colorées lors d'une cérémonie.",
  },
  {
    id: 6,
    titre: "Le panier tressé",
    categorie: "Cérémonie",
    description:
      "Un portrait de cérémonie composé autour d'un panier artisanal et de ses couleurs.",
    image: panierImage,
    alt: "Une femme en tenue traditionnelle porte un grand panier tressé.",
  },
  {
    id: 7,
    titre: "Jour de mariage",
    categorie: "Mariage",
    description:
      "Un portrait de couple pour garder le souvenir d'un jour important.",
    image: coupleImage,
    alt: "Un couple pose en tenue de mariage devant une clôture végétalisée.",
  },
  {
    id: 8,
    titre: "Dans les coulisses",
    categorie: "Coulisses",
    description:
      "Le photographe au travail, préparant son cadrage et son éclairage.",
    image: photographeImage,
    alt: "Un photographe prépare son appareil sous un éclairage de studio extérieur.",
  },
  {
    id: 9,
    titre: "Portrait cérémoniel",
    categorie: "Portrait",
    description:
      "Un portrait haut en couleur qui révèle les détails d'une tenue de fête.",
    image: portraitCeremonieImage,
    alt: "Portrait en pied d'une femme portant une tenue de fête colorée.",
  },
  {
    id: 10,
    titre: "Rencontre à l'ADN",
    categorie: "Formation",
    description:
      "Des participants réunis à l'Académie Digitale Numérique pour une formation.",
    image: formationAdnImage,
    alt: "Des participants assistent à une formation de l'Académie Digitale Numérique.",
  },
  {
    id: 11,
    titre: "Transmission du savoir",
    categorie: "Formation",
    description:
      "Un intervenant partage ses connaissances lors d'une session de formation à l'ADN.",
    image: intervenantAdnImage,
    alt: "Un intervenant s'exprime devant des participants, avec le logo de l'ADN.",
  },
  {
    id: 12,
    titre: "Au tableau",
    categorie: "Formation",
    description: "Un moment de présentation autour d'un tableau de cours.",
    image: atelierImage,
    alt: "Un intervenant explique un sujet devant un tableau blanc.",
  },
  {
    id: 13,
    titre: "En salle de formation",
    categorie: "Formation",
    description: "Les participants suivent attentivement une session en salle.",
    image: formationParticipantsImage,
    alt: "Des participants assis dans une salle de formation.",
  },
  {
    id: 14,
    titre: "En vert pour le grand jour",
    categorie: "Mariage",
    description: "Un couple pose ensemble lors d'une réception.",
    image: mariageVertImage,
    alt: "Un couple pose en tenues vertes lors d'une réception.",
  },
  {
    id: 15,
    titre: "Octobre Rose",
    categorie: "Sensibilisation",
    description: "Un visuel de sensibilisation consacré à Octobre Rose.",
    image: octobreRoseImage,
    alt: "Visuel rose d'Octobre Rose avec un intervenant devant un tableau.",
  },
  {
    id: 16,
    titre: "Une étreinte, un souvenir",
    categorie: "Mariage",
    description: "Un instant de tendresse capturé pendant une célébration.",
    image: mariageEmotionImage,
    alt: "Une mariée souriante partage une étreinte avec son partenaire.",
  },
  {
    id: 17,
    titre: "Portrait sous les lumières",
    categorie: "Portrait",
    description: "Un portrait de soirée réalisé sous les lumières de la ville.",
    image: portraitNocturneImage,
    alt: "Une femme pose dans une rue éclairée la nuit.",
  },
];

const categories = [
  "Tous",
  "Cérémonie",
  "Portrait",
  "Événement",
  "Formation",
  "Sensibilisation",
  "Mariage",
  "Coulisses",
];

function Accueil() {
  const [categorieActive, setCategorieActive] = useState("Tous");
  const [projetOuvert, setProjetOuvert] = useState(null);
  const projetsFiltres = useMemo(
    () =>
      categorieActive === "Tous"
        ? projets
        : projets.filter((projet) => projet.categorie === categorieActive),
    [categorieActive]
  );
  const indexProjetOuvert = projetsFiltres.findIndex(
    (projet) => projet.id === projetOuvert?.id
  );
  const changerProjet = useCallback(
    (direction) => {
      const prochainIndex =
        (indexProjetOuvert + direction + projetsFiltres.length) %
        projetsFiltres.length;
      setProjetOuvert(projetsFiltres[prochainIndex]);
    },
    [indexProjetOuvert, projetsFiltres]
  );

  useEffect(() => {
    if (!projetOuvert) {
      return undefined;
    }

    function fermerAvecEchap(event) {
      if (event.key === "Escape") {
        setProjetOuvert(null);
      } else if (event.key === "ArrowRight") {
        changerProjet(1);
      } else if (event.key === "ArrowLeft") {
        changerProjet(-1);
      }
    }

    window.addEventListener("keydown", fermerAvecEchap);
    return () => window.removeEventListener("keydown", fermerAvecEchap);
  }, [changerProjet, projetOuvert]);

  return (
    <main className="page portfolio">
      <section className="hero portfolio-hero">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="availability">
            <span className="availability-dot" aria-hidden="true" />
            Lomé, Togo <span aria-hidden="true">·</span> Disponible pour vos projets
          </p>
          <p className="hero-kicker">Image, communication digitale & développement</p>
          <h1>
            AKB <span>COMMUNICATION</span>
          </h1>
          <p className="hero-role">Votre image, notre vision.</p>
          <p>
            Photo, vidéo, réseaux sociaux et solutions web : AKB Communication
            vous accompagne pour donner vie à vos idées, à Lomé et au-delà.
          </p>
          <div className="hero-actions">
            <Link to="/contact">
              Démarrer un projet <span aria-hidden="true">↗</span>
            </Link>
            <a className="hero-secondary" href="#portfolio">
              Explorer le portfolio <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-proof">
            <span className="hero-proof-line" aria-hidden="true" />
            <span>Des images sincères. Des souvenirs durables.</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-frame">
            <img
              className="hero-photo"
              src={portraitFondateurImage}
              alt="Aly Koffi Brice, fondateur d’AKB Communication et photographe accrédité."
              fetchPriority="high"
            />
            <span className="hero-frame-index">FONDATEUR · AKB</span>
          </div>
          <span className="hero-vertical-label">PHOTOGRAPHIE · LOMÉ</span>
        </div>
        <a className="hero-photo-caption" href="#portfolio">
          <span>Chaque image a une histoire</span>
          <span aria-hidden="true">✳</span>
        </a>
      </section>

      <div className="service-marquee" aria-label="Photo, vidéo, réseaux sociaux, web et mobile">
        <div className="marquee-track" aria-hidden="true">
          {Array.from({ length: 2 }, (_, index) => (
            <span className="marquee-group" key={index}>
              PHOTO <i>✳</i> VIDÉO <i>✳</i> RÉSEAUX SOCIAUX <i>✳</i> SITES WEB
              <i>✳</i> APPLICATIONS MOBILES <i>✳</i>
            </span>
          ))}
        </div>
      </div>

      <section className="services-section" id="services" aria-labelledby="services-title">
        <div className="section-heading">
          <p className="hero-kicker">Ce que nous faisons</p>
          <h2 id="services-title">De l’image à vos projets numériques</h2>
          <p>
            Des services créatifs et digitaux pour accompagner votre activité,
            votre événement ou votre projet.
          </p>
        </div>
        <div className="services-grid">
          <article className="service-card">
            <span className="service-number">01</span>
            <h3>Photo & vidéo</h3>
            <p>
              Mariages, cérémonies, remises de diplômes et événements
              professionnels : racontez vos moments importants en images.
            </p>
            <Link
              className="service-card-link"
              to="/contact?besoin=Photo%20et%20vid%C3%A9o"
            >
              Demander un devis <span aria-hidden="true">→</span>
            </Link>
          </article>
          <article className="service-card">
            <span className="service-number">02</span>
            <h3>Réseaux sociaux</h3>
            <p>
              Des photos, vidéos courtes et publications pour les restaurants,
              boutiques, salons et entreprises.
            </p>
            <Link
              className="service-card-link"
              to="/contact?besoin=Gestion%20des%20r%C3%A9seaux%20sociaux"
            >
              Demander un devis <span aria-hidden="true">→</span>
            </Link>
          </article>
          <article className="service-card">
            <span className="service-number">03</span>
            <h3>Web & mobile</h3>
            <p>
              Un site adapté au téléphone pour présenter vos services, votre
              catalogue et faciliter les demandes par WhatsApp.
            </p>
            <Link
              className="service-card-link"
              to="/contact?besoin=Web%20et%20mobile"
            >
              Demander un devis <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </section>

      <section className="experience-preview" aria-labelledby="references-title">
        <div className="section-heading">
          <p className="hero-kicker">Collaborations</p>
          <h2 id="references-title">Des projets réalisés pour des marques</h2>
          <p>
            Quelques collaborations en communication et en création de contenu.
          </p>
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
            <p>Création de vidéos pour présenter et promouvoir les activités de l’entreprise.</p>
            <div className="reference-links" aria-label="Compte TikTok de Matrix Industries">
              <a href="https://www.tiktok.com/@matrix_industrie" target="_blank" rel="noreferrer">
                TikTok <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="portfolio-section" id="portfolio" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="hero-kicker">Sélection en images</p>
          <h2 id="projects-title">Des instants, des histoires</h2>
          <p>
            Parcourez nos réalisations. Sélectionnez une image pour la voir en
            grand.
          </p>
        </div>

        <div className="project-filters" aria-label="Filtrer les projets">
          {categories.map((categorie) => (
            <button
              key={categorie}
              type="button"
              className={
                categorieActive === categorie
                  ? "project-filter active"
                  : "project-filter"
              }
              aria-pressed={categorieActive === categorie}
              onClick={() => setCategorieActive(categorie)}
            >
              {categorie}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {projetsFiltres.map((projet) => (
            <article
              className="project-card"
              key={projet.id}
              style={{ "--card-index": projetsFiltres.indexOf(projet) }}
            >
              <button
                className="project-open"
                type="button"
                onClick={() => setProjetOuvert(projet)}
                aria-label={`Agrandir la photo : ${projet.titre}`}
              >
                <img
                  className="project-photo"
                  src={projet.image}
                  alt={projet.alt}
                  loading="lazy"
                />
                <span className="project-zoom" aria-hidden="true">
                  ↗
                </span>
              </button>
              <div className="project-copy">
                <p className="project-category">{projet.categorie}</p>
                <h3>{projet.titre}</h3>
                <p>{projet.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="video-section" aria-labelledby="video-title">
        <div className="section-heading">
          <p className="hero-kicker">En mouvement</p>
          <h2 id="video-title">Les événements en vidéo</h2>
          <p>
            Retrouvez quelques vidéos présentes dans le dossier des réalisations.
            Lancez la lecture pour les découvrir.
          </p>
        </div>
        <div className="video-grid">
          <article className="video-card">
            <video
              controls
              preload="none"
              playsInline
              aria-label="Vidéo de la première édition de la Démarcation artisanale"
            >
              <source src={demarcationVideo} type="video/mp4" />
              Votre navigateur ne prend pas en charge la lecture vidéo.
            </video>
            <div className="project-copy">
              <p className="project-category">Événement</p>
              <h3>Démarcation artisanale — 1re édition</h3>
              <p>Un retour en images sur la première édition de l'événement.</p>
            </div>
          </article>
          <article className="video-card">
            <video
              controls
              preload="none"
              playsInline
              aria-label="Vidéo de remerciement de la fée Makafui"
            >
              <source src={makafuiVideo} type="video/mp4" />
              Votre navigateur ne prend pas en charge la lecture vidéo.
            </video>
            <div className="project-copy">
              <p className="project-category">Vidéo</p>
              <h3>La fée Makafui — merci pour votre participation</h3>
              <p>Une vidéo de remerciement issue de vos réalisations.</p>
            </div>
          </article>
        </div>
        <a
          className="text-link"
          href="https://drive.google.com/drive/folders/1M_srGOCpcAUJIh-f2NQybDlfZNZfwsc8?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          Voir les autres vidéos sur Google Drive <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="about-section" aria-labelledby="about-title">
        <div className="about-image-wrap">
          <img
            src={photographeImage}
            alt="Le photographe d’AKB Communication prépare une prise de vue."
            loading="lazy"
          />
          <span className="about-image-note">LA PASSION DU MOMENT JUSTE</span>
        </div>
        <div className="about-copy">
          <p className="hero-kicker">Le fondateur</p>
          <h2 id="about-title">Aly Koffi Brice, créateur d’AKB Communication.</h2>
          <p>
            Photographe accrédité et passionné par la communication visuelle,
            j’ai créé AKB Communication pour donner vie aux idées et valoriser
            les projets à travers l’image et le numérique.
          </p>
          <p>
            À Lomé, je réalise des photos et des vidéos, accompagne les marques
            dans la gestion de leurs réseaux sociaux et, comme développeur web
            et mobile junior, conçois des sites et des applications adaptés à
            leurs besoins.
          </p>
          <Link to="/agence" className="text-link">
            Découvrir AKB Communication <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="experience-preview" aria-labelledby="experience-title">
        <div className="section-heading">
          <p className="hero-kicker">Le parcours</p>
          <h2 id="experience-title">Projets & collaborations</h2>
          <p>
            Des projets auxquels AKB Communication a participé.
          </p>
        </div>
        <div className="experience-preview-grid">
          <article>
            <span>2026 · EN COURS</span>
            <h3>Le Roi Lapin</h3>
            <p>
              Notre équipe assure le tournage, le montage et la publication
              de vidéos pour les réseaux sociaux.
            </p>
          </article>
          <article>
            <span>2026 · ÉVÉNEMENT</span>
            <h3>Dunenyo Zan</h3>
            <p>Projet événementiel autour de Dunenyo Zan.</p>
          </article>
          <article>
            <span>2025 · PROJET NUMÉRIQUE</span>
            <h3>Midzo Tech SARL — Mayo App</h3>
            <p>Projet numérique réalisé avec Midzo Tech SARL.</p>
          </article>
        </div>
        <Link className="text-link" to="/experiences">
          Voir toutes les expériences <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="section-heading">
          <p className="hero-kicker">FAQ</p>
          <h2 id="faq-title">Questions fréquentes</h2>
          <p>Tout commence par une conversation.</p>
        </div>
        <div className="faq-list">
          <details>
            <summary>Quels types de prestations propose AKB Communication ?</summary>
            <p>
              Nous proposons la photo et la vidéo, la gestion des réseaux
              sociaux, ainsi que la création de sites web et d’applications
              mobiles. Contactez-nous pour nous parler de votre projet.
            </p>
          </details>
          <details>
            <summary>Où êtes-vous situés ?</summary>
            <p>
              AKB Communication est basée à Lomé, au Togo. Écrivez-nous pour
              discuter de votre événement et de son lieu.
            </p>
          </details>
          <details>
            <summary>Comment demander un devis ?</summary>
            <p>
              Utilisez le formulaire de contact en précisant votre nom, votre
              adresse e-mail, le type de prestation et quelques détails sur
              votre projet.
            </p>
          </details>
        </div>
      </section>

      <section className="closing-cta" aria-labelledby="closing-title">
        <p className="hero-kicker">Une idée à concrétiser ?</p>
        <h2 id="closing-title">Parlons de votre image, de votre présence en ligne ou de votre projet numérique.</h2>
        <Link to="/contact">Demander un devis <span aria-hidden="true">→</span></Link>
      </section>

      {projetOuvert && (
        <div
          className="lightbox"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setProjetOuvert(null);
            }
          }}
        >
          <section
            className="lightbox-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            <button
              className="lightbox-close"
              type="button"
              onClick={() => setProjetOuvert(null)}
              aria-label="Fermer la photo"
              autoFocus
            >
              ×
            </button>
            {projetsFiltres.length > 1 && (
              <>
                <button
                  className="lightbox-nav lightbox-previous"
                  type="button"
                  onClick={() => changerProjet(-1)}
                  aria-label="Photo précédente"
                >
                  ‹
                </button>
                <button
                  className="lightbox-nav lightbox-next"
                  type="button"
                  onClick={() => changerProjet(1)}
                  aria-label="Photo suivante"
                >
                  ›
                </button>
              </>
            )}
            <img src={projetOuvert.image} alt={projetOuvert.alt} />
            <div className="lightbox-caption">
              <p className="project-category">{projetOuvert.categorie}</p>
              <h2 id="lightbox-title">{projetOuvert.titre}</h2>
              <p>{projetOuvert.description}</p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Accueil;
