# Module: CatalogUrls
# Description: URL routing configuration for product catalog and dynamic filters
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial routing for catalog and filter endpoints.

from django.urls import path
from apps.catalog.infrastructure.views import (
    CatalogProductsView,
    CatalogFiltersView,
)

urlpatterns = [
    path('catalog/products/', CatalogProductsView.as_view(), name='catalog-products'),
    path('catalog/filters/', CatalogFiltersView.as_view(), name='catalog-filters'),
]
