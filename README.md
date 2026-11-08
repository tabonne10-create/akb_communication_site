# AKB Communication

Site vitrine d'AKB Communication, construit avec React, Vite et React Router.
Le site est actuellement une application front-end statique : aucune API Node.js
ni base de données MongoDB n'est connectée.

## Démarrer le projet

Prérequis : Node.js et npm.

```powershell
npm install
npm run dev
```

Le terminal affiche l'adresse locale à ouvrir dans le navigateur.

Commandes disponibles :

```powershell
npm run lint
npm run build
npm run preview
```

Sur Windows, si PowerShell bloque le script `npm.ps1`, utiliser `npm.cmd` à la
place (par exemple `npm.cmd run dev`).

## Structure du projet

- `src/main.jsx` : point d'entrée React et configuration du routeur.
- `src/App.jsx` : navigation, routes, menu et pied de page.
- `src/Accueil.jsx` : page d'accueil, projets, filtres, galerie et présentation
  du fondateur.
- `src/Agence.jsx`, `src/Experiences.jsx`, `src/Contact.jsx` : pages du site.
- `src/index.css`, `src/App.css` : styles.
- `images/`, `videos/` : médias locaux importés par les composants.
- `public/` : fichiers servis tels quels, comme `robots.txt` et `sitemap.xml`.

## Apprendre React et MongoDB

Le projet permet d'étudier React côté navigateur. MongoDB n'est pas encore
utilisé : pour l'apprendre en pratique, il faudra ensuite créer une API serveur
Node.js qui communiquera avec la base et que React appellera en HTTP.

Le parcours étape par étape, les exercices et l'architecture recommandée sont
dans le [guide React et MongoDB](./docs/guide-react-mongodb.md).
