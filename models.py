from django.db import models
import mathvisualized.choices as choices

class Page(models.Model):
    subcategory = models.ForeignKey(
        'Subcategory', 
        on_delete=models.SET_DEFAULT, 
        default=1,
    )

    js_lib = models.CharField(
        max_length=1, 
        choices=choices.LIBRARY_CHOICES,
        default=choices.CANVAS
    )

    title = models.CharField(max_length=256, default='')
    url_title = models.CharField(max_length=256, default='')
    text = models.CharField(max_length=256, default='')

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=256, default='')

    def __str__(self):
        return self.name

class Subcategory(models.Model):
    category = models.ForeignKey(
        'Category',
        on_delete=models.SET_DEFAULT,
        default=1
    )
    name = models.CharField(max_length=256, default='')

    def __str__(self):
        return self.name
