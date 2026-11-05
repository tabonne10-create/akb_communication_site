import { useState } from "react";

function Contact() {
  const [etatEnvoi, setEtatEnvoi] = useState("idle");
  const [erreur, setErreur] = useState("");

  async function envoyer(event) {
    event.preventDefault();
    setErreur("");

    if (import.meta.env.DEV) {
      setEtatEnvoi("error");
      setErreur(
        "Le formulaire sera opérationnel une fois le site publié sur Netlify. En attendant, vous pouvez nous écrire par e-mail ou WhatsApp."
      );
      return;
    }

    setEtatEnvoi("sending");
    const form = event.currentTarget;
    const donnees = new URLSearchParams(new FormData(form)).toString();

    try {
      const reponse = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: donnees,
      });

      if (!reponse.ok) {
        throw new Error("La plateforme n’a pas accepté le formulaire.");
      }

      setEtatEnvoi("sent");
      form.reset();
    } catch (error) {
      setEtatEnvoi("error");
      setErreur(
        "Le message n’a pas pu être envoyé. Réessayez ou écrivez directement à koffibricealy@gmail.com."
      );
      console.error("Échec de l’envoi du formulaire de contact :", error);
    }
  }

  return (
    <main className="page contact-page">
      <header className="contact-heading">
        <p className="hero-kicker">Contact</p>
        <h1>Parlons de votre projet</h1>
        <p>
          Racontez-nous ce que vous imaginez. Nous reviendrons vers vous pour en
          discuter.
        </p>
      </header>

      <form
        className="formulaire"
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={envoyer}
      >
        <input type="hidden" name="form-name" value="contact" />
        <label className="form-honeypot" aria-hidden="true">
          Ne pas remplir
          <input name="bot-field" tabIndex="-1" autoComplete="off" />
        </label>
        <label>
          Votre nom
          <input
            type="text"
            name="nom"
            autoComplete="name"
            required
          />
        </label>

        <label>
          Votre adresse e-mail
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </label>

        <label>
          Quel est votre besoin ?
          <select
            name="besoin"
            defaultValue="Photo et vidéo"
          >
            <option>Photo et vidéo</option>
            <option>Gestion des réseaux sociaux</option>
            <option>Création de site web</option>
            <option>Application mobile</option>
            <option>Autre demande</option>
          </select>
        </label>

        <label>
          Votre message
          <textarea
            name="message"
            required
          />
        </label>

        <button
          type="submit"
          className="envoyer"
          disabled={etatEnvoi === "sending"}
        >
          {etatEnvoi === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>
      </form>

      {etatEnvoi === "sent" && (
        <p className="confirmation" role="status">
          Merci ! Votre demande a bien été envoyée. AKB Communication vous
          répondra dès que possible.
        </p>
      )}
      {erreur && (
        <p className="form-error" role="alert">
          {erreur}
        </p>
      )}
      <p className="contact-direct">
        Vous préférez écrire directement ?{" "}
        <a href="mailto:koffibricealy@gmail.com">koffibricealy@gmail.com</a>
      </p>
      <p className="contact-direct">
        Ou contactez-nous sur WhatsApp au{" "}
        <a href="https://wa.me/22893395377">+228 93 39 53 77</a>.
      </p>
    </main>
  );
}

export default Contact;