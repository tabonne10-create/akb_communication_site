# Guide progressif : comprendre React et MongoDB

Ce guide est un parcours pratique, du fonctionnement d'une interface React
jusqu'à une application complète avec une API Node.js et une base MongoDB.
Les exemples s'appuient d'abord sur le site AKB Communication.

> **État du projet :** AKB Communication est aujourd'hui un site React/Vite
> statique. Il n'a pas encore d'API Node.js, de serveur Express ni de base
> MongoDB. Les étapes MongoDB ci-dessous sont un parcours d'apprentissage et
> non des fonctionnalités déjà installées.

## Le résultat à viser

À la fin du parcours, tu devrais pouvoir :

- expliquer le trajet d'une page depuis le navigateur jusqu'au composant React ;
- découper une interface en composants réutilisables et faire circuler les
  données avec les props ;
- gérer les interactions, formulaires, chargements et erreurs ;
- comprendre quand utiliser l'état, les effets, le contexte et le routeur ;
- modéliser les données en documents MongoDB et écrire des opérations CRUD ;
- créer une API Node.js qui valide les demandes et échange avec MongoDB ;
- connecter React à cette API sans exposer de secrets dans le navigateur ;
- lancer, tester et déployer séparément le front-end et le serveur.

## 0. Comprendre les outils et le vocabulaire

Une application web avec base de données a généralement trois parties :

1. **React (front-end)** : affiche l'interface dans le navigateur et réagit aux
   actions de la personne.
2. **API Node.js (back-end)** : reçoit des requêtes HTTP, vérifie les données et
   applique les règles de l'application.
3. **MongoDB (base de données)** : conserve les données sous forme de documents.

Le parcours d'une lecture ressemble à ceci :

```text
Navigateur / React
    -- GET /api/projets -->
API Node.js
    -- recherche -->
MongoDB
    <-- documents --
API Node.js
    <-- JSON --
React affiche les projets
```

React ne doit pas se connecter directement à MongoDB depuis le navigateur.
Une connexion directe exposerait les identifiants de la base aux visiteurs.
Les secrets restent côté serveur.

Dans le dépôt actuel, `npm run dev` lance Vite et `npm run build` produit le
site statique dans `dist/`. Vite n'est pas le serveur MongoDB ou l'API.

## 1. Les bases JavaScript à maîtriser

React est une bibliothèque JavaScript. Avant d'apprendre ses mécanismes, sois à
l'aise avec les notions suivantes :

- `const` et `let`, fonctions et fonctions fléchées ;
- objets, tableaux et déstructuration ;
- `map`, `filter`, `find` et l'opérateur `...` ;
- modules `import` et `export` ;
- promesses, `async`/`await`, `try`/`catch` ;
- JSON et les méthodes HTTP de base.

Exercice : dans `src/Accueil.jsx`, repère le tableau `projets`. Pour chaque
projet, identifie son objet, puis trouve où `map` transforme la liste en
éléments d'interface.

À retenir : les données et l'affichage sont deux choses distinctes. Le tableau
contient les informations ; le rendu React décrit comment les présenter.

## 2. JSX, composants et rendu React

**JSX** est une syntaxe qui permet d'écrire une description d'interface dans du
JavaScript. Un composant est une fonction qui retourne du JSX.

```jsx
function TitreSection({ titre }) {
  return <h2>{titre}</h2>;
}
```

Les composants React commencent par une majuscule. Ils peuvent être composés :
une page utilise souvent plusieurs petits composants. Utilise des éléments
HTML sémantiques (`main`, `section`, `nav`, `button`) plutôt que des `div`
partout.

Dans ce projet :

- `src/main.jsx` crée la racine React et englobe l'application dans
  `BrowserRouter` ;
- `src/App.jsx` compose la navigation, les routes et le pied de page ;
- `Accueil`, `Agence`, `Experiences` et `Contact` sont des composants de page.

