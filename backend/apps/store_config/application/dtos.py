# Module: StoreConfigDTOs
# Description: Data Transfer Objects for store configuration application boundary
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation of StoreConfigDTO and UpdateStoreConfigDTO.

from dataclasses import dataclass
from typing import Optional
from apps.store_config.domain.entities import StoreConfig


@dataclass
class StoreConfigDTO:
    """Read DTO representing store configuration payload."""
    id: Optional[int]
    store_name: str
    hero_title: str
    hero_subtitle: str
    hero_cta_text: str
    theme_id: int
    logo_url: str
    favicon_url: str
    catalog_layout: str
    updated_at: Optional[str]

    @classmethod
    def from_entity(cls, entity: StoreConfig) -> "StoreConfigDTO":
        """Convert domain entity to DTO representation."""
        return cls(
            id=entity.id,
            store_name=entity.store_name,
            hero_title=entity.hero_title,
            hero_subtitle=entity.hero_subtitle,
            hero_cta_text=entity.hero_cta_text,
            theme_id=entity.theme_id.value,
            logo_url=entity.logo_url,
            favicon_url=entity.favicon_url,
            catalog_layout=entity.catalog_layout.value,
            updated_at=entity.updated_at,
        )


@dataclass
class UpdateStoreConfigDTO:
    """Write DTO containing fields for configuration updates."""
    store_name: Optional[str] = None
    hero_title: Optional[str] = None
    hero_subtitle: Optional[str] = None
    hero_cta_text: Optional[str] = None
    theme_id: Optional[int] = None
    logo_url: Optional[str] = None
    favicon_url: Optional[str] = None
    catalog_layout: Optional[str] = None
