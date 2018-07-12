from django.shortcuts import render
import mathvisualized.choices as choices
from .models import Category, Subcategory, Page

def home(request):
    lists = get_lists()
    context = {
        'sidebar_lists': lists
    }
    return render(request, 'index.html', context)

def page(request, name):
    lists = get_lists()
    page = Page.objects.get(url_title=name)
    page_content_url = 'page_content/' + page.url_title + '.html'
    js_url = 'mathvisualized/js/entry_point_bundles/' + page.url_title + '.js'
    context= {
        'page': page,
        'page_content_url': page_content_url,
        'js_url': js_url,
        'sidebar_lists': lists,
        'choices': choices,
    }
    return render(request, 'page.html', context)

def get_lists():
    return {
        'category_list': Category.objects.all(),
        'subcategory_list': Subcategory.objects.all(),
        'page_list': Page.objects.all()
    }
