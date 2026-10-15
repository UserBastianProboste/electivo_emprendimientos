# Module: CatalogExceptions
# Description: Pure domain exceptions for catalog and product validation
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial catalog domain exceptions.


class CatalogDomainException(Exception):
    """Base exception for all catalog domain errors."""
    pass


class ProductNotFoundException(CatalogDomainException):
    """Raised when a requested product does not exist in the catalog."""
    pass


class InvalidProductDataException(CatalogDomainException):
    """Raised when product entity fields fail domain invariants."""
    pass
