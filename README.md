# Proyecto de Mocks y Mascotas con Express y MongoDB

Este proyecto es una aplicación backend desarrollada con Node.js, Express y MongoDB que implementa funcionalidades para generar datos de prueba (mocks) de usuarios y mascotas, así como endpoints para gestionar estos datos.

## Características Principales

*   Generación de datos de prueba para usuarios y mascotas utilizando `@faker-js/faker`.
*   Endpoints para crear y listar mascotas.
*   Endpoints para registrar, iniciar sesión y listar usuarios (con protección de rutas y roles).
*   Conexión a MongoDB para persistencia de datos.
*   Estructura modular con separación de rutas, modelos, servicios y configuración.

## Requisitos Previos

*   Node.js (se recomienda versión LTS)
*   npm (generalmente viene con Node.js)
*   MongoDB (instalado localmente o una instancia remota accesible)
*   Postman (opcional, para probar los endpoints fácilmente)

## Instalación

1.  **Clonar el repositorio (si aplica):**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

## Configuración

1.  **Crear un archivo `.env`** en la raíz del proyecto. Puedes copiar `.env.example` si existe.
2.  **Configurar las variables de entorno necesarias.** La más importante es la URI de conexión a MongoDB:
    ```env
    PORT=8080
    MONGO_URI=mongodb://localhost:27017/nombreDeTuBaseDeDatosTest
    JWT_SECRET=tuSecretoJWTSuperSecreto
    JWT_COOKIE_NAME=coderCookieToken
    ```
    *   Reemplaza `nombreDeTuBaseDeDatosTest` con el nombre que desees para tu base de datos.
    *   Ajusta `PORT` si es necesario (el valor por defecto en la colección de Postman es 8080).
    *   Proporciona un `JWT_SECRET` seguro.

## Ejecución de la Aplicación

Para iniciar el servidor en modo de desarrollo (con nodemon, si está configurado en `package.json`):
```bash
npm run dev
```
O para iniciar en modo producción (o el script de inicio principal):
```bash
npm start
```
Deberías ver mensajes en la consola indicando que el servidor está corriendo en el puerto especificado y que la conexión a MongoDB fue exitosa.

## Colección de Postman para Pruebas

Para facilitar las pruebas de los endpoints, puedes importar la colección de Postman incluida en este repositorio:

1.  **Descarga o localiza el archivo:** `postman_collection.json` que se encuentra en la raíz del proyecto.
2.  **Abre Postman.**
3.  Haz clic en **Import** (generalmente en la esquina superior izquierda).
4.  Arrastra el archivo `postman_collection.json` a la ventana de importación o selecciónalo usando el explorador de archivos.
5.  Una vez importada, verás la colección "Mocks y Mascotas API".
6.  **Configura la variable de entorno `baseURL` en Postman:**
    *   La colección utiliza una variable `{{baseURL}}`.
    *   Puedes crear un entorno en Postman y definir `baseURL` con el valor `http://localhost:8080` (o el puerto que estés usando). O puedes editar la variable directamente en la colección.

## Endpoints Principales (Resumen)

La colección de Postman incluye solicitudes preconfiguradas para los siguientes endpoints. Reemplaza `{{baseURL}}` con tu URL base (ej. `http://localhost:8080`).

### 1. Mocks
*   `POST {{baseURL}}/api/mocks/generateData` (Body: `{ "users": 5, "pets": 10 }`)
*   `GET {{baseURL}}/api/mocks/mockingpets`
*   `GET {{baseURL}}/api/mocks/mockingusers`

### 2. Mascotas (Pets)
*   `GET {{baseURL}}/api/pets`

### 3. Sesiones
*   `POST {{baseURL}}/api/sessions/register` (Body: `{ "first_name": "Test", ... }`)
*   `POST {{baseURL}}/api/sessions/login` (Body: `{ "email": "...", "password": "..." }`)
*   `GET {{baseURL}}/api/sessions/current` (Requiere cookie de sesión)
*   `POST {{baseURL}}/api/sessions/logout` (Requiere cookie de sesión)

### 4. Usuarios (Users)
*   `GET {{baseURL}}/api/users` (Requiere cookie de sesión de un usuario ADMIN)
*   `GET {{baseURL}}/api/users/:id` (Requiere cookie de sesión)


## Estructura del Proyecto (Resumen)

```
.
├── src/
│   ├── config/
│   ├── dao/
│   │   ├── managers/
│   │   └── models/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── postman_collection.json  <-- Colección de Postman
└── README.md
```

Este README proporciona una guía básica para entender, instalar, configurar y probar el proyecto.
