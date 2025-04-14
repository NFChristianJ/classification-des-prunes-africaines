# 📦 Données – Classification des Prunes Africaines

Ce dossier contient les données utilisées pour entraîner, valider et tester le modèle de classification des prunes africaines.

---

## 🗂️ Structure des données (après découpage)

Le jeu de données a été divisé comme suit :

- `train/` : 80% des données – Utilisées pour l'entraînement du modèle.
- `val/` : 10% des données – Utilisées pour la validation pendant l'entraînement.
- `test/` : 10% des données – Utilisées pour évaluer la performance finale.

Chaque sous-dossier contient des images réparties en dossiers correspondant aux différentes classes de qualité ou de défaut.

---

## 🔍 Description du jeu de données Kaggle

Le dataset original, téléchargeable sur Kaggle, contient :

- Un dossier `african_plums/` composé de **4 507 images**, réparties en **6 catégories** :
  - `Bruised` : 319 images
  - `Cracked` : 162 images
  - `Rotten` : 720 images
  - `Spotted` : 759 images
  - `Unaffected` : 1 721 images
  - `Unripe` : 826 images

- Un fichier `Organized_plums_data_.csv` fournissant des métadonnées sur les images (classe, nom de fichier, etc.)

- Un fichier `README.txt` contenant des informations complémentaires sur la collecte et la structure du dataset.

---

## 🔗 Source du dataset

Les données proviennent du dataset Kaggle suivant :

➡️ **[African Plums Quality and Defect Assessment Data](https://www.kaggle.com/datasets/arnaudfadja/african-plums-quality-and-defect-assessment-data)**  
Auteur : *Arnaud Fadja*

---

## 📥 Téléchargement et préparation

1. Téléchargez le jeu de données depuis Kaggle à l’adresse suivante :  
   👉 https://www.kaggle.com/datasets/arnaudfadja/african-plums-quality-and-defect-assessment-data

2. Effectuez le découpage en 80/10/10 (`train/`, `val/`, `test/`).

3. Placez les trois dossiers dans ce répertoire `ml/data/`.

---

## 📝 Remarque importante

> si vous souhaitez avoir le meme repartition des donnees que celle utilisé pour l'entrainement du modele, executer le script split.py en modifiant les chemins vers le dataset et le nouveau repertoire par ceux que vous utiliseriez dans votre stockage

> ⚠️ **Le jeu de données est trop volumineux pour être versionné avec Git**. Il est donc ignoré dans le fichier `.gitignore` et ne sera pas synchronisé avec GitHub.  
> Chaque membre de l’équipe devra le télécharger et l’intégrer manuellement.

---

## 📧 Contact

En cas de question sur le découpage ou la structure des données, contactez l'équipe ML ou ouvrez une issue sur le dépôt GitHub.
