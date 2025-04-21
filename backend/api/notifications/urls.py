from notifications.api_views import ImageClassifierAPIView
from django.urls import path ,include

app_name = "notifications"

urlpatterns = [
    path('api/classify/', ImageClassifierAPIView.as_view(), name='api_classify'),
]


