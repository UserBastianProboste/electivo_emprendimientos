# Module: StoreConfigUseCases
# Description: Application use cases for fetching and updating store customization
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation of GetStoreConfigUseCase and UpdateStoreConfigUseCase.

from apps.store_config.domain.entities import StoreConfig
from apps.store_config.domain.ports import StoreConfigRepositoryPort
from apps.store_config.application.dtos import StoreConfigDTO, UpdateStoreConfigDTO


class GetStoreConfigUseCase:
    """Use case responsible for retrieving public store configuration."""

    def __init__(self, repository: StoreConfigRepositoryPort) -> None:
        self._repository = repository

    def execute(self) -> StoreConfigDTO:
        """Execute use case to fetch active store configuration."""
        config = self._repository.get_config()
        if config is None:
            default_config = StoreConfig.create_default()
            config = self._repository.save_config(default_config)
        return StoreConfigDTO.from_entity(config)


class UpdateStoreConfigUseCase:
    """Use case responsible for modifying store settings and branding."""

    def __init__(self, repository: StoreConfigRepositoryPort) -> None:
        self._repository = repository

    def execute(self, dto: UpdateStoreConfigDTO) -> StoreConfigDTO:
        """Execute use case with payload validation and persistence."""
        current_config = self._repository.get_config()
        if current_config is None:
            current_config = StoreConfig.create_default()

        current_config.update_configuration(
            store_name=dto.store_name,
            hero_title=dto.hero_title,
            hero_subtitle=dto.hero_subtitle,
            hero_cta_text=dto.hero_cta_text,
            theme_id=dto.theme_id,
            logo_url=dto.logo_url,
            favicon_url=dto.favicon_url,
            catalog_layout=dto.catalog_layout,
        )

        persisted = self._repository.save_config(current_config)
        return StoreConfigDTO.from_entity(persisted)
