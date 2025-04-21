# Plum Classifier

## About This Project

This application was developed for the International AI Day Hackathon (JCIA Hackathon 2025) held in Cameroon from April 22-24, 2025. The hackathon's theme is "Artificial Intelligence and Economic Development: Innovating to Transform," focusing on innovative solutions to real-world problems.

The central project of this hackathon involves automatic sorting of plums into six categories (good quality, unripe, spotted, cracked, bruised, and rotten) using advanced computer vision and deep learning techniques. Participants are challenged to design an artificial intelligence model achieving the highest possible accuracy for plum image classification.

## Features

- Upload or capture images of plums
- Classify plums into six quality categories
- View detailed classification results with confidence scores
- Support for both English and French languages
- Responsive design for desktop and mobile devices

## Technologies Used

- React.js for the frontend interface
- Material UI for component design
- TensorFlow.js for running the classification model in the browser
- Docker for containerization and easy deployment

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

### Option 1: Standard Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/NFChristianJ/classification-des-prunes-africaines.git
   cd classification-des-prunes-africaines/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Option 2: Docker Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/NFChristianJ/classification-des-prunes-africaines.git
   cd classification-des-prunes-africaines/frontend
   ```

2. Build the Docker image:
   ```bash
   docker build -t plum-classifier .
   ```

3. Run the container:
   ```bash
   docker run -p 3000:80 plum-classifier
   ```

4. Open your browser and navigate to `http://localhost:3000`

<!-- ### Using Docker Compose

1. Start the application:
   ```bash
   docker-compose up
   ```

2. Open your browser and navigate to `http://localhost:3000` -->

## Usage Guide

1. Launch the application in your web browser
2. Click on "Take Photo" to use your device's camera or "Upload Image" to select an image file
3. Once an image is loaded, click on "Classify Plum"
4. View the classification results and detailed confidence scores for each category
5. Use the language toggle in the header or footer to switch between English and French

## Dataset

The model was trained using the African Plums Dataset available on Kaggle. This dataset consists of plum images categorized into six quality classes: good, unripe, spotted, cracked, bruised, and rotten.

## Project Structure

```
frontend/
├── public/                  # Public assets
├── src/                     # Source files
│   ├── store/               # Redux store
│   ├── api-endpoints/       # Api endpoints
│   ├── theme.js             # Theme configuration
│   ├── models/              # TensorFlow.js model files
│   ├── App.js               # Main application component
│   └── index.js             # Entry point
├── .dockerignore            # Docker ignore file
├── Dockerfile               # Docker configuration
└── README.md                # This file
```

### Environment Configuration

Create a `.env` file in the project root with the following variables:

```env
REACT_APP_API_URL=http://localhost:8081  # Default API URL for the backend
```


## Docker Configuration

### Dockerfile

```dockerfile
# Step 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build folder from the build stage to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which the app will run
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]

```

<!-- ### docker-compose.yml

```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:80"
    volumes:
      - ./src:/app/src
``` -->

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Live Demo

