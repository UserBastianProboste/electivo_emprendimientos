# Module: StoreConfigColorModeMigration
# Description: Migration adding color_mode field to StoreConfigModel
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Add color_mode and refine defaults.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store_config', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='storeconfigmodel',
            name='color_mode',
            field=models.CharField(choices=[('light', 'Light Mode'), ('dark', 'Dark Mode')], default='light', max_length=10),
        ),
        migrations.AlterField(
            model_name='storeconfigmodel',
            name='hero_cta_text',
            field=models.CharField(default='Explorar Catálogo', max_length=100),
        ),
        migrations.AlterField(
            model_name='storeconfigmodel',
            name='hero_subtitle',
            field=models.TextField(default='Descubre una cuidada selección de productos creados con dedicación, sostenibilidad y excelencia.'),
        ),
        migrations.AlterField(
            model_name='storeconfigmodel',
            name='hero_title',
            field=models.CharField(default='Diseño, Calidad y Autenticidad en Cada Detalle', max_length=255),
        ),
        migrations.AlterField(
            model_name='storeconfigmodel',
            name='store_name',
            field=models.CharField(default='Tienda & Estudio', max_length=255),
        ),
    ]
