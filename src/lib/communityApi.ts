import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export interface CommunityPostRecord {
  id: string;
  user_id: string;
  author_name: string;
  author_avatar: string;
  location: string;
  caption: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityCommentRecord {
  id: string;
  post_id: string;
  user_id: string;
  author_name: string;
  author_avatar: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityLikeRecord {
  post_id: string;
  user_id: string;
  created_at: string;
}

const buildDefaultAvatar = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;

const buildAuthorName = (email?: string | null) => {
  if (!email) return 'viajero';
  const left = email.split('@')[0] ?? 'viajero';
  return left.replace(/[^a-zA-Z0-9_]/g, '_');
};

const getCurrentUser = async (): Promise<User | null> => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user ?? null;
};

const getCurrentUserOrThrow = async (): Promise<User> => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Debes iniciar sesión para usar esta acción.');
  }
  return user;
};

const getAuthorProfile = (user: User) => {
  const metadata = user.user_metadata ?? {};
  const authorName =
    metadata.username ??
    metadata.full_name ??
    metadata.name ??
    buildAuthorName(user.email);

  const authorAvatar =
    metadata.avatar_url ??
    metadata.picture ??
    buildDefaultAvatar(String(authorName));

  return {
    authorName: String(authorName),
    authorAvatar: String(authorAvatar),
  };
};

export const listCommunityPosts = async (): Promise<CommunityPostRecord[]> => {
  const { data, error } = await supabase
    .from('community_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as CommunityPostRecord[];
};

export const listCommunityCommentsByPostIds = async (
  postIds: string[]
): Promise<CommunityCommentRecord[]> => {
  if (postIds.length === 0) return [];

  const { data, error } = await supabase
    .from('community_comments')
    .select('*')
    .in('post_id', postIds)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data ?? []) as CommunityCommentRecord[];
};

export const listCommunityLikesByPostIds = async (
  postIds: string[]
): Promise<CommunityLikeRecord[]> => {
  if (postIds.length === 0) return [];

  const { data, error } = await supabase
    .from('community_post_likes')
    .select('post_id,user_id,created_at')
    .in('post_id', postIds);

  if (error) throw error;
  return (data ?? []) as CommunityLikeRecord[];
};

export const createCommunityPost = async (payload: {
  location: string;
  caption: string;
  imageUrl: string;
}): Promise<CommunityPostRecord> => {
  const user = await getCurrentUserOrThrow();
  const { authorName, authorAvatar } = getAuthorProfile(user);

  const { data, error } = await supabase
    .from('community_posts')
    .insert({
      user_id: user.id,
      author_name: authorName,
      author_avatar: authorAvatar,
      location: payload.location,
      caption: payload.caption,
      image_url: payload.imageUrl,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data as CommunityPostRecord;
};

export const createCommunityComment = async (payload: {
  postId: string;
  content: string;
}): Promise<CommunityCommentRecord> => {
  const user = await getCurrentUserOrThrow();
  const { authorName, authorAvatar } = getAuthorProfile(user);

  const { data, error } = await supabase
    .from('community_comments')
    .insert({
      post_id: payload.postId,
      user_id: user.id,
      author_name: authorName,
      author_avatar: authorAvatar,
      content: payload.content,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data as CommunityCommentRecord;
};

export const toggleCommunityLike = async (
  postId: string
): Promise<{ liked: boolean }> => {
  const user = await getCurrentUserOrThrow();

  const { data: existingLike, error: existingLikeError } = await supabase
    .from('community_post_likes')
    .select('post_id,user_id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existingLikeError) throw existingLikeError;

  if (existingLike) {
    const { error } = await supabase
      .from('community_post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.id);

    if (error) throw error;
    return { liked: false };
  }

  const { error } = await supabase
    .from('community_post_likes')
    .insert({
      post_id: postId,
      user_id: user.id,
    });

  if (error) throw error;
  return { liked: true };
};

export const updateCommunityPost = async (
  postId: string,
  payload: { location: string; caption: string; imageUrl: string }
): Promise<CommunityPostRecord> => {
  const { data, error } = await supabase
    .from('community_posts')
    .update({
      location: payload.location,
      caption: payload.caption,
      image_url: payload.imageUrl,
    })
    .eq('id', postId)
    .select('*')
    .single();

  if (error) throw error;
  return data as CommunityPostRecord;
};

export const deleteCommunityPost = async (postId: string): Promise<void> => {
  const { error } = await supabase
    .from('community_posts')
    .delete()
    .eq('id', postId);

  if (error) throw error;
};

export const getCurrentUserId = async (): Promise<string | null> => {
  const user = await getCurrentUser();
  return user?.id ?? null;
};
