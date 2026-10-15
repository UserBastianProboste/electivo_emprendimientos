# Module: DjangoORMStoreConfigRepository
# Description: PostgreSQL Django ORM implementation of StoreConfigRepositoryPort
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial repository adapter implementation.

from typing import Optional
from apps.store_config.domain.entities import StoreConfig
from apps.store_config.domain.value_objects import ThemeId, CatalogLayout
from apps.store_config.domain.ports import StoreConfigRepositoryPort
from apps.store_config.infrastructure.models import StoreConfigModel


class DjangoORMStoreConfigRepository(StoreConfigRepositoryPort):
    """Outbound adapter mapping domain StoreConfig to PostgreSQL Django ORM."""

    def get_config(self) -> Optional[StoreConfig]:
        """Fetch the single active store configuration from PostgreSQL."""
        model = StoreConfigModel.objects.first()
        if model is None:
            return None
        return self._to_domain(model)

    def save_config(self, config: StoreConfig) -> StoreConfig:
        """Persist domain entity into PostgreSQL database."""
        model = StoreConfigModel.objects.first()
        if model is None:
            model = StoreConfigModel()

        model.store_name = config.store_name
        model.hero_title = config.hero_title
        model.hero_subtitle = config.hero_subtitle
        model.hero_cta_text = config.hero_cta_text
        model.theme_id = config.theme_id.value
        model.logo_url = config.logo_url
        model.favicon_url = config.favicon_url
        model.catalog_layout = config.catalog_layout.value
        model.save()

        return self._to_domain(model)

    @staticmethod
    def _to_domain(model: StoreConfigModel) -> StoreConfig:
        """Map Django ORM model to pure domain entity."""
        return StoreConfig(
            id=model.id,
            store_name=model.store_name,
            hero_title=model.hero_title,
            hero_subtitle=model.hero_subtitle,
            hero_cta_text=model.hero_cta_text,
            theme_id=ThemeId(model.theme_id),
            logo_url=model.logo_url,
            favicon_url=model.favicon_url,
            catalog_layout=CatalogLayout(model.catalog_layout),
            updated_at=model.updated_at.isoformat() if model.updated_at else None,
        )
