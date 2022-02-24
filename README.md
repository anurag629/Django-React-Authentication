# Django-React-Authentication

## 1. Create backend folder

## 2. run command :
    create-react-app frontend

* "frontend" is a Rect app name

## 3. Inside backend create virtual environment and activate it :
    vvirtual env
    source env/bin/activate
* above activate commad will work only in mac and linux only it will not work on windows.
* Now, install following dependencies :

        pip install django
        pip install djangorestframework
        pip install djangorestframework-simplejwt
        pip install djoser
        pip install psycopg2
        pip install psycopg2-binary

## 4. Create Django project :
    django-admin startproject auth_system
* "auth_system" is project name

## 5. Create app :
    python manage.py startapp accounts
* "accounts" is app name

## 6. In setting.py inside project :
* add following lines in stiings.py file in Installed apps :

        INSTALLED_APPS = [
            ...,

            'rest_framework',
            'djoser',
            'accounts',

            ...,
        ]

## 7. Now, we will create models :
* add the following code inside the models.py of accounts app :

        from django.db import models

        from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


        class UserAccountManager(BaseUserManager):
            def create_user(self, email, name, password=None):
                if not email:
                    raise ValueError('User must have an email address')

                email = self.normalize_email(email)
                user = self.model(email=email, name=name)

                user.set_password(password)
                user.save()

                return user


        class UserAccount(AbstractBaseUser, PermissionsMixin):
            email = models.EmailField(max_length=255, unique=True)
            name = models.CharField(max_length=255)
            is_active = models.BooleanField(default=True)
            is_staff = models.BooleanField(default=False)

            objects = UserAccountManager()

            USERNAME_FIELD = 'email'
            REQUIRED_FIELD = ['name']

            def get_full_name(self):
                return self.name

            def get_sort_name(self):
                return self.name

            def __str__(self):
                return self.email

* add AUTH_USER_MODEL at the end of settings.py file of project auth_system :

        AUTH_USER_MODEL = 'accounts.UserAccount'

## 8. Now we going to setup djoser setup :
* add following urls in the urls.py of project :

       
        from django.contrib import admin
        from django.urls import path, include, re_path
        from django.views.generic import TemplateView

        urlpatterns = [
            path('admin/', admin.site.urls),
            path('auth/', include('djoser.urls')),
            path('auth/', include('djoser.urls.jwt')),

            re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
        ]

* set for email for conferming account and password reset :

        EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
        EMAIL_HOST = 'smtp.gmail.com'
        EMAIL_PORT = 587
        EMAIL_HOST_USER = 'youremail@gmail.com'
        EMAIL_HOST_PASSWORD = 'your password'
        EMAIL_USE_TLS = True

* add build folder to templates so when we do build in react it collect all files here

        'DIRS': [os.path.join(BASE_DIR, 'build')],

* in settings.py file configure static files like this :

        STATIC_URL = 'static/'
        STATICFILES_DIRS = [
            os.path.join(BASE_DIR, 'build/static')
        ]
        STATIC_ROOT = os.path.join(BASE_DIR, 'static')

* setup djoser for api authentication :

        REST_FRAMEWORK = {
            'DEFAULT_AUTHENTICTON_CLASSES': (
                'rest_framework_simplejwt.authentication.JWTAuthentication',
            ),
        }

        SIMPLE_JWT = {
            'AUTH_HEADER_TYPES': ('JWT')
        }

        DJOSER = {
            'LOGIN_FIELD': 'email'
            'USER_CREATE_PASSWORD_RETYPE': True,
            'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
            'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
            'SEND_CONFERMATION_EMAIL' : True,
            'SET_USERNAME_RETYPE': True,
            'SET_PASSWORD_RETYPE': True,
            'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
            'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',
            'ACTIVATION_URL': 'activate/{uid}/{token}',
            'SEND_ACTIVATION_EMAIL': True,
        }

## 9. create serializers.py in accounts app and write below code on this :

    from djoser.serializers import UserCreateSerializer
    from django.contrib.auth import get_user_model

    User = get_user_model()


    class UserCreateSerializer(UserCreateSerializer):
        class Meta(UserCreateSerializer.Meta):
            model = User
            fields = ('id', 'email', 'name', 'password')

* now in settings.py file add new element in DJOSER dictionary :

        'SERIALIZERS': {
                'user_create': 'accounts.serializers.UserCreateSerializer',
                'user': 'accounts.serializers.UserCreateSerializer',
                'user_delete': 'accounts.serializers.UserDeleteSerializer',
            }

## 10. Add the following in settings.py file :
    REST_FRAMEWORK = {
        ...,

        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticated'
        ],
        
        ...,
    }

## 11. Add the following to settings.py file :
    from datetime import timedelta

    SIMPLE_JWT = {
        'AUTH_HEADER_TYPES': ('JWT'),
        'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
        'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    }


# Frontend :->

## 1. Install following packages :
    npm install --save axios
    npm install --save react-router-dom
    npm install --save redux
    npm install --save redux-devtools-extension
    npm install --save react-redux
    npm install --save redux-thunk

## 2. Create following folder in src :
    actions
    assets
    components
    containers
    reducers
    hocs