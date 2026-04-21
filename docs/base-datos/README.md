# Base de datos

Esta seccion resume el estado actual de persistencia del proyecto y separa lo que esta confirmado en el repositorio de lo que fue inferido desde el frontend.

## Confirmado en el repo

- Scripts SQL para comunidad, favoritos, notificaciones y avatares.
- Uso de Supabase Auth para sesiones y perfiles.
- Uso de Supabase Storage para el bucket `avatars`.

## Inferido desde el frontend

- Existe una tabla `public.trips` consumida por itinerarios, calendario, perfil, pruebas de Supabase y el asistente de viaje.
- El tipo exacto de `id` en `trips` no se puede confirmar desde el repo, porque el frontend soporta `string | number`.

## Persistencia local

- `mta_itinerary_details_v1`: vuelos y hotel asociados a un viaje.
- `mta_last_trip_id_v1`: ultimo viaje intervenido desde el chat.
- `app_lang`: idioma preferido del usuario.

## Archivos relacionados

- [esquema-bd.md](esquema-bd.md)
- [migraciones.md](migraciones.md)
- [../../supabase/community_posts.sql](../../supabase/community_posts.sql)
- [../../supabase/community_social_features.sql](../../supabase/community_social_features.sql)
- [../../supabase/security_hardening.sql](../../supabase/security_hardening.sql)
- [../../supabase/place_favorites.sql](../../supabase/place_favorites.sql)
- [../../supabase/profile_avatars.sql](../../supabase/profile_avatars.sql)
