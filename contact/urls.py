from django.urls import path
from .views import contact_view

urlpatterns = [
    path('send/', contact_view, name='contact_send'),
]
