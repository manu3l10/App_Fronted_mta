# Flujos de usuario

## 1. Onboarding y autenticacion

1. El usuario abre la PWA y llega a `WelcomeScreen`.
2. Puede registrarse o iniciar sesion con email y password.
3. Tambien puede autenticarse con Google OAuth.
4. Si la sesion queda activa, entra a la pantalla principal.

Resultado:

- el usuario autenticado ve la app completa
- el usuario sin sesion permanece en la pantalla de bienvenida

## 2. Planeacion desde el asistente

1. El usuario entra a la pantalla principal.
2. Interactua con el chat para pedir un destino o propuesta.
3. El sistema muestra una propuesta con destino, fechas, presupuesto y detalles sugeridos.
4. Si el usuario acepta, se crea un registro en `trips`.
5. Los detalles extendidos del viaje se guardan en `localStorage`.

Resultado:

- nace un itinerario visible en `Mis itinerarios`
- el viaje tambien impacta `Mi Calendario`

## 3. Agregar hotel a un viaje ya creado

1. Despues de guardar el viaje, el chat ofrece agendar hotel.
2. El usuario selecciona una opcion.
3. El hotel se asocia al ultimo viaje intervenido.
4. La estadia queda guardada en `localStorage`.

Resultado:

- el calendario puede marcar dias con hotel
- el itinerario muestra detalles adicionales

## 4. Consultar y administrar itinerarios

1. El usuario abre `Mis itinerarios`.
2. Ve la lista de viajes guardados.
3. Puede revisar fechas, presupuesto y detalles.
4. Puede eliminar un viaje.
5. Puede pedir cambios de vuelos u hotel reenviando contexto al chat.

Resultado:

- el viaje se mantiene como unidad central de organizacion

## 5. Ver el calendario

1. El usuario entra a `Mi Calendario`.
2. Ve sus viajes distribuidos por fecha.
3. Puede abrir detalles por viaje o por dia.
4. Si un viaje tiene vuelos u hotel, el calendario lo resalta.

Resultado:

- el usuario visualiza rapidamente su agenda de viaje

## 6. Guardar favoritos

### Hoteles y restaurantes

1. Desde itinerarios, el usuario guarda un hotel o restaurante.
2. Se crea o elimina un registro en `user_place_favorites`.
3. La seccion `Favoritos` refleja el cambio.

### Publicaciones

1. Desde comunidad, el usuario guarda una publicacion.
2. Se crea o elimina un registro en `community_saved_posts`.
3. La publicacion aparece en la pestaña de guardados.

## 7. Interaccion en comunidad

1. El usuario entra a `Comunidad`.
2. Carga el feed de publicaciones.
3. Puede crear, editar o eliminar sus propios posts.
4. Puede comentar, responder, dar like y guardar publicaciones.
5. Las interacciones relevantes crean notificaciones para otros usuarios.

Resultado:

- aumenta la retencion por contenido generado por usuarios

## 8. Perfil y configuracion

1. El usuario abre `Perfil`.
2. Puede editar nombre, biografia y avatar.
3. El avatar se sube al bucket `avatars`.
4. Puede abrir `Configuracion` y cambiar idioma o preferencias basicas.

Resultado:

- la identidad del usuario se reutiliza en comunidad y navegacion

## Dependencias tecnicas por flujo

- Autenticacion: Supabase Auth
- Viajes: tabla `trips`
- Comunidad: tablas `community_*`
- Favoritos de lugares: `user_place_favorites`
- Avatares: Supabase Storage bucket `avatars`
- Detalles extendidos del viaje: `localStorage`
