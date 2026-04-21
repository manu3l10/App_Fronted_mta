# Documentacion del proyecto

Esta carpeta organiza la documentacion funcional, tecnica y visual de My Travel Assistance.

## Indice

- [Base de datos](base-datos/README.md)
- [Esquema de base de datos](base-datos/esquema-bd.md)
- [Migraciones](base-datos/migraciones.md)
- [Modelo de negocio](negocio/modelo-de-negocio.md)
- [Flujos de usuario](negocio/flujos-de-usuario.md)
- [Moodboard y branding](branding/moodboard.md)
- [Stack y arquitectura](arquitectura/stack.md)

## Alcance

La documentacion fue redactada a partir del codigo actual del repositorio, los archivos SQL en `supabase/` y los activos visuales existentes en `public/icons/`.

## Observaciones importantes

- La tabla `trips` se usa en varias pantallas, pero no tiene una migracion versionada dentro del repo.
- Los detalles extendidos de vuelos y hotel se almacenan en `localStorage`, no en Supabase.
- La identidad visual actual ya tiene logo e iconografia base en `public/icons/`.
