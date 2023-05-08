from django.urls import path
from . import views

urlpatterns = [
    path('', views.hello_world, name='hello_world'),
    path('user/', views.user_info, name='user_info'),
    path('encrypt/', views.encrypt, name='encrypt'),
    path('decrypt/', views.decrypt, name='decrypt'),
]

# input: "hello world" - "s6v9y$B?E(H+MbQe"
# output: "NiEB/xX972BFTNRMC+BKag=="
# output: "hello world"
