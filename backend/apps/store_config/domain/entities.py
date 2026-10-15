# Module: StoreConfigEntity
# Description: Pure domain entity for store configuration and visual branding
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation of StoreConfig entity.

from dataclasses import dataclass
from typing import Optional
from apps.store_config.domain.value_objects import ThemeId, CatalogLayout


@dataclass
class StoreConfig:
    """Core domain entity holding white-label store parameters."""
    id: Optional[int]
    store_name: str
    hero_title: str
    hero_subtitle: str
    hero_cta_text: str
    theme_id: ThemeId
    logo_url: str
    favicon_url: str
    catalog_layout: CatalogLayout
    updated_at: Optional[str] = None

    @classmethod
    def create_default(cls) -> "StoreConfig":
        """Factory method returning default system store configuration."""
        return cls(
            id=None,
            store_name="Mi Emprendimiento Comunitario",
            hero_title="Impulsa tu Negocio Local con Nuestra Vitrina Digital",
            hero_subtitle="Descubre productos artesanales, sostenibles y de alta calidad elaborados por emprendedores de nuestra comunidad.",
            hero_cta_text="Explorar Catalogo",
            theme_id=ThemeId(1),
            logo_url="",
            favicon_url="",
            catalog_layout=CatalogLayout("grid-3"),
            updated_at=None,
        )

    def update_configuration(
        self,
        store_name: Optional[str] = None,
        hero_title: Optional[str] = None,
        hero_subtitle: Optional[str] = None,
        hero_cta_text: Optional[str] = None,
        theme_id: Optional[int] = None,
        logo_url: Optional[str] = None,
        favicon_url: Optional[str] = None,
        catalog_layout: Optional[str] = None,
    ) -> None:
        """Mutate entity attributes with domain validation."""
        if store_name is not None and store_name.strip():
            self.store_name = store_name.strip()
        if hero_title is not None:
            self.hero_title = hero_title.strip()
        if hero_subtitle is not None:
            self.hero_subtitle = hero_subtitle.strip()
        if hero_cta_text is not None and hero_cta_text.strip():
            self.hero_cta_text = hero_cta_text.strip()
        if theme_id is not None:
            self.theme_id = ThemeId(theme_id)
        if logo_url is not None:
            self.logo_url = logo_url.strip()
        if favicon_url is not None:
            self.favicon_url = favicon_url.strip()
        if catalog_layout is not None:
            self.catalog_layout = CatalogLayout(catalog_layout)
