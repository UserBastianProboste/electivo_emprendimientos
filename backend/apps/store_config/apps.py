# Module: StoreConfigAppConfig
# Description: Django app configuration for store customization and settings
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial app config setup.

from django.apps import AppConfig


class StoreConfigAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.store_config'
    verbose_name = 'Configuracion de Tienda'