Exercice : ajoute une petite fonction composant `BadgeService` qui reçoit un
libellé par prop, puis utilise-la pour présenter un service. Vérifie que le
composant reste réutilisable avec plusieurs libellés.

## 3. Props, listes, conditions et événements

Les **props** sont des données reçues par un composant. Elles sont en lecture
seule : un composant ne doit pas les modifier.

```jsx
function CarteProjet({ projet }) {
  return (
    <article>
      <h3>{projet.titre}</h3>
      <p>{projet.description}</p>
    </article>
  );
}
```

Pour afficher une collection, on utilise souvent `map` et une `key` stable :

```jsx
{projets.map((projet) => (
  <CarteProjet key={projet.id} projet={projet} />
))}
```

Une condition peut choisir le contenu affiché :

```jsx
{chargement ? <p>Chargement…</p> : <ListeProjets projets={projets} />}
```

Les événements sont passés sous forme de fonctions (`onClick`, `onChange`,
`onSubmit`). Il faut fournir la fonction, sans l'exécuter au moment du rendu :
`onClick={ouvrir}` et non `onClick={ouvrir()}`.

Exercice : crée un composant de carte pour les éléments de `projets` dans
`src/Accueil.jsx`. Garde le même rendu visuel, et vérifie que chaque carte
dispose d'une clé unique.

## 4. État local : `useState`

L'**état** est une donnée qui peut changer et dont le changement doit mettre à
jour l'interface. `useState` fournit une valeur et une fonction de mise à jour :

```jsx
const [menuOuvert, setMenuOuvert] = useState(false);

function basculerMenu() {
  setMenuOuvert((ouvert) => !ouvert);
}
```

`src/App.jsx` utilise ce mécanisme pour ouvrir et fermer le menu mobile.
`src/Accueil.jsx` utilise l'état pour le filtre des projets et l'image ouverte
dans la galerie.

Règles importantes :

- ne modifie pas directement un objet ou un tableau d'état ;
- crée une nouvelle valeur avec `map`, `filter` ou l'opérateur `...` ;
- si la nouvelle valeur dépend de l'ancienne, utilise la forme fonctionnelle
  `setValeur((ancienne) => ...)` ;
- ne crée pas d'état pour une valeur qui peut être calculée à partir d'autres
  données.

Exercice : ajoute à la galerie un état de catégorie sélectionnée. Filtre la
liste avec `filter`, puis rends le bouton actif accessible avec `aria-pressed`.

## 5. Formulaires et contrôle des données

Un formulaire React peut garder ses valeurs dans l'état. Un champ contrôlé
utilise `value` et `onChange` :

```jsx
const [nom, setNom] = useState("");

<input
  value={nom}
  onChange={(event) => setNom(event.target.value)}
  required
/>
```

À la soumission, intercepte `onSubmit`, appelle `event.preventDefault()`,
vérifie les champs et affiche un résultat compréhensible.

Le formulaire Netlify du projet (`src/Contact.jsx` et le formulaire caché dans
`index.html`) ne constitue pas un backend MongoDB. L'apprentissage plus loin
consistera à envoyer son contenu à une API, qui devra valider les valeurs à
nouveau. La validation front-end améliore l'expérience, mais ne remplace jamais
la validation serveur.

Exercice : décris les états possibles du formulaire contact : vide, invalide,
en envoi, envoyé et erreur. L'interface doit communiquer clairement chacun.

## 6. Effets, données dérivées et navigation

### Données dérivées et `useMemo`

Si une liste filtrée peut être recalculée depuis la liste et le filtre, c'est
une **donnée dérivée** :

```jsx
const projetsFiltres = projets.filter(
  (projet) => categorieActive === "Tous" || projet.categorie === categorieActive
);
```

`useMemo` peut éviter un calcul coûteux répété, mais n'est pas requis pour
chaque valeur. Il faut d'abord une raison de performance.

### `useEffect`

Un effet sert à synchroniser React avec un système extérieur : abonnement,
minuteur, API, titre de page ou événement clavier. Il ne sert pas à calculer
simplement une valeur à afficher.

