# Module: StoreConfigValueObjects
# Description: Immutable domain value objects for theme and layout validation
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation of ThemeId and CatalogLayout.

from dataclasses import dataclass
from apps.store_config.domain.exceptions import (
    InvalidThemeException,
    InvalidCatalogLayoutException,
)


@dataclass(frozen=True)
class ThemeId:
    """Represents a validated store color theme identifier (1 through 4)."""
    value: int

    ALLOWED_THEMES = (1, 2, 3, 4)

    def __post_init__(self) -> None:
        if self.value not in self.ALLOWED_THEMES:
            raise InvalidThemeException(
                f"Theme ID {self.value} is invalid. Allowed values are {self.ALLOWED_THEMES}."
            )


@dataclass(frozen=True)
class CatalogLayout:
    """Represents a validated catalog display layout."""
    value: str

    ALLOWED_LAYOUTS = ("grid-3", "grid-4", "list")

    def __post_init__(self) -> None:
        if self.value not in self.ALLOWED_LAYOUTS:
            raise InvalidCatalogLayoutException(
                f"Layout '{self.value}' is unsupported. Allowed values are {self.ALLOWED_LAYOUTS}."
            )
