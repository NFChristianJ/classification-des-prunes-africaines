# Dossier training

## Objectif
Ce document décrit le processus d'entraînement du modèle de classification EfficientNet-B0 pour la reconnaissance des prunes.

## Environnement
- **Framework** : PyTorch
- **Modèle** : efficientnet_b0 via la librairie TIMM
- **GPU** : P100 (Kaggle)

## Paramètres d’entraînement
- **Taille batch** : 32
- **Epochs** : 10
- **Optimiseur** : Adam
- **Learning rate** : 0.0003
- **Scheduler** : CosineAnnealingLR
- **Perte** : CrossEntropyLoss

## Boucle d'entraînement
1. Chargement du dataset via `CustomPlumDataset`
2. Entraînement pendant 25 epochs avec suivi de la validation
3. Sauvegarde du meilleur modèle (selon la F1-macro)

## Exemple de code
```python
for epoch in range(num_epochs):
    model.train()
    for images, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(images.to(device))
        loss = criterion(outputs, labels.to(device))
        loss.backward()
        optimizer.step()
    scheduler.step()

    # évaluation sur val_loader et sauvegarde du meilleur modèle
```

## Sauvegarde
Le modèle le plus performant a été sauvegardé sous :
```bash
models/efficientnetb0_best.pth
```

## Référence
- `timm.create_model('efficientnet_b0', pretrained=True)`