```jsx
useEffect(() => {
  function traiterClavier(event) {
    if (event.key === "Escape") fermer();
  }

  window.addEventListener("keydown", traiterClavier);
  return () => window.removeEventListener("keydown", traiterClavier);
}, [fermer]);
```

Dans `src/Accueil.jsx`, `useEffect` installe et nettoie les événements clavier
de la galerie. Le nettoyage empêche de laisser un écouteur actif quand la vue
change.

### React Router

`BrowserRouter`, `Routes`, `Route`, `Link` et `NavLink` sont fournis par
React Router dans ce projet. Ils affichent différentes pages selon l'URL sans
recharger toute l'application.

Exercice : ajoute une route de démonstration `/apprentissage`, un lien de
navigation pour y accéder, puis vérifie aussi le comportement de la route 404.

## 7. Organiser une application React qui grandit

Quand l'application s'agrandit :

- garde chaque composant responsable d'une tâche claire ;
- extrais les cartes, formulaires et blocs répétitifs ;
- place les données partagées dans le parent commun le plus proche ;
- passe des props explicites plutôt que de cacher des dépendances ;
- réserve Context aux données véritablement partagées dans une grande partie
  de l'arbre (par exemple thème ou session utilisateur) ;
- utilise des hooks personnalisés pour partager une logique, pas pour masquer
  une simple ligne de code ;
- garde les états de chargement, erreur et contenu vide distincts.

Ne commence pas par ajouter une bibliothèque de gestion d'état. `useState`,
les props et, si nécessaire, Context suffisent à de nombreux sites.

Exercice : extrais le menu mobile de `src/App.jsx` dans un composant dédié,
tout en conservant ses liens, son état accessible et son comportement.

## 8. MongoDB : documents, collections et relations

MongoDB est une base de données orientée documents. Les données sont stockées
dans des **collections**, elles-mêmes regroupées dans une **base de données**.
Un document est proche d'un objet JSON (stocké en BSON) et possède généralement
un identifiant `_id`.

Exemple de document de projet :

```json
{
  "_id": "identifiant-généré-par-mongodb",
  "titre": "Portrait de fête",
  "categorie": "Portrait",
  "description": "Un portrait réalisé pendant une célébration.",
  "imageUrl": "https://exemple.net/photo.webp",
  "publie": true,
  "createdAt": "2026-01-15T10:00:00.000Z"
}
```

Une collection `projets` peut contenir plusieurs documents de ce type. MongoDB
permet aux documents d'avoir des champs qui diffèrent, mais cela ne veut pas
dire qu'il faut accepter des données incohérentes : on établit une structure et
on valide les entrées.

### Modéliser avant de coder

Pour une première version du portfolio, une collection de projets peut suffire.
Écris d'abord les questions auxquelles le site doit répondre :

- quels projets peuvent être affichés publiquement ?
- peut-on filtrer par catégorie ?
- doit-on retrouver les plus récents en premier ?
- une image est-elle obligatoire ?
- qui est autorisé à créer ou supprimer un projet ?

Une référence entre documents est utile lorsque les données évoluent
indépendamment ou sont partagées. Des documents imbriqués conviennent lorsque
les éléments sont généralement lus et modifiés ensemble. Choisis selon les
requêtes à effectuer, plutôt que de reproduire automatiquement des tables
relationnelles.

### Opérations CRUD

- **Create** : ajouter un document ;
- **Read** : lire ou rechercher des documents ;
- **Update** : modifier un document ;
- **Delete** : supprimer un document.

Apprends ensuite les filtres (`find`, `findOne`), le tri, la limite, la
pagination et les index. Un index accélère certaines recherches, mais demande
de l'espace et rend les écritures un peu plus coûteuses.

### Environnement d'apprentissage

Tu peux étudier MongoDB avec MongoDB Atlas (service hébergé) ou installer une
édition locale de MongoDB Community. Pour une première expérience, crée une
base d'entraînement et une collection sans données personnelles. N'utilise
pas de vrais mots de passe ou informations sensibles dans les exercices.

