# Module: StoreConfigModel
# Description: Django ORM model representing store customization in PostgreSQL
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial ORM model implementation.

from django.db import models


class StoreConfigModel(models.Model):
    """PostgreSQL relational model storing SaaS store settings."""

    LAYOUT_CHOICES = [
        ('grid-3', 'Grid 3 Columns'),
        ('grid-4', 'Grid 4 Columns'),
        ('list', 'List View'),
    ]

    store_name = models.CharField(
        max_length=255,
        default='Tienda & Estudio'
    )
    hero_title = models.CharField(
        max_length=255,
        default='Diseño, Calidad y Autenticidad en Cada Detalle'
    )
    hero_subtitle = models.TextField(
        default='Descubre una cuidada selección de productos creados con dedicación, sostenibilidad y excelencia.'
    )
    hero_cta_text = models.CharField(
        max_length=100,
        default='Explorar Catálogo'
    )
    theme_id = models.IntegerField(default=1)
    logo_url = models.TextField(blank=True, default='')
    favicon_url = models.TextField(blank=True, default='')
    catalog_layout = models.CharField(
        max_length=20,
        choices=LAYOUT_CHOICES,
        default='grid-3'
    )
    color_mode = models.CharField(
        max_length=10,
        default='light',
        choices=[('light', 'Light Mode'), ('dark', 'Dark Mode')]
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'store_configuration'
        verbose_name = 'Configuracion de Tienda'
        verbose_name_plural = 'Configuraciones de Tienda'

    def __str__(self) -> str:
        return f"StoreConfig({self.store_name}, Theme={self.theme_id}, Layout={self.catalog_layout})"
