from rest_framework import serializers


class ImageClassifierSerializer(serializers.Serializer):
    """Serializer for image classification requests."""
    image = serializers.ImageField(required=False)
    image_url = serializers.URLField(required=False)

    def validate(self, data):
        """
        Check that either an image or an image URL is provided.
        """
        if 'image' not in data and 'image_url' not in data:
            raise serializers.ValidationError("Either an image file or image URL must be provided")
        return data


class ClassificationResultSerializer(serializers.Serializer):
    """Serializer for classification results."""
    top_class = serializers.CharField()
    top_probability = serializers.FloatField()
    is_plum = serializers.BooleanField()
    all_probabilities = serializers.ListField(
        child=serializers.DictField()
    )

