# Dossier traetment

Ce dossier contient tous prétraitement que nous avons applique a nos données dans le cadre de la préparation des données pour l'entraînement du modèle de classification des prunes africaines. Deux types de transformations ont été appliquées à l’aide de la bibliothèque `torchvision.transforms` :

#### ✅ **Transformations standards (`standard_transform`)**
Appliquées à l'ensemble des données afin d’uniformiser les entrées et améliorer la robustesse du modèle :
```python
transforms.Compose([
    transforms.Resize((224, 224)),                      # Redimensionne toutes les images à une taille uniforme
    transforms.RandomHorizontalFlip(),                 # Effectue un retournement horizontal aléatoire
    transforms.ToTensor(),                             # Convertit l’image PIL en tenseur PyTorch
    transforms.Normalize(mean=mean, std=std)           # Normalise avec la moyenne et l'écart-type du dataset
])
```

#### 🔁 **Transformations augmentées (`augmented_transform`)**
Appliquées spécifiquement aux classes minoritaires pour enrichir leur diversité et équilibrer le dataset :
```python
transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),                     # Rotation aléatoire de ±15°
    transforms.ColorJitter(brightness=0.2, 
                           contrast=0.2, 
                           saturation=0.2),            # Variations aléatoires de couleur
    transforms.RandomAffine(degrees=0, 
                            translate=(0.1, 0.1)),     # Légers déplacements horizontaux et verticaux
    transforms.ToTensor(),
    transforms.Normalize(mean=mean, std=std)
])
```

> Ces transformations visent à **réduire le sur-apprentissage**, à **améliorer la généralisation** du modèle, et à **équilibrer la distribution des classes**, surtout dans le cas des classes sous-représentées.