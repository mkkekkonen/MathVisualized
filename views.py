from django.shortcuts import render
from .models import Category, Subcategory, Page

def home(request):
    lists = get_lists()
    context = {
        'sidebar_lists': lists
    }
    return render(request, 'index.html', context)

def get_lists():
    return {
        'category_list': Category.objects.all(),
        'subcategory_list': Subcategory.objects.all(),
        'page_list': Page.objects.all()
    }
