-- Community backend schema for MTA
-- Run in Supabase SQL Editor

create extension if not exists pgcrypto;

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  author_avatar text not null,
  location text not null,
  caption text not null,
  image_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  author_avatar text not null,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_post_likes (
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create index if not exists idx_community_posts_created_at on public.community_posts(created_at desc);
create index if not exists idx_community_comments_post_id_created_at on public.community_comments(post_id, created_at asc);
create index if not exists idx_community_post_likes_post_id on public.community_post_likes(post_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_community_posts_set_updated_at on public.community_posts;
create trigger trg_community_posts_set_updated_at
before update on public.community_posts
for each row execute function public.set_updated_at();

drop trigger if exists trg_community_comments_set_updated_at on public.community_comments;
create trigger trg_community_comments_set_updated_at
before update on public.community_comments
for each row execute function public.set_updated_at();

alter table public.community_posts enable row level security;
alter table public.community_comments enable row level security;
alter table public.community_post_likes enable row level security;

-- POSTS

drop policy if exists "community_posts_select_authenticated" on public.community_posts;
create policy "community_posts_select_authenticated"
  on public.community_posts
  for select
  to authenticated
  using (true);

drop policy if exists "community_posts_insert_own" on public.community_posts;
create policy "community_posts_insert_own"
  on public.community_posts
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "community_posts_update_own" on public.community_posts;
create policy "community_posts_update_own"
  on public.community_posts
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "community_posts_delete_own" on public.community_posts;
create policy "community_posts_delete_own"
  on public.community_posts
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- COMMENTS

drop policy if exists "community_comments_select_authenticated" on public.community_comments;
create policy "community_comments_select_authenticated"
  on public.community_comments
  for select
  to authenticated
  using (true);

drop policy if exists "community_comments_insert_own" on public.community_comments;
create policy "community_comments_insert_own"
  on public.community_comments
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "community_comments_update_own" on public.community_comments;
create policy "community_comments_update_own"
  on public.community_comments
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "community_comments_delete_own" on public.community_comments;
create policy "community_comments_delete_own"
  on public.community_comments
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- LIKES

drop policy if exists "community_likes_select_authenticated" on public.community_post_likes;
create policy "community_likes_select_authenticated"
  on public.community_post_likes
  for select
  to authenticated
  using (true);

drop policy if exists "community_likes_insert_own" on public.community_post_likes;
create policy "community_likes_insert_own"
  on public.community_post_likes
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "community_likes_delete_own" on public.community_post_likes;
create policy "community_likes_delete_own"
  on public.community_post_likes
  for delete
  to authenticated
  using (auth.uid() = user_id);
