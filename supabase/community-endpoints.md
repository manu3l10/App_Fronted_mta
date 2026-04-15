# Community Endpoints (Supabase)

El frontend usa `src/lib/communityApi.ts` para operar sobre:
- `public.community_posts`
- `public.community_comments`
- `public.community_post_likes`

## Operaciones implementadas

1. Feed
- `listCommunityPosts()`
- `listCommunityCommentsByPostIds(postIds)`
- `listCommunityLikesByPostIds(postIds)`

2. Publicaciones
- `createCommunityPost({ location, caption, imageUrl })`
- `updateCommunityPost(postId, { location, caption, imageUrl })`
- `deleteCommunityPost(postId)`

3. Comentarios
- `createCommunityComment({ postId, content })`

4. Likes
- `toggleCommunityLike(postId)`

## Seguridad (RLS)

- Lectura de feed/comentarios/likes: usuarios autenticados.
- Insert/update/delete de publicaciones: solo autor.
- Insert/update/delete de comentarios: solo autor.
- Insert/delete de likes: solo dueño de ese like (`user_id = auth.uid()`).

## Primer despliegue backend

1. Ejecutar SQL en Supabase SQL Editor:
- `supabase/community_posts.sql`

2. Validación funcional:
- Cuenta A crea post.
- Cuenta B ve post y comenta/likea.
- Cuenta A y B ven el conteo de likes/comentarios actualizado al recargar.
- Solo autor puede editar/eliminar su publicación.
