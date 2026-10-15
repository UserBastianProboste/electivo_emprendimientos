# Module: StoreConfigUrls
# Description: URL routing configuration for store configuration endpoint
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial routing for store-config endpoint.

from django.urls import path
from apps.store_config.infrastructure.views import StoreConfigAPIView

urlpatterns = [
    path('store-config/', StoreConfigAPIView.as_view(), name='store-config'),
]
