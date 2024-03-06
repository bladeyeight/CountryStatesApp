from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=2, unique=True, default='US')

    class Meta:
        verbose_name_plural='Countries'

    def __str__(self):
        return self.name

class State(models.Model):
    countryId = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='states')
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=4, unique=False, default='VA')

    def __str__(self):
        return self.name

