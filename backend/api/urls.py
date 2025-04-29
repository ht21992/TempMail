from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TempEmailViewSet

router = DefaultRouter()
router.register(r"temp-emails", TempEmailViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
