from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^pages/(?P<name>[a-zA-Z0-9]+)/$', views.page, name='page'),
]