## ⚠️ CONTRAINTE CRITIQUE (ANTI “VIBE CODING”)
Le site **NE DOIT PAS** ressembler à un portfolio frontend standard.

À ÉVITER ABSOLUMENT :
- Hero plein écran générique avec gros gradient flou
- Cartes flottantes arrondies partout sans logique
- Glassmorphism gratuit
- “Creative developer” / “Building digital experiences”
- Animations excessives sans intention
- Sections copiées-collées (Hero / About / Projects classiques)

À FAIRE À LA PLACE :
- Design **éditorial / produit**, pas “dribbble”
- Hiérarchie claire, peu d’effets mais intentionnels
- UI fonctionnelle avant esthétique
- Chaque animation doit **expliquer quelque chose**
- Layout asymétrique contrôlé
- Espaces blancs assumés
- Inspiration : documentation produit, outils dev, interfaces SaaS sobres

Objectif :
> Donner l’impression d’un **outil pensé par un ingénieur**, pas d’un template.

---

## 🎯 Objectif
Créer un **portfolio frontend premium**, rapide et crédible techniquement, destiné à :
- Recruteurs frontend
- Écoles / bootcamps
- Développeurs expérimentés

Le site doit montrer :
- Capacité d’architecture frontend
- Maîtrise UX/UI raisonnée
- Structuration propre des données
- Pensée produit et technique

---

## 🧩 Concept global
**Portfolio narratif structuré + vue technique**
- Navigation fluide type application
- Sections progressives
- Toggle global “Vue recruteur / Vue technique”
- Données entièrement data-driven (JSON local)
- Multilingue FR / EN (i18n)

---

## 🌍 Internationalisation (OBLIGATOIRE)

### Langues
- Français
- Anglais

### Implémentation
- i18n avec fichiers de traduction locaux
- Exemple :
src/i18n/
├─ fr.json
├─ en.json


- Toggle de langue visible et accessible
- Langue par défaut : anglais
- Aucune chaîne de texte hardcodée dans les composants

### Contenu
- Textes naturels, non traduits mot à mot
- Ton professionnel, clair, direct
- Pas de jargon marketing creux

---

## ⚙️ Stack technique (OBLIGATOIRE)
- Bundler : **Vite.js**
- Framework : **React**
- Routing : **React Router**
- Animations : **Framer Motion** (usage minimal)
- Styles : **Tailwind CSS**
- i18n : solution locale (type react-i18next)
- Données : **fichiers JSON locaux**
- Mobile-first
- Accessible
- Performant

---

## 🗂️ Gestion des données (OBLIGATOIRE)

### Source
Toutes les données proviennent de fichiers JSON locaux.

Exemples :
- `data/projects.json`
- `data/hackathons.json`
- `data/experience.json`
- `data/skills.json`

### Règles
- Aucun contenu métier hardcodé
- Les composants consomment uniquement les données
- Structure extensible
- Chargement via import ou fetch local

---

## 📦 Structure recommandée

src/
├─ data/
├─ i18n/
├─ components/
│ ├─ layout/
│ ├─ sections/
│ └─ ui/
├─ pages/
├─ hooks/
├─ utils/
├─ styles/
└─ main.jsx

---

## 🧱 Pages & Sections

### 1. Landing (non standard)
- Pas de hero plein écran classique
- Texte court, précis, aligné à gauche
- CTA sobres
- Animation discrète liée au scroll
- Typographie expressive, pas décorative

---

### 2. Parcours (Story structurée)
- Timeline verticale ou éditoriale
- Données issues du JSON
- Focus sur décisions, pas sur émotions

---

### 3. Projets (Scroll horizontal raisonné)
- Scroll horizontal uniquement si pertinent
- Projets depuis `projects.json`
- Accent sur le **pourquoi** et le **comment**
- Transition sobre vers le détail

---

### 4. Page projet (double vue)
**Vue normale**
- Problème
- Solution
- Résultat

**Vue technique**
- Stack
- Contraintes
- Choix techniques
- Compromis
- Lien GitHub

---

### 5. Hackathons & Expériences
- Timeline claire
- Rôles précis
- Apprentissages concrets
- Données JSON

---

### 6. Mini-lab
- Démo frontend utile
- Interaction contrôlée
- Objectif pédagogique clair

---

### 7. Compétences
- Groupées par logique
- Peu d’animations
- Texte explicatif court et précis

---

### 8. Apprentissage en cours
- Roadmap simple
- Mise à jour facile via JSON

---

### 9. Contact
- Minimal
- Fonctionnel
- Sans mise en scène inutile

---

## 🎨 Direction artistique

### Palette
- Background : `#0F172A`
- Texte principal : `#E5E7EB`
- Accent principal : `#38BDF8`
- Accent secondaire : `#22C55E`
- Détails : `#64748B`

### Typographie
- Titres : Inter ou Space Grotesk
- Texte : Inter
- Code : JetBrains Mono

Lisibilité > style.

---

## 🧠 UX / UI Rules
- Chaque animation a une raison
- Pas d’effet “wow” gratuit
- Accessibilité respectée
- Navigation prévisible
- Interface calme et crédible

---

## 📄 Mémoire Agent (IMPORTANT)

À CHAQUE PROMPT, l’IA DOIT :
- Mettre à jour ou créer un fichier `AGENT.md` (ou équivalent)
- Y consigner :
  - Décisions d’architecture
  - Choix UX/UI
  - Contraintes respectées
  - Éléments volontairement évités (vibe coding)

Le fichier sert de **mémoire projet persistante**.

---

## 🏁 Résultat attendu
Un portfolio :
- Non générique
- Data-driven
- Multilingue
- Structuré comme un produit
- Qui inspire confiance à un recruteur technique

> Impression finale :
> “Ce développeur pense comme un ingénieur, pas comme un template.”


