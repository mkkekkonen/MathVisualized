from django.shortcuts import render
from .models import Category, Subcategory, Page

def home(request):
    category_list = Category.objects.all()
    subcategory_list = Subcategory.objects.all()
    page_list = Page.objects.all()
    context = {
        'category_list': category_list,
        'subcategory_list': subcategory_list,
        'page_list': page_list
    }
    return render(request, 'index.html', context)
