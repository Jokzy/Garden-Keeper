# Generated by Django 5.0.3 on 2024-05-13 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gk_app', '0016_alter_plante_dans_jardin_alter_plante_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plante',
            name='image_personnelle',
            field=models.CharField(default='', max_length=200),
        ),
    ]
