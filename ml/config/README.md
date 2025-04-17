# 📁 Dossier `config`

Ce dossier contient les fichiers de configuration utilisés tout au long du projet **Classification des Prunes Africaines**.  
L'objectif est de centraliser tous les paramètres et chemins utiles afin d'assurer une meilleure organisation, reproductibilité et flexibilité du pipeline de machine learning.

## 📌 Contenu attendu

Les fichiers de ce dossier peuvent inclure :

- `config.yaml` ou `params.json` : Fichier principal contenant les hyperparamètres, les chemins vers les datasets, les options de modèle, etc.
- `logging.yaml` : Configuration des logs pour suivre les étapes de l'entraînement et de l'évaluation.
- `paths.yaml` : Chemins relatifs ou absolus vers les données, modèles enregistrés, résultats, etc.

## 📂 Exemple de structure d’un fichier `config.yaml`

```yaml
data:
  train_dir: ./data/train
  val_dir: ./data/val
  test_dir: ./data/test

model:
  architecture: efficientnet_b0
  pretrained: true
  num_classes: 6

training:
  batch_size: 32
  num_epochs: 10
  learning_rate: 3e-4
  optimizer: adam
  scheduler: step_lr
  seed: 42

logging:
  level: INFO
  save_dir: ./experiments/logs
