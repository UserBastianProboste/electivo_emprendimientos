# Module: CatalogViews
# Description: REST API controllers for catalog queries and facet discovery
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation of CatalogProductsView and CatalogFiltersView.

from typing import Any, Dict
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status

from apps.catalog.infrastructure.repositories import MongoProductRepository
from apps.catalog.application.use_cases import (
    ListProductsUseCase,
    GetCatalogFiltersUseCase,
    CreateProductUseCase,
)
from apps.catalog.application.dtos import (
    CatalogQueryDTO,
    CreateProductDTO,
)
from apps.catalog.infrastructure.serializers import (
    ProductSerializer,
    CatalogQuerySerializer,
    FacetedFiltersSerializer,
    CreateProductSerializer,
)
from apps.catalog.domain.exceptions import CatalogDomainException


class CatalogProductsView(APIView):
    """Entry adapter for searching and filtering polymorphic catalog items."""

    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.repository = MongoProductRepository()
        self.list_use_case = ListProductsUseCase(self.repository)
        self.create_use_case = CreateProductUseCase(self.repository)

    def get(self, request: Request) -> Response:
        """Fetch paginated products with dynamic attribute filtering."""
        query_serializer = CatalogQuerySerializer(data=request.query_params)
        if not query_serializer.is_valid():
            return Response(
                {"errors": query_serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        validated = query_serializer.validated_data

        # Extract dynamic attribute filters from query params prefixed with 'attr_'
        dynamic_filters: Dict[str, Any] = {}
        for param_key, param_val in request.query_params.items():
            if param_key.startswith("attr_"):
                attr_name = param_key[5:].strip().lower()
                if attr_name and param_val:
                    dynamic_filters[attr_name] = param_val

        query_dto = CatalogQueryDTO(
            search=validated.get("search"),
            category=validated.get("category"),
            min_price=validated.get("min_price"),
            max_price=validated.get("max_price"),
            dynamic_filters=dynamic_filters,
            sort_by=validated.get("sort_by"),
            page=validated.get("page", 1),
            page_size=validated.get("page_size", 12),
        )

        try:
            result = self.list_use_case.execute(query_dto)
            serialized_products = ProductSerializer(result["products"], many=True)
            return Response(
                {
                    "products": serialized_products.data,
                    "total": result["total"],
                    "page": result["page"],
                    "page_size": result["page_size"],
                    "total_pages": result["total_pages"],
                },
                status=status.HTTP_200_OK,
            )
        except Exception as exc:
            return Response(
                {"error": f"Failed to retrieve catalog: {str(exc)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request: Request) -> Response:
        """Create a new polymorphic product in document storage."""
        serializer = CreateProductSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        val = serializer.validated_data
        dto = CreateProductDTO(
            name=val["name"],
            slug=val["slug"],
            description=val["description"],
            price=val["price"],
            original_price=val.get("original_price"),
            category=val["category"],
            brand=val["brand"],
            stock=val["stock"],
            images=val.get("images", []),
            dynamic_attributes=val.get("dynamic_attributes", {}),
        )

        try:
            created_dto = self.create_use_case.execute(dto)
            response_serializer = ProductSerializer(created_dto)
            return Response(
                response_serializer.data,
                status=status.HTTP_201_CREATED,
            )
        except CatalogDomainException as exc:
            return Response(
                {"error": str(exc)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as exc:
            return Response(
                {"error": f"Failed to create product: {str(exc)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CatalogFiltersView(APIView):
    """Entry adapter providing dynamic facet discovery for the frontend."""

    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.repository = MongoProductRepository()
        self.filters_use_case = GetCatalogFiltersUseCase(self.repository)

    def get(self, request: Request) -> Response:
        """Retrieve aggregated categories, price ranges, and dynamic facet keys."""
        try:
            filters_dto = self.filters_use_case.execute()
            serializer = FacetedFiltersSerializer(filters_dto)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as exc:
            return Response(
                {"error": f"Failed to retrieve catalog filters: {str(exc)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
