import torch
from torchvision import transforms
from PIL import Image
import torch.nn as nn
import timm

# Définitions des moyennes et écarts-types obtenu lors de l'entrainement et des classes de données
mean = torch.tensor([0.6185, 0.5113, 0.5015])
std = torch.tensor([0.1693, 0.1890, 0.1853])
class_names = ['bruised', 'cracked', 'rotten', 'spotted', 'unaffected', 'unripe']

# Preparation des image pour le test
def load_and_transform_image(image_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=mean, std=std),
    ])

    image = Image.open(image_path).convert('RGB')  
    return transform(image).unsqueeze(0)  

# Fonction pour la prédiction
def predict_image(image_path, model, threshold=0.75):
    image_tensor = load_and_transform_image(image_path)
    model.eval()  

    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
    
    # Ici on va récupérer les probabilités et les classes associés
    prob_values, pred_classes = torch.topk(probabilities, k=len(probabilities[0]), dim=1)
    prob_values = prob_values.squeeze().cpu().numpy()
    pred_classes = pred_classes.squeeze().cpu().numpy()

    # Afficher les probabilités triées par ordre croissant avec les classes correspondantes en verifiant que l'image est effectivement celle d'une "prune" grace aux stats inferentiells
    if prob_values[0] < threshold:  # Si la probabilité la plus élevée est inférieure au seuil
        print("Catégorie inconnue: l'image ne semble pas être une prune.")
    else:
        predicted_class_name = class_names[pred_classes[0]]  # cette ligne reccupere le nom de la classe prédite
        print(f"L'image appartient à la classe {predicted_class_name} avec une probabilité de {prob_values[0]:.4f}")
        print("Probabilités des classes :")
        for i in range(len(prob_values)):
            class_name = class_names[pred_classes[i]]  # on va remplacer l'indice par le nom de la classe
            print(f"Classe: {class_name}, Probabilité: {prob_values[i]:.4f}")

# Chargement du modèle
def load_model(model_path, num_classes):
    model = timm.create_model('efficientnet_b0', pretrained=False)
    # Adaptation du classifier
    if hasattr(model, 'classifier'):
        model.classifier = nn.Linear(model.classifier.in_features, num_classes)
    elif hasattr(model, 'fc'):
        model.fc = nn.Linear(model.fc.in_features, num_classes)
    else:
        model.head = nn.Linear(model.head.in_features, num_classes)

    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
    return model

# Appel de la prediction
if __name__ == "__main__":

    # Chemin vers le modèle sauvegardé et l'image à prédire
    model_path = r"C:\Users\Christian\Desktop\ClassificationPrunesAfricaines\ml\efficientnet_b0_best.pth"

    # Chemin vers l'image
    image_path = input("Entrez le chemin de l'image à prédire : ")

    # Nombre de classe
    num_classes = 6

    # Chargement du model
    model = load_model(model_path, num_classes)

    # Appel de la fonction de prédiction
    predict_image(image_path, model, threshold=0.75)
