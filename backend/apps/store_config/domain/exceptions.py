# Module: StoreConfigDomainExceptions
# Description: Pure domain exceptions for store configuration validation
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial domain exception definitions.


class StoreConfigDomainException(Exception):
    """Base exception for store configuration domain violations."""
    pass


class InvalidThemeException(StoreConfigDomainException):
    """Raised when an invalid theme identifier is provided."""
    pass


class InvalidCatalogLayoutException(StoreConfigDomainException):
    """Raised when an unsupported catalog layout structure is selected."""
    pass


class StoreConfigNotFoundException(StoreConfigDomainException):
    """Raised when requested store configuration does not exist."""
    pass
