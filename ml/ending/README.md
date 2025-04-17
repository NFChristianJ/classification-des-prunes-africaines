**📁 Dossier ending/ – Prédiction d’images de prunes**

Ce dossier contient un script Python (prediction.py) permettant de charger un modèle EfficientNet-B0 entraîné pour classifier des images de prunes africaines selon leur état de qualité ou de défaut.

**Classes prédictibles**
Le modèle est entraîné pour reconnaître les 6 classes suivantes :

bruised

cracked

rotten

spotted

unaffected

unripe

**Fonctionnalités du script**
Chargement d’un modèle EfficientNet-B0 entraîné (.pth).

Prétraitement de l’image (redimensionnement, normalisation avec les moyennes/écarts-types utilisés pendant l’entraînement).

Prédiction avec affichage des probabilités associées à chaque classe.

Vérification qu’il s’agit bien d’une image de prune à l’aide d’un seuil de confiance (threshold=0.6).

▶**Utilisation**
Placer le modèle entraîné (ex: efficientnet_b0_best.pth) dans un dossier accessible.

Lancer le script depuis le terminal :

python prediction.py
Entrer le chemin de l'image lorsqu’il est demandé (format JPG ou PNG recommandé).

Exemple
Entrez le chemin de l'image à prédire : C:\Users\Christian\Desktop\image_test.jpg
L'image appartient à la classe rotten avec une probabilité de 0.8912
Probabilités des classes :
Classe: rotten, Probabilité: 0.8912
Classe: bruised, Probabilité: 0.0457
Classe: spotted, Probabilité: 0.0303
...
📌 Remarques
Si la prédiction la plus probable est inférieure au seuil fixé (threshold=0.75), le modèle signale que l’image ne semble pas représenter une prune.

Le modèle fonctionne uniquement avec des images RGB (format couleur).