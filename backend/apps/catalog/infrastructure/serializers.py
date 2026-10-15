# Module: CatalogSerializers
# Description: DRF serializers for product catalog data conversion and query validation
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation of ProductSerializer and filter serializers.

from rest_framework import serializers


class ProductSerializer(serializers.Serializer):
    """Output serializer representing a polymorphic product."""
    id = serializers.CharField(allow_null=True)
    name = serializers.CharField(max_length=255)
    slug = serializers.CharField(max_length=255)
    description = serializers.CharField()
    price = serializers.FloatField()
    original_price = serializers.FloatField(allow_null=True, required=False)
    category = serializers.CharField(max_length=100)
    brand = serializers.CharField(max_length=100)
    stock = serializers.IntegerField()
    images = serializers.ListField(child=serializers.CharField(), default=list)
    dynamic_attributes = serializers.DictField(default=dict)
    is_active = serializers.BooleanField(default=True)
    created_at = serializers.CharField(allow_null=True, required=False)
    updated_at = serializers.CharField(allow_null=True, required=False)


class CatalogQuerySerializer(serializers.Serializer):
    """Validator for incoming query parameters in product search."""
    search = serializers.CharField(required=False, allow_blank=True)
    category = serializers.CharField(required=False, allow_blank=True)
    min_price = serializers.FloatField(required=False, min_value=0.0)
    max_price = serializers.FloatField(required=False, min_value=0.0)
    sort_by = serializers.ChoiceField(
        choices=['price_asc', 'price_desc', 'name_asc', 'newest'],
        required=False,
        default='newest'
    )
    page = serializers.IntegerField(required=False, default=1, min_value=1)
    page_size = serializers.IntegerField(required=False, default=12, min_value=1, max_value=100)


class FacetedFiltersSerializer(serializers.Serializer):
    """Output serializer for facet discovery."""
    categories = serializers.ListField(child=serializers.CharField())
    price_range = serializers.DictField()
    dynamic_attributes = serializers.DictField()


class CreateProductSerializer(serializers.Serializer):
    """Input serializer for manual or programmatic product ingestion."""
    name = serializers.CharField(max_length=255)
    slug = serializers.CharField(max_length=255)
    description = serializers.CharField()
    price = serializers.FloatField(min_value=0.0)
    original_price = serializers.FloatField(min_value=0.0, required=False, allow_null=True)
    category = serializers.CharField(max_length=100)
    brand = serializers.CharField(max_length=100)
    stock = serializers.IntegerField(min_value=0)
    images = serializers.ListField(child=serializers.CharField(), default=list)
    dynamic_attributes = serializers.DictField(default=dict)