## 9. Node.js, API et connexion sécurisée à MongoDB

MongoDB ne reçoit pas les appels React directement. L'API est l'intermédiaire :

```text
React -- HTTP/JSON --> API Node.js -- driver MongoDB --> MongoDB
```

Dans un futur dossier serveur séparé, tu peux choisir :

- le **driver officiel MongoDB** pour apprendre directement les opérations de
  la base ;
- **Mongoose** si tu veux travailler avec des schémas et des modèles.

Choisis une option au début et apprends-la correctement ; ne mélange pas les
deux approches sans besoin.

Une API de portfolio peut proposer :

| Méthode | Route | Rôle |
| --- | --- | --- |
| `GET` | `/api/projets` | Lister les projets publiés |
| `GET` | `/api/projets/:id` | Lire un projet |
| `POST` | `/api/projets` | Créer un projet (route protégée) |
| `PATCH` | `/api/projets/:id` | Modifier un projet (route protégée) |
| `DELETE` | `/api/projets/:id` | Supprimer un projet (route protégée) |

Réponses HTTP courantes : `200` (succès), `201` (création), `400` (données
invalides), `401` (non authentifié), `403` (non autorisé), `404` (introuvable)
et `500` (erreur interne). L'API ne doit pas renvoyer les détails secrets d'une
erreur interne.

Principes de sécurité à respecter dès le premier exercice :

- conserve l'URI MongoDB et les secrets dans des variables d'environnement du
  serveur, jamais dans le code React, le dépôt Git ou les fichiers `VITE_*` ;
- limite les droits de l'utilisateur de base au strict nécessaire ;
- valide les données à l'entrée sur le serveur et limite la taille des requêtes ;
- protège les routes de création, modification et suppression par authentification
  et autorisation ;
- utilise des requêtes structurées, jamais une chaîne de requête assemblée avec
  des entrées utilisateur ;
- configure CORS pour les domaines attendus ; CORS seul n'est pas une
  authentification ;
- ne stocke pas les mots de passe en clair ;
- ne retourne que les champs nécessaires au client.

## 10. Appeler l'API depuis React

