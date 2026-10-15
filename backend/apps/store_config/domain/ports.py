# Module: StoreConfigPorts
# Description: Outbound repository interface port for store configuration persistence
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial repository port definition.

from abc import ABC, abstractmethod
from typing import Optional
from apps.store_config.domain.entities import StoreConfig


class StoreConfigRepositoryPort(ABC):
    """Abstract port for store configuration persistence adapter."""

    @abstractmethod
    def get_config(self) -> Optional[StoreConfig]:
        """Fetch the current store configuration, if any exists."""
        pass

    @abstractmethod
    def save_config(self, config: StoreConfig) -> StoreConfig:
        """Persist or update store configuration."""
        pass
