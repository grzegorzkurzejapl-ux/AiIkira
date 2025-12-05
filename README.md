# Interface Ikira
Une petite interface web locale pour discuter avec Ikira, lui apprendre des réponses personnalisées et garder vos souvenirs sur
votre propre navigateur.

## Lancer dans un navigateur
Ouvrez simplement `index.html` dans votre navigateur. Les souvenirs sont stockés dans `localStorage`, rien n'est envoyé en ligne.

## Lancer et packager avec Visual Studio Code + Electron
### Pré-requis (Windows recommandé pour générer l'`.exe`)
- Node.js 18+ et npm
- Visual Studio Code (facultatif mais pratique)
- Git (si vous clonez le dépôt)

### Démarrer en mode dev
1. Ouvrez ce dossier dans Visual Studio Code.
2. Installez les dépendances : `npm install`.
3. Lancez la fenêtre desktop : `npm start`.

### Construire le `.exe` portable
1. Ouvrez un terminal **sous Windows** (PowerShell ou CMD) à la racine du projet.
2. Installez les dépendances si ce n'est pas fait : `npm install`.
3. Générez l'exécutable : `npm run build`.
4. Récupérez le fichier dans `dist/` (nommé `Ikira-Portable-<version>.exe`).

> Astuce : si vous êtes sous macOS/Linux mais ciblez Windows, exécutez `npm run build` dans une VM ou un conteneur Windows pour obtenir l'`exe`.

## Fonctionnalités
- Thème sombre avec texte rouge pour Ikira et rose pour vos messages.
- Zone de chat en direct pour écrire et lire les réponses.
- Formulaire d'apprentissage pour ajouter des questions/réponses mémorisées.
- Sauvegarde automatique des nouveaux souvenirs dans votre navigateur.
