from django.contrib import admin
from .models import Category, Subcategory, Page

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'url_title')

class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'url_title', 'category')

class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'url_title', 'subcategory')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Subcategory, SubcategoryAdmin)
admin.site.register(Page, PageAdmin)
