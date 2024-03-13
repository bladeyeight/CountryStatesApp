from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CountryViewSet, StateViewSet, StateListView, LoginView, RegisterView

router = DefaultRouter()
router.register(r'countries', CountryViewSet)
router.register(r'states', StateViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('countries/<str:country_code>/states/', StateListView.as_view(), name='country-states'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/register/', RegisterView.as_view(), name='register'),
]

