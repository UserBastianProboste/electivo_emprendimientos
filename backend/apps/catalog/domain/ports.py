# Module: CatalogPorts
# Description: Outbound repository interface port for product catalog persistence
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial repository port definition.

from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional, Tuple
from apps.catalog.domain.entities import Product


class ProductRepositoryPort(ABC):
    """Abstract port for polymorphic product catalog repository."""

    @abstractmethod
    def list_products(
        self,
        search: Optional[str] = None,
        category: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        dynamic_filters: Optional[Dict[str, Any]] = None,
        sort_by: Optional[str] = None,
        page: int = 1,
        page_size: int = 20,
    ) -> Tuple[List[Product], int]:
        """Fetch paginated products matching dynamic search and facet criteria."""
        pass

    @abstractmethod
    def get_available_filters(self) -> Dict[str, Any]:
        """Aggregate distinct categories, price bounds, and dynamic attributes."""
        pass

    @abstractmethod
    def create_product(self, product: Product) -> Product:
        """Persist a new polymorphic product in document storage."""
        pass

    @abstractmethod
    def get_by_id(self, product_id: str) -> Optional[Product]:
        """Retrieve a single product by its unique document identifier."""
        pass

    @abstractmethod
    def count(self) -> int:
        """Return total count of active products."""
        pass
