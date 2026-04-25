from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('contact/', include('contact.urls')),
    # Serve the index.html from the root
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
]
