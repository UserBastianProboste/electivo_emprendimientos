# Module: RootUrls
# Description: Root URL configuration exposing store-config and catalog APIs
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial routing for store-config and catalog contexts.

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.store_config.infrastructure.urls')),
    path('api/', include('apps.catalog.infrastructure.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
