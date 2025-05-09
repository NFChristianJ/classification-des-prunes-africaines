# Classification des Prunes Africaines

## Description
Ce projet vise à développer un modèle de classification supervisée pour identifier des classes de prunes africaines à partir d'images. Le modèle sera intégré dans une application web et mobile 

## Objectifs
- Créer un modèle capable de classer les prunes africaines selon leur espèce.
- Développer une application web pour intégrer le modèle de classification.
- Emballer ce modèle dans une application mobile si le temps le permet.

## Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/NFChristianJ/classification-des-prunes-africaines.git
   cd classification-des-prunes-africaines
   ```

2. Créez un environnement virtuel et installez les dépendances Python :
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/MacOS
   venv\Scripts\activate     # Windows
   pip install -r backend/requirements.txt
   ```

3. Assurez-vous d’avoir toutes les dépendances nécessaires pour le frontend et mobile en suivant les instructions dans les répertoires `frontend` et `mobile`.

## Structure du projet
Voici la structure générale du projet :
```
classification-des-prunes-africaines/
├── .gitignore
├── README.md
├── LICENSE
├── .env.example                 # Variables d’environnement à copier
├── backend/                    # Backend API (FastAPI, Django, etc.)
│   ├── app/                    # Code principal
│   ├── model_loader/           # Intégration du modèle ML pour inference
│   ├── tests/                  # Tests backend (Pytest / Unittest)
│   ├── requirements.txt
│   └── config/                 # Paramètres et variables de configuration backend
├── frontend/                   # App Web (React, Vue, etc.)
│   ├── public/
│   ├── src/
│   ├── tests/                  # Tests front (Jest / Vitest / Cypress)
│   └── package.json
├── mobile/                     # App Mobile (React Native / Flutter)
│   ├── android/
│   ├── ios/
│   ├── lib/
│   └── tests/                  # Tests mobile
├── ml/                         # Code Data Science
│   ├── data/                   # Chargement, nettoyage, augmentation
│   ├── training/               # Scripts d’entraînement
│   ├── tuning/                 # Ajustements et fine-tuning
│   ├── evaluation/             # Scripts d’évaluation (métriques, courbes)
│   ├── experiments/            # Notebooks ou scripts exploratoires
│   ├── tests/                  # Tests unitaires pour fonctions ML
│   ├── models/                 # Modèles entraînés (.pth, .joblib, etc.)
│   ├── config/                 # Paramètres d’expérience YAML/JSON
│   └── requirements.txt
├── tests/                      # Dossier central de tests automatisés
│   ├── integration/            # Tests entre modules (ex : ml + backend)
│   └── end_to_end/             # Cas d’utilisation complets simulés
├── docs/                       # Documentation technique
│   └── architecture.md
├── scripts/                    # Scripts d’init, migration, chargement, etc.
├── docker/                     # Dockerfiles et configs Docker Compose
│   ├── backend.dockerfile
│   ├── frontend.dockerfile
│   └── ml.dockerfile
└── .github/
    ├── workflows/              # GitHub Actions CI/CD
    └── ISSUE_TEMPLATE/
```
## Contribuer
1. Fork ce repository.
2. Crée une nouvelle branche (`git checkout -b feature-nouvelle-fonctionnalité`).
3. Ajoute tes modifications.
4. Commit (`git commit -m "Ajout d'une nouvelle fonctionnalité"`).
5. Push (`git push origin feature-nouvelle-fonctionnalité`).
6. Crée une Pull Request.

## Auteurs
- NFChristianJ (Chef de projet)
- Ndjana Clement 
- SCMC24
- Desiré Voukeng
- Bibiane Danielle Nguemtchueng Tsemo

## Licence
Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

