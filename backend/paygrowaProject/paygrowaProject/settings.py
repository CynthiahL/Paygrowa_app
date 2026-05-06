"""
Django settings for paygrowaProject — Sprint 1
"""

from pathlib import Path
from datetime import timedelta
import os

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# ---------------------------------------------------------------------------
# Load .env — override=True ensures .env always wins over stale system env vars
# ---------------------------------------------------------------------------
try:
    from dotenv import load_dotenv
    load_dotenv(BASE_DIR / '.env', override=True)
except ImportError:
    pass  # python-dotenv not installed; values must be set in the system environment

# ---------------------------------------------------------------------------
# Security
# ---------------------------------------------------------------------------
SECRET_KEY = os.environ.get(
    'SECRET_KEY',
    'django-insecure-dev-fallback-key-change-before-production'
)

DEBUG = os.environ.get('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# ---------------------------------------------------------------------------
# Installed apps
# ---------------------------------------------------------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third-party
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'drf_spectacular',
    # Local
    'paygrowa',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',   # must be first
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'paygrowaProject.urls'

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

WSGI_APPLICATION = 'paygrowaProject.wsgi.application'

# ---------------------------------------------------------------------------
# Database — PostgreSQL (local or Supabase)
#
# For LOCAL PostgreSQL:
#   DB_HOST=localhost  DB_PORT=5432  DB_NAME=paygrowa
#   DB_USER=postgres   DB_PASSWORD=yourpassword
#
# For SUPABASE:
#   DB_HOST=db.<your-project-ref>.supabase.co
#   DB_PORT=5432  (direct) or 6543 (pooler — use direct for migrations)
#   DB_NAME=postgres
#   DB_USER=postgres
#   DB_PASSWORD=<your-supabase-db-password>
#   DB_SSLMODE=require
# ---------------------------------------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME':     os.environ.get('DB_NAME',     'paygrowa'),
        'USER':     os.environ.get('DB_USER',     'postgres'),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST':     os.environ.get('DB_HOST',     'localhost'),
        'PORT':     os.environ.get('DB_PORT',     '5432'),
        'OPTIONS': {
            # 'sslmode' is only applied when the env var is set (needed for Supabase)
            **({'sslmode': os.environ['DB_SSLMODE']} if os.environ.get('DB_SSLMODE') else {}),
        },
    }
}

# ---------------------------------------------------------------------------
# Custom user model
# ---------------------------------------------------------------------------
AUTH_USER_MODEL = 'paygrowa.User'

# ---------------------------------------------------------------------------
# Password validation
# ---------------------------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ---------------------------------------------------------------------------
# Internationalisation
# ---------------------------------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ---------------------------------------------------------------------------
# Static & media files
# ---------------------------------------------------------------------------
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = [
        o.strip() for o in os.environ.get('CORS_ALLOWED_ORIGINS', '').split(',') if o.strip()
    ]

# ---------------------------------------------------------------------------
# Django REST Framework
# ---------------------------------------------------------------------------
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# ---------------------------------------------------------------------------
# SimpleJWT
# ---------------------------------------------------------------------------
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME':  timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS':  False,
    'AUTH_HEADER_TYPES':      ('Bearer',),
}

# ---------------------------------------------------------------------------
# drf-spectacular
# ---------------------------------------------------------------------------
SPECTACULAR_SETTINGS = {
    'TITLE':       'Paygrowa API',
    'DESCRIPTION': 'Micro-task and savings platform — Sprint 1',
    'VERSION':     '1.0.0',
}