Un chargement réseau doit représenter au minimum trois états : en cours,
réussi et erreur. Exemple simplifié :

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function chargerProjets() {
    setChargement(true);
    setErreur("");

    try {
      const response = await fetch(`${API_URL}/api/projets`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error("Impossible de charger les projets.");
      }
      const projetsRecus = await response.json();
      setProjets(projetsRecus);
    } catch (error) {
      if (error.name !== "AbortError") {
        setErreur(error.message);
      }
    } finally {
      if (!controller.signal.aborted) {
        setChargement(false);
      }
    }
  }

  chargerProjets();
  return () => controller.abort();
}, []);
```

Cet exemple sert à expliquer le flux ; il faudra l'adapter à l'architecture et
aux versions choisies lorsque le serveur existera. Une annulation évite de
mettre à jour l'interface après le démontage du composant. La gestion des
erreurs doit rester visible pour la personne.

Exercice : remplace temporairement les projets statiques par une liste renvoyée
par une API de test locale. Garde une interface de chargement, une interface
d'erreur et une interface vide.

## 11. Parcours de réalisation, étape par étape

Avance dans cet ordre. Termine un jalon avant de passer au suivant.

### Jalon A — Lire le site

1. Ouvre `src/main.jsx`, puis suis les imports jusqu'à `App`.
2. Dessine l'arbre : `main.jsx` → `App` → navigation, route sélectionnée,
   pied de page.
3. Trouve les composants, les props, les états, les événements et les effets
   de la page d'accueil.
4. Lance `npm run dev`, change un texte, puis vérifie `npm run lint` et
   `npm run build`.

**Validation :** tu peux expliquer à quoi sert chaque fichier principal et
retrouver où modifier un élément d'interface.

### Jalon B — Modifier React sans casser l'existant

1. Extrais une carte de projet en composant.
2. Ajoute une catégorie et son filtre.
3. Améliore le formulaire contact avec des états explicites.
4. Teste le clavier, le petit écran et les routes existantes.

**Validation :** le site reste navigable au clavier et les filtres ne modifient
pas les données d'origine.

### Jalon C — Apprendre MongoDB séparément

1. Crée une base d'essai et une collection `projets`.
2. Ajoute quelques documents fictifs.
3. Liste-les, filtre-les, trie-les et modifie-en un.
4. Ajoute un index seulement après avoir identifié une requête qui en profite.
5. Supprime les données d'exercice une fois le parcours terminé.

**Validation :** tu peux expliquer ce qu'est une collection, un document, un
filtre et un index, et effectuer les opérations CRUD.

### Jalon D — Construire une API de test

1. Crée un petit serveur Node.js séparé du front-end.
2. Ajoute une route `GET /api/projets` qui renvoie d'abord des données fictives.
3. Ajoute validation, codes HTTP et gestion d'erreurs.
4. Connecte ensuite ce serveur à la base MongoDB.
5. Garde les identifiants dans l'environnement du serveur.

**Validation :** l'API peut lister et créer des données valides, et rejette
proprement les données invalides.

### Jalon E — Connecter le site et préparer la production

1. Fais appeler l'API depuis React.
2. Vérifie les états de chargement, erreur et absence de résultats.
3. Protège les opérations d'administration.
4. Configure séparément les variables d'environnement et les domaines de
   développement et de production.
5. Déploie l'API et la base avec des secrets et des sauvegardes configurés.

**Validation :** le site ne contient aucun secret de base de données et les
fonctions publiques continuent de marcher si l'API est temporairement
indisponible.

## 12. Méthode d'étude conseillée

Pour chaque sujet :

1. Lis ou regarde une leçon courte dans la documentation officielle.
2. Reformule le concept avec tes propres mots.
3. Trouve un exemple existant dans ce projet.
4. Fais une petite modification de code.
5. Teste le cas normal, un cas vide et un cas d'erreur.
6. Note ce que tu as appris et ce qui reste flou.

Sessions de 45 à 90 minutes régulières recommandées. Ne cherche pas à mémoriser
toutes les API : l'objectif est de savoir lire le code, raisonner sur les
données et retrouver la documentation.

## 13. Glossaire

- **Composant** : fonction React qui décrit une partie de l'interface.
- **JSX** : syntaxe de description d'interface utilisée dans JavaScript.
- **Props** : données transmises d'un composant parent à un composant enfant.
- **État** : donnée changeante qui pilote le rendu d'un composant.
- **Effet** : synchronisation avec un système extérieur à React.
- **API** : interface HTTP par laquelle le front-end demande une action au
  serveur.
- **JSON** : format texte courant pour échanger des données.
- **Document** : enregistrement de type objet dans MongoDB.
- **Collection** : ensemble de documents MongoDB comparables à une collection
  d'enregistrements.
- **CRUD** : créer, lire, modifier et supprimer.
- **Variable d'environnement** : configuration fournie au processus sans la
  coder dans l'application.

## 14. Ressources officielles

- [Tutoriel officiel React](https://react.dev/learn)
- [Référence des Hooks React](https://react.dev/reference/react)
- [Documentation React Router](https://reactrouter.com/start/library/installation)
- [Guide MongoDB](https://www.mongodb.com/docs/manual/)
- [MongoDB University](https://learn.mongodb.com/)
- [Driver MongoDB pour Node.js](https://www.mongodb.com/docs/drivers/node/current/)
- [Documentation Node.js](https://nodejs.org/docs/latest/api/)
- [Documentation Express](https://expressjs.com/)

Les interfaces et les versions des outils évoluent. Consulte la documentation
officielle correspondant à la version réellement installée avant de copier une
commande ou un extrait de code.
