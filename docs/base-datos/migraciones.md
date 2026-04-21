# Migraciones

## Orden recomendado de ejecucion

1. `supabase/community_posts.sql`
2. `supabase/community_social_features.sql`
3. `supabase/security_hardening.sql`
4. `supabase/place_favorites.sql`
5. `supabase/profile_avatars.sql`

## Descripcion por archivo

### `community_posts.sql`

Crea la base del modulo social:

- `community_posts`
- `community_comments`
- `community_post_likes`
- indices
- triggers de `updated_at`
- politicas RLS iniciales

### `community_social_features.sql`

Extiende el modulo social con:

- respuestas a comentarios (`parent_comment_id`)
- publicaciones guardadas
- likes de comentarios
- notificaciones
- indices y politicas RLS adicionales

### `security_hardening.sql`

Refuerza el esquema social con:

- validacion de que una respuesta apunte al mismo post que su comentario padre
- indice unico para evitar duplicados de ciertas notificaciones no leidas
- RLS mas estricta para guardados, likes de comentarios y notificaciones

### `place_favorites.sql`

Crea `user_place_favorites` para hoteles y restaurantes guardados por usuario, con:

- `unique (user_id, place_key)`
- trigger para `updated_at`
- politicas RLS por propietario

### `profile_avatars.sql`

Prepara el bucket `avatars` en Supabase Storage y define permisos para:

- lectura publica
- carga en carpeta propia del usuario
- actualizacion y eliminacion solo en carpeta propia

## Pendiente importante

La tabla `trips` no tiene migracion versionada en este repo, aunque el frontend la usa de forma intensiva.

Impacto:

- no se puede levantar el proyecto completo desde cero solo con los SQL actuales
- el esquema exacto de `trips` depende del entorno ya creado en Supabase

Campos minimos esperados por frontend:

- `id`
- `user_id`
- `destination`
- `start_date`
- `end_date`
- `budget`
- `created_at`

## Recomendacion tecnica

Agregar una migracion futura para `trips` y dejarla junto a los demas scripts de Supabase, idealmente con:

- clave primaria
- referencia a `auth.users(id)` por `user_id`
- indice por `user_id`
- indice por `created_at`
- politicas RLS para que cada usuario solo vea y modifique sus viajes

## Checklist de provisionamiento

- Ejecutar los SQL en el orden indicado.
- Configurar Auth y Google OAuth segun [../../SETUP_GOOGLE_AUTH.md](../../SETUP_GOOGLE_AUTH.md).
- Registrar URLs autorizadas en Supabase Auth.
- Verificar que exista la tabla `trips`.
- Verificar que exista el bucket `avatars`.
- Probar flujo completo: login, guardar viaje, guardar hotel, guardar favoritos, publicar en comunidad.
