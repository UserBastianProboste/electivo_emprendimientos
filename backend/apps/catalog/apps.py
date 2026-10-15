# Module: CatalogAppConfig
# Description: Django app configuration for polymorphic catalog
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial app config setup.

from django.apps import AppConfig


class CatalogAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.catalog'
    verbose_name = 'Catálogo Flexible'
