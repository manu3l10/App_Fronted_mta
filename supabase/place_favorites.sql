-- Favoritos de lugares por usuario.
-- Se usa para hoteles y restaurantes guardados desde itinerarios o recomendaciones.

create table if not exists public.user_place_favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('hotel', 'restaurant')),
  place_key text not null,
  name text not null,
  location text not null,
  image_url text,
  rating numeric(3, 2),
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, place_key)
);

alter table public.user_place_favorites enable row level security;

drop policy if exists "place_favorites_select_own" on public.user_place_favorites;
create policy "place_favorites_select_own"
on public.user_place_favorites
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "place_favorites_insert_own" on public.user_place_favorites;
create policy "place_favorites_insert_own"
on public.user_place_favorites
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "place_favorites_update_own" on public.user_place_favorites;
create policy "place_favorites_update_own"
on public.user_place_favorites
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "place_favorites_delete_own" on public.user_place_favorites;
create policy "place_favorites_delete_own"
on public.user_place_favorites
for delete
to authenticated
using (auth.uid() = user_id);

create or replace function public.touch_user_place_favorites_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_user_place_favorites_updated_at on public.user_place_favorites;
create trigger touch_user_place_favorites_updated_at
before update on public.user_place_favorites
for each row
execute function public.touch_user_place_favorites_updated_at();
