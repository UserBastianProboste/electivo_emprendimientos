# Module: CatalogDTOs
# Description: Data Transfer Objects for catalog queries, filters, and products
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation of ProductDTO and CatalogQueryDTO.

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional
from apps.catalog.domain.entities import Product


@dataclass
class ProductDTO:
    """Representation of a polymorphic product delivered to client adapters."""
    id: Optional[str]
    name: str
    slug: str
    description: str
    price: float
    category: str
    brand: str
    stock: int
    original_price: Optional[float] = None
    images: List[str] = field(default_factory=list)
    dynamic_attributes: Dict[str, Any] = field(default_factory=dict)
    is_active: bool = True
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    @classmethod
    def from_entity(cls, entity: Product) -> "ProductDTO":
        """Factory transforming domain entity into DTO."""
        return cls(
            id=entity.id,
            name=entity.name,
            slug=entity.slug,
            description=entity.description,
            price=entity.price,
            original_price=entity.original_price,
            category=entity.category,
            brand=entity.brand,
            stock=entity.stock,
            images=entity.images,
            dynamic_attributes=entity.dynamic_attributes,
            is_active=entity.is_active,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
        )


@dataclass
class CatalogQueryDTO:
    """Criteria container for filtering and searching products."""
    search: Optional[str] = None
    category: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    dynamic_filters: Dict[str, Any] = field(default_factory=dict)
    sort_by: Optional[str] = None
    page: int = 1
    page_size: int = 12


@dataclass
class FacetedFiltersDTO:
    """Response payload containing available dynamic facets."""
    categories: List[str]
    price_range: Dict[str, float]
    dynamic_attributes: Dict[str, List[Any]]


@dataclass
class CreateProductDTO:
    """Payload container for creating a new product."""
    name: str
    slug: str
    description: str
    price: float
    category: str
    brand: str
    stock: int
    original_price: Optional[float] = None
    images: List[str] = field(default_factory=list)
    dynamic_attributes: Dict[str, Any] = field(default_factory=dict)
