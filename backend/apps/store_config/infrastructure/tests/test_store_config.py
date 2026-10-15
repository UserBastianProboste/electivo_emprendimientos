# Module: TestStoreConfig
# Description: Unit and integration tests for store configuration domain and API
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial test coverage for store config entity, use cases, and API views.

import pytest
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from apps.store_config.domain.entities import StoreConfig
from apps.store_config.domain.value_objects import ThemeId, CatalogLayout
from apps.store_config.domain.exceptions import (
    InvalidThemeException,
    InvalidCatalogLayoutException,
)
from apps.store_config.application.use_cases import (
    GetStoreConfigUseCase,
    UpdateStoreConfigUseCase,
)
from apps.store_config.application.dtos import UpdateStoreConfigDTO
from apps.store_config.infrastructure.repositories import DjangoORMStoreConfigRepository
from apps.store_config.infrastructure.models import StoreConfigModel


class StoreConfigDomainTests(TestCase):
    """Domain layer unit tests verifying business rules and value objects."""

    def test_theme_id_valid_values(self) -> None:
        for val in (1, 2, 3, 4):
            theme = ThemeId(val)
            self.assertEqual(theme.value, val)

    def test_theme_id_invalid_raises_exception(self) -> None:
        with self.assertRaises(InvalidThemeException):
            ThemeId(5)
        with self.assertRaises(InvalidThemeException):
            ThemeId(0)

    def test_catalog_layout_valid_values(self) -> None:
        for layout in ("grid-3", "grid-4", "list"):
            obj = CatalogLayout(layout)
            self.assertEqual(obj.value, layout)

    def test_catalog_layout_invalid_raises_exception(self) -> None:
        with self.assertRaises(InvalidCatalogLayoutException):
            CatalogLayout("carousel")

    def test_entity_creation_and_update(self) -> None:
        entity = StoreConfig.create_default()
        self.assertEqual(entity.theme_id.value, 1)
        self.assertEqual(entity.catalog_layout.value, "grid-3")

        entity.update_configuration(
            store_name="Tienda Gourmet",
            theme_id=3,
            catalog_layout="list",
        )
        self.assertEqual(entity.store_name, "Tienda Gourmet")
        self.assertEqual(entity.theme_id.value, 3)
        self.assertEqual(entity.catalog_layout.value, "list")


class StoreConfigIntegrationTests(TestCase):
    """Integration tests for repositories, use cases, and HTTP endpoints."""

    def setUp(self) -> None:
        self.client = APIClient()
        self.repo = DjangoORMStoreConfigRepository()

    def test_get_store_config_creates_default_if_none_exists(self) -> None:
        use_case = GetStoreConfigUseCase(self.repo)
        dto = use_case.execute()

        self.assertIsNotNone(dto)
        self.assertEqual(dto.theme_id, 1)
        self.assertEqual(dto.catalog_layout, "grid-3")
        self.assertEqual(StoreConfigModel.objects.count(), 1)

    def test_api_get_store_config_endpoint(self) -> None:
        response = self.client.get('/api/store-config/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("store_name", response.data)
        self.assertIn("theme_id", response.data)
        self.assertEqual(response.data["theme_id"], 1)

    def test_api_patch_store_config_success(self) -> None:
        payload = {
            "store_name": "Artesanias del Sur",
            "theme_id": 2,
            "catalog_layout": "grid-4",
            "hero_title": "Tradicion y Calidad",
        }
        response = self.client.patch('/api/store-config/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["store_name"], "Artesanias del Sur")
        self.assertEqual(response.data["theme_id"], 2)
        self.assertEqual(response.data["catalog_layout"], "grid-4")

    def test_api_patch_store_config_invalid_theme(self) -> None:
        payload = {"theme_id": 99}
        response = self.client.patch('/api/store-config/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_api_patch_store_config_invalid_layout(self) -> None:
        payload = {"catalog_layout": "non-existent-layout"}
        response = self.client.patch('/api/store-config/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
