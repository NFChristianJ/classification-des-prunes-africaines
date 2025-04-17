# Plum Defect Classification

Ce projet de vision par ordinateur vise à détecter et classifier automatiquement les défauts des prunes sur des images. Il utilise EfficientNet-B0 entraîné avec PyTorch pour six classes :  
- **bruised**
- **cracked**
- **rotten**
- **spotted**
- **unaffected**
- **unripe**

## 📂 Structure du projet

- `data/` : Dataset des prunes avec labels
- `custom_dataset.py` : Classe `CustomPlumDataset`
- `model_training.py` : Script d'entraînement
- `results/` : Résultats, rapports, images
- `best_params.json` : Hyperparamètres optimaux
- `tuning_log.txt` : Journal du tuning d'hyperparamètres

## 🚀 Résultats

- **Accuracy globale** : 90.04 %
- **Macro avg F1-score** : 0.91

## 📦 Dépendances

- Python 3.9+
- PyTorch
- torchvision
- timm
- scikit-learn
- matplotlib
