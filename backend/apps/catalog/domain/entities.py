# Module: CatalogEntities
# Description: Pure domain entity for polymorphic products with dynamic attributes
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation of polymorphic Product entity.

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional
from apps.catalog.domain.exceptions import InvalidProductDataException


@dataclass
class Product:
    """Core domain entity representing a polymorphic catalog product."""
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

    def __post_init__(self) -> None:
        """Validate domain invariants on entity initialization."""
        if not self.name or not self.name.strip():
            raise InvalidProductDataException("Product name cannot be empty.")
        if self.price < 0:
            raise InvalidProductDataException("Product price must be non-negative.")
        if self.stock < 0:
            raise InvalidProductDataException("Product stock must be non-negative.")
        if not isinstance(self.dynamic_attributes, dict):
            raise InvalidProductDataException("Dynamic attributes must be a dictionary.")

    def set_dynamic_attribute(self, key: str, value: Any) -> None:
        """Set or update an arbitrary dynamic attribute according to industry."""
        sanitized_key = key.strip().lower()
        if not sanitized_key:
            raise InvalidProductDataException("Dynamic attribute key cannot be blank.")
        self.dynamic_attributes[sanitized_key] = value

    def is_in_stock(self) -> bool:
        """Domain helper checking stock availability."""
        return self.stock > 0
