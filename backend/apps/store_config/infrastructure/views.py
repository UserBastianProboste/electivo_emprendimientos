# Module: StoreConfigViews
# Description: REST API controllers for store configuration queries and updates
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation of StoreConfigAPIView.

from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status

from apps.store_config.infrastructure.repositories import DjangoORMStoreConfigRepository
from apps.store_config.application.use_cases import (
    GetStoreConfigUseCase,
    UpdateStoreConfigUseCase,
)
from apps.store_config.application.dtos import UpdateStoreConfigDTO
from apps.store_config.infrastructure.serializers import (
    StoreConfigSerializer,
    UpdateStoreConfigSerializer,
)
from apps.store_config.domain.exceptions import StoreConfigDomainException


class StoreConfigAPIView(APIView):
    """Entry adapter handling public queries and admin updates for store settings."""

    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        self.repository = DjangoORMStoreConfigRepository()
        self.get_use_case = GetStoreConfigUseCase(self.repository)
        self.update_use_case = UpdateStoreConfigUseCase(self.repository)

    def get(self, request: Request) -> Response:
        """Retrieve current active store configuration."""
        dto = self.get_use_case.execute()
        serializer = StoreConfigSerializer(dto)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request: Request) -> Response:
        """Full or partial update of store customization parameters."""
        return self._handle_update(request)

    def patch(self, request: Request) -> Response:
        """Partial update of store customization parameters."""
        return self._handle_update(request)

    def _handle_update(self, request: Request) -> Response:
        serializer = UpdateStoreConfigSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        validated = serializer.validated_data
        dto = UpdateStoreConfigDTO(
            store_name=validated.get('store_name'),
            hero_title=validated.get('hero_title'),
            hero_subtitle=validated.get('hero_subtitle'),
            hero_cta_text=validated.get('hero_cta_text'),
            theme_id=validated.get('theme_id'),
            logo_url=validated.get('logo_url'),
            favicon_url=validated.get('favicon_url'),
            catalog_layout=validated.get('catalog_layout'),
        )

        try:
            result_dto = self.update_use_case.execute(dto)
            response_serializer = StoreConfigSerializer(result_dto)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        except StoreConfigDomainException as exc:
            return Response(
                {"error": str(exc)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as exc:
            return Response(
                {"error": f"Internal server error: {str(exc)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
