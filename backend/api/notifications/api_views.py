from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from notifications.serializers import ImageClassifierSerializer, ClassificationResultSerializer
from PIL import Image
import requests
from io import BytesIO
import torch
from torchvision import transforms
import torch.nn as nn
import timm
import os


from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent



model_path = f"{BASE_DIR}/models/efficientnet_b0_best.pth"
num_classes = 6

# Create model
model = timm.create_model('efficientnet_b0', pretrained=False)

# Adapt classifier based on model architecture
if hasattr(model, 'classifier'):
    model.classifier = nn.Linear(model.classifier.in_features, num_classes)
elif hasattr(model, 'fc'):
    model.fc = nn.Linear(model.fc.in_features, num_classes)
else:
    model.head = nn.Linear(model.head.in_features, num_classes)
    
# Load weights
model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
model.eval()
mean = torch.tensor([0.6185, 0.5113, 0.5015])
std = torch.tensor([0.1693, 0.1890, 0.1853])
class_names = ['bruised', 'cracked', 'rotten', 'spotted', 'unaffected', 'unripe']
transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=mean, std=std),
    ])
print("Model loaded successfully!")




class ImageClassifierAPIView(APIView):
    """
    API view for classifying images of plums.
    Accepts either an image file or a URL to an image.
    """

    
    def post(self, request):
        # Validate the request data
        serializer = ImageClassifierSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Get the image from file or URL
        try:
            if 'image' in serializer.validated_data:
                # Process uploaded image file
                image = Image.open(serializer.validated_data['image']).convert('RGB')
            else:
                # Process image from URL
                image_url = serializer.validated_data['image_url']
                response = requests.get(image_url)
                if response.status_code != 200:
                    return Response(
                        {"error": f"Failed to fetch image from URL: HTTP {response.status_code}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                image = Image.open(BytesIO(response.content)).convert('RGB')
            
            # Make prediction
            prediction_results = self.predict_image(image)
            
            # Serialize and return results
            result_serializer = ClassificationResultSerializer(prediction_results)
            return Response(result_serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def predict_image(self, image, threshold=0.6):
        """Process image and return predictions"""
        # Get model and transform from the app config
        
        if model is None:
            raise ValueError("Model not loaded. Please check server logs.")
        if transform is None:
            raise ValueError("Transform not initialized. Please check server logs.")
    
        # Transform image for model
        image_tensor = transform(image).unsqueeze(0)
        
        # Make prediction
        with torch.no_grad():
            outputs = model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
        
        # Get top probabilities and classes
        prob_values, pred_classes = torch.topk(probabilities, k=len(probabilities[0]), dim=1)
        prob_values = prob_values.squeeze().cpu().numpy()
        pred_classes = pred_classes.squeeze().cpu().numpy()
        
        # Format results
        results = {
            'top_class': class_names[pred_classes[0]] if prob_values[0] >= threshold else 'unknown',
            'top_probability': float(prob_values[0]),
            'all_probabilities': [
                {'class': class_names[pred_classes[i]], 'probability': float(prob_values[i])}
                for i in range(len(prob_values))
            ],
            'is_plum': prob_values[0] >= threshold
        }
        
        return results