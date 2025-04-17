# Dossier models

Ce dossier contient les poids de notre model final EfficientNet_B0.

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