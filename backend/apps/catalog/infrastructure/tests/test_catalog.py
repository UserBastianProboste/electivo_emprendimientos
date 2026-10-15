# Module: TestCatalog
# Description: Unit and integration tests for polymorphic catalog domain, repository, and API
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial test coverage for product entity, dynamic queries, and facet discovery.

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from apps.catalog.domain.entities import Product
from apps.catalog.domain.exceptions import InvalidProductDataException
from apps.catalog.domain.ports import ProductRepositoryPort
from apps.catalog.application.dtos import CatalogQueryDTO, CreateProductDTO
from apps.catalog.application.use_cases import (
    ListProductsUseCase,
    GetCatalogFiltersUseCase,
    CreateProductUseCase,
)
from apps.catalog.infrastructure.repositories import MongoProductRepository


class InMemoryProductRepository(ProductRepositoryPort):
    """Test double implementing ProductRepositoryPort in memory."""

    def __init__(self) -> None:
        self.products = []
        self._next_id = 1

    def list_products(
        self,
        search=None,
        category=None,
        min_price=None,
        max_price=None,
        dynamic_filters=None,
        sort_by=None,
        page=1,
        page_size=20,
    ):
        filtered = [p for p in self.products if p.is_active]
        if search:
            term = search.lower()
            filtered = [
                p for p in filtered
                if term in p.name.lower() or term in p.description.lower() or term in p.brand.lower()
            ]
        if category:
            filtered = [p for p in filtered if p.category.lower() == category.lower()]
        if min_price is not None:
            filtered = [p for p in filtered if p.price >= min_price]
        if max_price is not None:
            filtered = [p for p in filtered if p.price <= max_price]
        if dynamic_filters:
            for k, v in dynamic_filters.items():
                filtered = [
                    p for p in filtered
                    if str(p.dynamic_attributes.get(k, '')).lower() == str(v).lower()
                ]

        total = len(filtered)
        start = (page - 1) * page_size
        return filtered[start:start + page_size], total

    def get_available_filters(self):
        categories = sorted(list({p.category for p in self.products if p.is_active}))
        prices = [p.price for p in self.products if p.is_active]
        min_p = min(prices) if prices else 0.0
        max_p = max(prices) if prices else 0.0
        dyn = {}
        for p in self.products:
            if p.is_active:
                for k, v in p.dynamic_attributes.items():
                    if k not in dyn:
                        dyn[k] = []
                    if v not in dyn[k]:
                        dyn[k].append(v)
        return {
            "categories": categories,
            "price_range": {"min": min_p, "max": max_p},
            "dynamic_attributes": dyn,
        }

    def create_product(self, product: Product) -> Product:
        product.id = str(self._next_id)
        self._next_id += 1
        self.products.append(product)
        return product

    def get_by_id(self, product_id: str):
        for p in self.products:
            if p.id == product_id:
                return p
        return None

    def count(self) -> int:
        return len([p for p in self.products if p.is_active])


class CatalogDomainTests(TestCase):
    """Domain layer validation tests for polymorphic product invariants."""

    def test_product_valid_instantiation(self) -> None:
        prod = Product(
            id=None,
            name="Polera Sostenible",
            slug="polera-sostenible",
            description="Polera de algodon",
            price=15000.0,
            category="Vestuario",
            brand="EcoAustral",
            stock=10,
            dynamic_attributes={"talla": "M", "color": "Verde"},
        )
        self.assertEqual(prod.name, "Polera Sostenible")
        self.assertEqual(prod.dynamic_attributes["talla"], "M")
        self.assertTrue(prod.is_in_stock())

    def test_product_negative_price_raises_exception(self) -> None:
        with self.assertRaises(InvalidProductDataException):
            Product(
                id=None,
                name="Producto Invalido",
                slug="producto-invalido",
                description="Desc",
                price=-100.0,
                category="General",
                brand="Marca",
                stock=5,
            )

    def test_product_negative_stock_raises_exception(self) -> None:
        with self.assertRaises(InvalidProductDataException):
            Product(
                id=None,
                name="Producto Invalido",
                slug="producto-invalido",
                description="Desc",
                price=100.0,
                category="General",
                brand="Marca",
                stock=-1,
            )

    def test_product_empty_name_raises_exception(self) -> None:
        with self.assertRaises(InvalidProductDataException):
            Product(
                id=None,
                name="",
                slug="slug",
                description="Desc",
                price=100.0,
                category="General",
                brand="Marca",
                stock=5,
            )


