import os
import shutil
import pandas as pd

# Chargement du fichier CSV 
csv_path = "filename.csv"
df = pd.read_csv(csv_path, sep=";")

# Répertoire source où se trouvent les images classées non decoupés
source_root = r"D:\african_plums_dataset\african_plums"

# Répertoire destination pour le découpage
destination_root = r"D:\african_plums_dataset\african_plums_splits"

# Liste des splits et des classes
splits = ['train', 'test', 'val']
classes = ['bruised', 'cracked', 'rotten', 'spotted', 'unaffected', 'unripe']

# Création des dossiers train/test/val et des sous-dossiers de classes
for split in splits:
    for class_name in classes:
        dest_dir = os.path.join(destination_root, split, class_name)
        os.makedirs(dest_dir, exist_ok=True)

# Parcours du DataFrame pour copier les fichiers
for _, row in df.iterrows():
    filename = row['filename']
    class_name = row['class']
    split = row['repository']
    
    source_path = os.path.join(source_root, class_name, filename)
    dest_path = os.path.join(destination_root, split, class_name, filename)

    if os.path.exists(source_path):
        shutil.copy2(source_path, dest_path)
    else:
        print(f"[!] Fichier introuvable : {source_path}")
