-- Community notification preferences for MTA.
-- Lets users disable community notifications while keeping the preference in Supabase.

create table if not exists public.community_notification_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  community_notifications_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.community_notification_settings enable row level security;

drop policy if exists "community_notification_settings_select_own" on public.community_notification_settings;
create policy "community_notification_settings_select_own"
  on public.community_notification_settings
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "community_notification_settings_insert_own" on public.community_notification_settings;
create policy "community_notification_settings_insert_own"
  on public.community_notification_settings
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "community_notification_settings_update_own" on public.community_notification_settings;
create policy "community_notification_settings_update_own"
  on public.community_notification_settings
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.are_community_notifications_enabled(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (
      select community_notifications_enabled
      from public.community_notification_settings
      where user_id = p_user_id
    ),
    true
  );
$$;

grant execute on function public.are_community_notifications_enabled(uuid) to authenticated;

alter table public.community_notifications
  drop constraint if exists community_notifications_type_check;

alter table public.community_notifications
  add constraint community_notifications_type_check
  check (type in ('post_like', 'post_comment', 'comment_like', 'comment_reply'));

drop policy if exists "community_notifications_insert_actor" on public.community_notifications;
create policy "community_notifications_insert_actor"
  on public.community_notifications
  for insert
  to authenticated
  with check (
    auth.uid() = actor_id
    and recipient_id <> actor_id
    and public.are_community_notifications_enabled(recipient_id)
    and (
      (
        type = 'post_like'
        and post_id is not null
        and comment_id is null
        and exists (
          select 1
          from public.community_posts p
          where p.id = post_id
            and p.user_id = recipient_id
        )
        and exists (
          select 1
          from public.community_post_likes l
          where l.post_id = community_notifications.post_id
            and l.user_id = actor_id
        )
      )
      or
      (
        type = 'post_comment'
        and post_id is not null
        and comment_id is not null
        and exists (
          select 1
          from public.community_comments c
          join public.community_posts p
            on p.id = c.post_id
          where c.id = community_notifications.comment_id
            and c.post_id = community_notifications.post_id
            and c.user_id = actor_id
            and p.user_id = recipient_id
            and c.parent_comment_id is null
        )
      )
      or
      (
        type = 'comment_reply'
        and post_id is not null
        and comment_id is not null
        and exists (
          select 1
          from public.community_comments reply
          join public.community_comments parent
            on parent.id = reply.parent_comment_id
          where reply.id = community_notifications.comment_id
            and reply.post_id = community_notifications.post_id
            and reply.user_id = actor_id
            and parent.user_id = recipient_id
        )
      )
      or
      (
        type = 'comment_like'
        and comment_id is not null
        and exists (
          select 1
          from public.community_comments c
          join public.community_comment_likes l
            on l.comment_id = c.id
          where c.id = community_notifications.comment_id
            and c.user_id = recipient_id
            and l.user_id = actor_id
        )
      )
    )
  );
