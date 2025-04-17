# CustomPlumDataset

Le dataset personnalisé est conçu pour intégrer des transformations standards et une augmentation ciblée sur les classes sous-représentées.

## Structure attendue
```
dataset/
├── train/
│   ├── bruised/
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│   ├── cracked/
│   │   ├── image1.jpg
│   │   └── ...
│   ├── rotten/
│   │   └── ...
│   ├── spotted/
│   │   └── ...
│   ├── unaffected/
│   │   └── ...
│   └── unripe/
│       └── ...
├── val/
│   ├── bruised/
│   │   └── ...
│   ├── cracked/
│   │   └── ...
│   ├── rotten/
│   │   └── ...
│   ├── spotted/
│   │   └── ...
│   ├── unaffected/
│   │   └── ...
│   └── unripe/
│       └── ...
```

## Utilisation

```python
from custom_dataset import CustomPlumDataset

dataset = CustomPlumDataset(
    root_dir="dataset/train",
    transform=standard_transform,
    augment_classes=["spotted", "unripe"]
)
