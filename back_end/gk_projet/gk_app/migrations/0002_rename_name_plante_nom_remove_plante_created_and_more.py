# Generated by Django 5.0.3 on 2024-03-22 14:22

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gk_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='plante',
            old_name='name',
            new_name='nom',
        ),
        migrations.RemoveField(
            model_name='plante',
            name='created',
        ),
        migrations.AddField(
            model_name='plante',
            name='nom_scientifique',
            field=models.CharField(default=django.utils.timezone.now, max_length=200),
            preserve_default=False,
        ),
    ]