class CatalogUseCaseTests(TestCase):
    """Application layer tests verifying use cases with dynamic query criteria."""

    def setUp(self) -> None:
        self.repo = InMemoryProductRepository()
        self.create_use_case = CreateProductUseCase(self.repo)
        self.list_use_case = ListProductsUseCase(self.repo)
        self.filters_use_case = GetCatalogFiltersUseCase(self.repo)

        # Ingest 3 polymorphic products across categories
        self.p1 = self.create_use_case.execute(
            CreateProductDTO(
                name="Polera Algodon",
                slug="polera-algodon",
                description="Moda sustentable",
                price=12000.0,
                category="Vestuario",
                brand="EcoModa",
                stock=10,
                dynamic_attributes={"talla": "M", "color": "Azul"},
            )
        )
        self.p2 = self.create_use_case.execute(
            CreateProductDTO(
                name="Polera Lana",
                slug="polera-lana",
                description="Lana calida",
                price=25000.0,
                category="Vestuario",
                brand="EcoModa",
                stock=5,
                dynamic_attributes={"talla": "L", "color": "Rojo"},
            )
        )
        self.p3 = self.create_use_case.execute(
            CreateProductDTO(
                name="Lampara Solar LED",
                slug="lampara-solar-led",
                description="Tecnologia verde",
                price=30000.0,
                category="Tecnologia",
                brand="Solaria",
                stock=8,
                dynamic_attributes={"voltaje": "220V", "potencia": "20W"},
            )
        )

    def test_list_all_products(self) -> None:
        query = CatalogQueryDTO()
        res = self.list_use_case.execute(query)
        self.assertEqual(res["total"], 3)
        self.assertEqual(len(res["products"]), 3)

    def test_filter_by_dynamic_attribute(self) -> None:
        query = CatalogQueryDTO(dynamic_filters={"talla": "M"})
        res = self.list_use_case.execute(query)
        self.assertEqual(res["total"], 1)
        self.assertEqual(res["products"][0].name, "Polera Algodon")

    def test_filter_by_category_and_price_range(self) -> None:
        query = CatalogQueryDTO(category="Vestuario", max_price=15000.0)
        res = self.list_use_case.execute(query)
        self.assertEqual(res["total"], 1)
        self.assertEqual(res["products"][0].price, 12000.0)

    def test_get_available_filters_aggregates_facets(self) -> None:
        facets = self.filters_use_case.execute()
        self.assertIn("Tecnologia", facets.categories)
        self.assertIn("Vestuario", facets.categories)
        self.assertEqual(facets.price_range["min"], 12000.0)
        self.assertEqual(facets.price_range["max"], 30000.0)
        self.assertIn("talla", facets.dynamic_attributes)
        self.assertIn("voltaje", facets.dynamic_attributes)


class CatalogAPIIntegrationTests(TestCase):
    """Integration test suite executing requests against Catalog DRF views."""

    def setUp(self) -> None:
        import mongomock
        self.client = APIClient()
        self.mock_client = mongomock.MongoClient()
        self.mock_db = self.mock_client["test_catalog_db"]
        self.mock_collection = self.mock_db["products"]
        self.mock_repo = MongoProductRepository(collection=self.mock_collection)

        # Seed sample documents
        self.mock_collection.insert_many([
            {
                "name": "Miel de Ulmo Organica",
                "slug": "miel-ulmo-organica",
                "description": "Miel natural de bosque nativo",
                "price": 8990.0,
                "original_price": 10990.0,
                "category": "Gourmet",
                "brand": "Colmenas del Sur",
                "stock": 20,
                "images": ["https://images.unsplash.com/photo-1587049352846-4a222e784d38"],
                "dynamic_attributes": {"origen": "Valdivia", "peso": "500g"},
                "is_active": True,
            },
            {
                "name": "Cafe Tostado Artesanal",
                "slug": "cafe-tostado-artesanal",
                "description": "Grano arábica seleccionado",
                "price": 12500.0,
                "original_price": None,
                "category": "Gourmet",
                "brand": "Cafe Valpo",
                "stock": 15,
                "images": ["https://images.unsplash.com/photo-1559056199-641a0ac8b55e"],
                "dynamic_attributes": {"origen": "Valparaiso", "peso": "250g"},
                "is_active": True,
            }
        ])

    def test_get_catalog_products_api(self) -> None:
        from unittest.mock import patch

        with patch("apps.catalog.infrastructure.repositories.get_mongo_collection", return_value=self.mock_collection):
            response = self.client.get('/api/catalog/products/')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertIn("products", response.data)
            self.assertEqual(response.data["total"], 2)

    def test_get_catalog_filters_api(self) -> None:
        from unittest.mock import patch

        with patch("apps.catalog.infrastructure.repositories.get_mongo_collection", return_value=self.mock_collection):
            response = self.client.get('/api/catalog/filters/')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertIn("categories", response.data)
            self.assertIn("Gourmet", response.data["categories"])
            self.assertIn("dynamic_attributes", response.data)

