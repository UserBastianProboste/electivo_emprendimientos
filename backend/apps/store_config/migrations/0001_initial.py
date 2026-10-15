# Module: StoreConfigInitialMigration
# Description: Initial migration creating StoreConfigModel in PostgreSQL
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial migration.

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StoreConfigModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('store_name', models.CharField(default='Mi Emprendimiento Comunitario', max_length=255)),
                ('hero_title', models.CharField(default='Impulsa tu Negocio Local con Nuestra Vitrina Digital', max_length=255)),
                ('hero_subtitle', models.TextField(default='Descubre productos artesanales, sostenibles y de alta calidad elaborados por emprendedores de nuestra comunidad.')),
                ('hero_cta_text', models.CharField(default='Explorar Catalogo', max_length=100)),
                ('theme_id', models.IntegerField(default=1)),
                ('logo_url', models.TextField(blank=True, default='')),
                ('favicon_url', models.TextField(blank=True, default='')),
                ('catalog_layout', models.CharField(choices=[('grid-3', 'Grid 3 Columns'), ('grid-4', 'Grid 4 Columns'), ('list', 'List View')], default='grid-3', max_length=20)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Configuracion de Tienda',
                'verbose_name_plural': 'Configuraciones de Tienda',
                'db_table': 'store_configuration',
            },
        ),
    ]
