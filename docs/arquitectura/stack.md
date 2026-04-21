# Stack y arquitectura

## Stack actual

### Frontend

- Vite 6
- React 18
- TypeScript
- React Router 7

### UI y experiencia

- Tailwind CSS 4
- Motion
- Radix UI
- Lucide React
- algunos componentes de Material UI

### Backend y servicios

- Supabase Auth
- Supabase Database
- Supabase Storage

### Despliegue

- Vercel
- configuracion de headers y rewrites en `vercel.json`

### PWA

- `public/manifest.webmanifest`
- iconos en `public/icons/`
- modo `standalone`
- pantalla de carga definida en `index.html`

## Estructura logica del codigo

### Entrada

- `src/main.tsx`: monta `AuthProvider`, `LanguageProvider` y la app
- `src/app/App.tsx`: renderiza el router principal
- `src/app/routes.tsx`: define las rutas de la aplicacion

### Capas

- `src/app/pages/`: pantallas principales
- `src/app/components/`: componentes visuales y funcionales reutilizables
- `src/contexts/`: estado transversal como autenticacion e idioma
- `src/lib/`: integracion con Supabase y logica auxiliar
- `src/styles/`: estilos globales, tema y Tailwind

## Rutas principales

- `/`
- `/community`
- `/calendar`
- `/itineraries`
- `/favorites`
- `/profile`
- `/settings`
- `/test-supabase`

## Arquitectura de datos

Patron actual:

- cliente React
- conexion directa a Supabase desde el frontend
- reglas de seguridad delegadas a RLS
- almacenamiento local para detalles de itinerario no persistidos en base de datos

## Integraciones clave

### Supabase Auth

- sesion inicial con `getSession()`
- escucha de cambios con `onAuthStateChange()`
- login email/password
- login social con Google

### Supabase Database

Tablas usadas desde frontend:

- `trips`
- `community_posts`
- `community_comments`
- `community_post_likes`
- `community_saved_posts`
- `community_comment_likes`
- `community_notifications`
- `user_place_favorites`

### Supabase Storage

- bucket `avatars` para fotos de perfil

## Seguridad

- CSP, HSTS y otros headers en Vercel
- RLS en comunidad, favoritos y notificaciones
- bucket de avatares con politicas por carpeta de usuario

## Limitaciones tecnicas actuales

- la tabla `trips` no esta versionada en `supabase/`
- no existe backend intermedio; el cliente habla directo con Supabase
- parte del detalle del itinerario vive solo en `localStorage`
- la tipografia de marca no esta consolidada como sistema propio

## Resumen ejecutivo

La arquitectura actual es la de un frontend SPA/PWA apoyado en Supabase como BaaS. Es adecuada para un MVP rapido, movil y colaborativo, con el principal pendiente de formalizar por completo el esquema de viajes y mover a backend o base de datos aquello que hoy depende del navegador.