A live demo of the application is available at:  
[https://safou-check.campustech-solutions.com](https://safou-check.campustech-solutions.com)


## Acknowledgements

- International AI Day Hackathon (JCIA) 2025 organizers
- African Plums Dataset contributors on Kaggle
- Material UI team for the component library

---

# Classificateur de Prunes

## À Propos de ce Projet

Cette application a été développée pour le Hackathon de la Journée Internationale de l'Intelligence Artificielle (JCIA Hackathon 2025) organisée au Cameroun du 22 au 24 avril 2025. Le thème du hackathon est "Intelligence Artificielle et Développement Économique : Innover pour transformer", mettant l'accent sur des solutions innovantes aux problèmes réels.

Le projet central de ce hackathon repose sur le tri automatique des prunes en six catégories (de bonne qualité, non mûre, tachetée, fissurée, meurtrie et pourrie), à l'aide de techniques avancées de vision par ordinateur et d'apprentissage profond. Les participants devront concevoir un modèle d'intelligence artificielle atteignant la meilleure précision possible pour la classification des images des prunes.

## Fonctionnalités

- Téléchargement ou capture d'images de prunes
- Classification des prunes en six catégories de qualité
- Affichage des résultats détaillés de classification avec scores de confiance
- Support des langues anglaise et française
- Conception responsive pour ordinateurs et appareils mobiles

## Technologies Utilisées

- React.js pour l'interface frontend
- Material UI pour la conception des composants
- TensorFlow.js pour l'exécution du modèle de classification dans le navigateur
- Docker pour la conteneurisation et le déploiement facile

## Installation et Configuration

### Prérequis

- [Node.js](https://nodejs.org/) (v16 ou plus récent)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (optionnel, pour le déploiement conteneurisé)

### Option 1: Configuration Standard

1. Clonez le dépôt:
   ```bash
   git clone https://github.com/votrenomdutilisateur/classificateur-prunes.git
   cd classificateur-prunes
   ```

2. Installez les dépendances:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Démarrez le serveur de développement:
   ```bash
   npm start
   # ou
   yarn start
   ```

4. Ouvrez votre navigateur et accédez à `http://localhost:3000`

### Option 2: Configuration Docker

1. Clonez le dépôt:
   ```bash
   git clone https://github.com/votrenomdutilisateur/classificateur-prunes.git
   cd classificateur-prunes/frontend
   ```

2. Construisez l'image Docker:
   ```bash
   docker build -t classificateur-prunes .
   ```

3. Exécutez le conteneur:
   ```bash
   docker run -p 3000:80 classificateur-prunes
   ```

4. Ouvrez votre navigateur et accédez à `http://localhost:3000`

<!-- ### Utilisation de Docker Compose

1. Démarrez l'application:
   ```bash
   docker-compose up
   ```

2. Ouvrez votre navigateur et accédez à `http://localhost:3000` -->

## Guide d'Utilisation

1. Lancez l'application dans votre navigateur web
2. Cliquez sur "Prendre Photo" pour utiliser la caméra de votre appareil ou "Télécharger Image" pour sélectionner un fichier image
3. Une fois l'image chargée, cliquez sur "Classifier la Prune"
4. Consultez les résultats de classification et les scores de confiance détaillés pour chaque catégorie
5. Utilisez le sélecteur de langue dans l'en-tête ou le pied de page pour basculer entre l'anglais et le français

## Ensemble de Données

Le modèle a été entraîné en utilisant l'ensemble de données African Plums Dataset disponible sur Kaggle. Cet ensemble de données se compose d'images de prunes catégorisées en six classes de qualité: bonne qualité, non mûre, tachetée, fissurée, meurtrie et pourrie.

## Structure du Projet

```
frontend/
├── public/                  # Public assets
├── src/                     # Source files
│   ├── store/               # Redux store
│   ├── api-endpoints/       # Api endpoints
│   ├── theme.js             # Theme configuration
│   ├── models/              # TensorFlow.js model files
│   ├── App.js               # Main application component
│   └── index.js             # Entry point
├── .dockerignore            # Docker ignore file
├── Dockerfile               # Docker configuration
└── README.md                # This file
```

### Configuration des variables d'environements

Créer le fichier  `.env` à la racine du projet avec les variables suivantes :

```env
REACT_APP_API_URL=http://localhost:8081  # API URL par défaut pour le backend
```

## Configuration Docker

### Dockerfile

```dockerfile
# Step 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build folder from the build stage to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which the app will run
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]

```

<!-- ### docker-compose.yml

```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:80"
    volumes:
      - ./src:/app/src
``` -->

## Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## Live Demo

Une démo de l'application est disponible à :  
[https://safou-check.campustech-solutions.com](https://safou-check.campustech-solutions.com)

## Remerciements

- Organisateurs du Hackathon de la Journée Internationale de l'Intelligence Artificielle (JCIA) 2025
- Contributeurs à l'ensemble de données African Plums Dataset sur Kaggle
- L'équipe Material UI pour la bibliothèque de composants