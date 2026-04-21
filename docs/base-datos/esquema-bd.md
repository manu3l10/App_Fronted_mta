# Esquema de base de datos

## Resumen

La aplicacion usa Supabase como capa de autenticacion, base de datos y almacenamiento. El modelo de datos actual combina:

- tablas SQL versionadas en el repositorio
- una tabla `trips` consumida por el frontend pero no versionada en `supabase/`
- almacenamiento local del navegador para detalles enriquecidos del itinerario

## Entidades confirmadas

### `auth.users`

Gestionada por Supabase Auth.

Uso en la app:

- inicio de sesion con email/password
- login con Google OAuth
- lectura de `user_metadata` para nombre, avatar, bio y foto social

Campos utilizados desde frontend:

- `id`
- `email`
- `user_metadata.full_name`
- `user_metadata.username`
- `user_metadata.bio`
- `user_metadata.avatar_url`
- `user_metadata.picture`

### `public.community_posts`

Tabla base de publicaciones sociales.

Campos confirmados:

- `id`
- `user_id`
- `author_name`
- `author_avatar`
- `location`
- `caption`
- `image_url`
- `created_at`
- `updated_at`

### `public.community_comments`

Comentarios sobre publicaciones.

Campos confirmados:

- `id`
- `post_id`
- `user_id`
- `author_name`
- `author_avatar`
- `content`
- `created_at`
- `updated_at`
- `parent_comment_id`: agregado en `community_social_features.sql` para respuestas anidadas

### `public.community_post_likes`

Likes sobre publicaciones.

Campos confirmados:

- `post_id`
- `user_id`
- `created_at`

Clave primaria:

- `(post_id, user_id)`

### `public.community_saved_posts`

Publicaciones guardadas por usuario.

Campos confirmados:

- `post_id`
- `user_id`
- `created_at`

Clave primaria:

- `(post_id, user_id)`

### `public.community_comment_likes`

Likes sobre comentarios.

Campos confirmados:

- `comment_id`
- `user_id`
- `created_at`

Clave primaria:

- `(comment_id, user_id)`

### `public.community_notifications`

Notificaciones para likes y respuestas.

Campos confirmados:

- `id`
- `recipient_id`
- `actor_id`
- `actor_name`
- `actor_avatar`
- `type`
- `post_id`
- `comment_id`
- `message`
- `read_at`
- `created_at`

Valores permitidos en `type`:

- `post_like`
- `comment_like`
- `comment_reply`

### `public.user_place_favorites`

Favoritos de lugares guardados por usuario.

Campos confirmados:

- `id`
- `user_id`
- `item_type`
- `place_key`
- `name`
- `location`
- `image_url`
- `rating`
- `description`
- `metadata`
- `created_at`
- `updated_at`

Valores permitidos en `item_type`:

- `hotel`
- `restaurant`

### `storage.buckets` / bucket `avatars`

Storage publico para fotos de perfil.

Uso actual:

- subir avatar desde Perfil
- leer avatar publico en perfil, menu lateral, posts y comentarios
- eliminar avatar del mismo usuario

## Entidad inferida: `public.trips`

El frontend consulta y escribe esta tabla desde:

- `src/app/components/AIChat.tsx`
- `src/app/pages/Itineraries.tsx`
- `src/app/pages/Calendar.tsx`
- `src/app/pages/Profile.tsx`
- `src/app/pages/SupabaseTest.tsx`

Campos minimos inferidos:

- `id`
- `user_id`
- `destination`
- `start_date`
- `end_date`
- `budget`
- `created_at`

Observaciones:

- `id` no tiene tipo confirmado en el repo.
- `created_at` debe existir, porque hay consultas con `order("created_at")`.
- `user_id` se usa para asociar viajes al usuario autenticado.

## Relaciones principales

- `auth.users.id -> community_posts.user_id`
- `auth.users.id -> community_comments.user_id`
- `auth.users.id -> community_post_likes.user_id`
- `auth.users.id -> community_saved_posts.user_id`
- `auth.users.id -> community_comment_likes.user_id`
- `auth.users.id -> community_notifications.recipient_id`
- `auth.users.id -> community_notifications.actor_id`
- `auth.users.id -> user_place_favorites.user_id`
- `community_posts.id -> community_comments.post_id`
- `community_posts.id -> community_post_likes.post_id`
- `community_posts.id -> community_saved_posts.post_id`
- `community_posts.id -> community_notifications.post_id`
- `community_comments.id -> community_comment_likes.comment_id`
- `community_comments.id -> community_notifications.comment_id`
- `community_comments.id -> community_comments.parent_comment_id`

## Persistencia fuera de la base de datos

### `localStorage`

El proyecto guarda detalles de itinerario que hoy no viven en Supabase:

- vuelos seleccionados
- hotel asociado al viaje
- ultimo viaje editado desde el chat
- idioma de interfaz

Claves detectadas:

- `mta_itinerary_details_v1`
- `mta_last_trip_id_v1`
- `app_lang`

## Riesgos actuales

- La definicion de `trips` no esta versionada en el repositorio.
- Los detalles de vuelos y hotel pueden perderse si el usuario limpia el navegador.
- El frontend depende directamente de la `anon key` de Supabase, por lo que la seguridad recae en RLS y en la configuracion de dominios.
