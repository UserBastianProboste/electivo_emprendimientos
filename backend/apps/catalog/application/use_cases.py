# Module: CatalogUseCases
# Description: Application use cases for querying, filtering, and persisting products
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation of ListProductsUseCase, GetCatalogFiltersUseCase, CreateProductUseCase.

import math
from typing import Any, Dict
from apps.catalog.domain.entities import Product
from apps.catalog.domain.ports import ProductRepositoryPort
from apps.catalog.application.dtos import (
    ProductDTO,
    CatalogQueryDTO,
    FacetedFiltersDTO,
    CreateProductDTO,
)


class ListProductsUseCase:
    """Use case coordinating paginated product retrieval with dynamic filters."""

    def __init__(self, repository: ProductRepositoryPort) -> None:
        self._repository = repository

    def execute(self, query: CatalogQueryDTO) -> Dict[str, Any]:
        """Execute query across repository returning paginated envelope."""
        products, total = self._repository.list_products(
            search=query.search,
            category=query.category,
            min_price=query.min_price,
            max_price=query.max_price,
            dynamic_filters=query.dynamic_filters,
            sort_by=query.sort_by,
            page=query.page,
            page_size=query.page_size,
        )

        dtos = [ProductDTO.from_entity(p) for p in products]
        total_pages = math.ceil(total / query.page_size) if total > 0 else 1

        return {
            "products": dtos,
            "total": total,
            "page": query.page,
            "page_size": query.page_size,
            "total_pages": total_pages,
        }


class GetCatalogFiltersUseCase:
    """Use case retrieving aggregate categories, price boundaries, and facet keys."""

    def __init__(self, repository: ProductRepositoryPort) -> None:
        self._repository = repository

    def execute(self) -> FacetedFiltersDTO:
        """Execute aggregation on document repository."""
        data = self._repository.get_available_filters()
        return FacetedFiltersDTO(
            categories=data.get("categories", []),
            price_range=data.get("price_range", {"min": 0.0, "max": 0.0}),
            dynamic_attributes=data.get("dynamic_attributes", {}),
        )


class CreateProductUseCase:
    """Use case handling domain entity creation and document persistence."""

    def __init__(self, repository: ProductRepositoryPort) -> None:
        self._repository = repository

    def execute(self, dto: CreateProductDTO) -> ProductDTO:
        """Instantiate domain entity, enforce rules, and persist."""
        entity = Product(
            id=None,
            name=dto.name,
            slug=dto.slug,
            description=dto.description,
            price=dto.price,
            original_price=dto.original_price,
            category=dto.category,
            brand=dto.brand,
            stock=dto.stock,
            images=dto.images,
            dynamic_attributes=dto.dynamic_attributes,
        )
        saved = self._repository.create_product(entity)
        return ProductDTO.from_entity(saved)
