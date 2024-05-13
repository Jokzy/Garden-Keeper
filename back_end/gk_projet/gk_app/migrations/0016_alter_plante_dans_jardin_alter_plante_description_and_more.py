# Generated by Django 5.0.3 on 2024-05-13 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gk_app', '0015_alter_plante_image_personnelle'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plante',
            name='dans_jardin',
            field=models.BooleanField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='plante',
            name='description',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='plante',
            name='ensoleillement',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='plante',
            name='frequence_arrosage',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='plante',
            name='image_API',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='plante',
            name='image_personnelle',
            field=models.URLField(default=''),
        ),
        migrations.AlterField(
            model_name='plante',
            name='nom_personnel',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='plante',
            name='nom_scientifique',
            field=models.CharField(default='', max_length=200),
        ),
    ]
