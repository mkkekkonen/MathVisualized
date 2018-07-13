from django.shortcuts import render
import mathvisualized.choices as choices
from .models import Category, Subcategory, Page
from os.path import join

def home(request):
    lists = get_lists()
    context = {
        'sidebar_lists': lists
    }
    return render(request, 'index.html', context)

def page(request, name):
    lists = get_lists()
    page = Page.objects.get(url_title=name)
    page_subcategory = page.subcategory
    page_category = page_subcategory.category
    # page_content_url = 'page_content/' + page.url_title + '.html'
    page_content_url = join(
        'page_content',
        page_category.url_title,
        page_subcategory.url_title,
        page.url_title + '.html',
    )
    # js_url = 'mathvisualized/js/entry_point_bundles/' + page.url_title + '.js'
    js_url = join(
        'js/entry_point_bundles',
        page_category.url_title,
        page_subcategory.url_title,
        page.url_title + '.js',
    )
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
