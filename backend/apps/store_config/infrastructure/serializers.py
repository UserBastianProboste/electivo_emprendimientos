# Module: StoreConfigSerializers
# Description: Django REST Framework serializers for store configuration API
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial serializer implementation.

from rest_framework import serializers


class StoreConfigSerializer(serializers.Serializer):
    """Serializer representing output store configuration."""
    id = serializers.IntegerField(allow_null=True)
    store_name = serializers.CharField(max_length=255)
    hero_title = serializers.CharField(max_length=255)
    hero_subtitle = serializers.CharField()
    hero_cta_text = serializers.CharField(max_length=100)
    theme_id = serializers.IntegerField()
    logo_url = serializers.CharField(allow_blank=True)
    favicon_url = serializers.CharField(allow_blank=True)
    catalog_layout = serializers.CharField(max_length=20)
    color_mode = serializers.CharField(max_length=10)
    updated_at = serializers.CharField(allow_null=True)


class UpdateStoreConfigSerializer(serializers.Serializer):
    """Validator serializer for store customization updates."""
    store_name = serializers.CharField(max_length=255, required=False)
    hero_title = serializers.CharField(max_length=255, required=False)
    hero_subtitle = serializers.CharField(required=False)
    hero_cta_text = serializers.CharField(max_length=100, required=False)
    theme_id = serializers.ChoiceField(choices=[1, 2, 3, 4], required=False)
    logo_url = serializers.CharField(allow_blank=True, required=False)
    favicon_url = serializers.CharField(allow_blank=True, required=False)
    catalog_layout = serializers.ChoiceField(
        choices=['grid-3', 'grid-4', 'list'],
        required=False
    )
    color_mode = serializers.ChoiceField(
        choices=['light', 'dark'],
        required=False
    )
