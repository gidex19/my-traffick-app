
from django.urls import path,include
from . import views as traffickviews

urlpatterns = [
    path('', traffickviews.home, name = 'home'),
    path('start/', traffickviews.start, name = 'start'),
    path('parameters/', traffickviews.parameters, name = 'parameters'),
    path('parameters2/', traffickviews.parameters2, name = 'parameters2'),
]