# Generated by Django 5.0.3 on 2024-05-17 01:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gk_app', '0021_alter_plante_ensoleillement'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plante',
            name='ensoleillement',
            field=models.JSONField(default={}, max_length=200),
        ),
    ]
