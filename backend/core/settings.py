# Module: Settings
# Description: Django project settings with hybrid PostgreSQL and MongoDB configuration
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation supporting Argon2, HTTPS, and Hexagonal apps.

import os
from pathlib import Path
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env file at project root or backend
env_path = BASE_DIR.parent / '.env'
if env_path.exists():
    load_dotenv(env_path)
else:
    load_dotenv(BASE_DIR / '.env')

# Security key
SECRET_KEY = os.getenv(
    'DJANGO_SECRET_KEY',
    'django-insecure-saas-platform-key-development-2026'
)

# Debug mode
DEBUG = os.getenv('DJANGO_DEBUG', 'True').lower() in ('true', '1', 't')

# Allowed hosts
ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', '*').split(',')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third party apps
    'rest_framework',
    'corsheaders',
    # SaaS bounded contexts
    'apps.store_config.apps.StoreConfigAppConfig',
    'apps.catalog.apps.CatalogAppConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# Database Configuration (RNF-02: Hybrid PostgreSQL + MongoDB)
# PostgreSQL handles transactional core data (Store Config, Users, Orders)
POSTGRES_DB = os.getenv('POSTGRES_DB', 'ecommerce_db')
POSTGRES_USER = os.getenv('POSTGRES_USER', 'ecommerce_user')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'ecommerce_secure_pass_2026')
POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'localhost')
POSTGRES_PORT = os.getenv('POSTGRES_PORT', '5432')

# Fallback to SQLite if USE_SQLITE is explicitly set or during simple offline runs
USE_SQLITE = os.getenv('USE_SQLITE', 'False').lower() in ('true', '1')

if USE_SQLITE:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': POSTGRES_DB,
            'USER': POSTGRES_USER,
            'PASSWORD': POSTGRES_PASSWORD,
            'HOST': POSTGRES_HOST,
            'PORT': POSTGRES_PORT,
            'CONN_MAX_AGE': 600,
        }
    }

# MongoDB Configuration for Polymorphic Catalog
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/catalog_db')
MONGO_DB_NAME = os.getenv('MONGO_DB_NAME', 'catalog_db')

# Password Hashing Algorithms (RNF-03: Argon2 with BCrypt fallback)
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
]

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {'min_length': 8},
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'es-cl'
TIME_ZONE = 'America/Santiago'
USE_I18N = True
USE_TZ = True

# Static and Media files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FormParser',
    ],
}

# CORS Configuration
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Security and HTTPS (RNF-03)
SECURE_SSL_REDIRECT = os.getenv('SECURE_SSL_REDIRECT', 'False').lower() in ('true', '1')
SECURE_HSTS_SECONDS = int(os.getenv('SECURE_HSTS_SECONDS', '31536000' if SECURE_SSL_REDIRECT else '0'))
SECURE_HSTS_INCLUDE_SUBDOMAINS = SECURE_SSL_REDIRECT
SECURE_HSTS_PRELOAD = SECURE_SSL_REDIRECT
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = SECURE_SSL_REDIRECT
CSRF_COOKIE_SECURE = SECURE_SSL_REDIRECT
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'
