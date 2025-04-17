# Dossier models

Ce dossier contient les poids de notre model final `EfficientNet_B0`, et egalement le notebook `classification_de_prunes` qui contient  l'ensemble du code utilisé pour l'entraînement, l'évaluation et la comparaison des modèles CNN. Il inclut également la visualisation des résultats (Rapport de classification , images prédictives, courbes).

Pour charger l'architecture du modele, utilisez la bibliotheque timm pour la reconstruire de la maniere suivante

def build_model(model_name, num_classes=6):
    model = timm.create_model("efficientnet_b0" pretrained=False) 

    if hasattr(model, 'classifier'):
        model.classifier = nn.Linear(model.classifier.in_features, num_classes)
    elif hasattr(model, 'fc'):
        model.fc = nn.Linear(model.fc.in_features, num_classes)
    else:
        model.head = nn.Linear(model.head.in_features, num_classes)

    return model
