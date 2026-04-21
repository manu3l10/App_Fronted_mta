import { supabase } from "./supabase";

export type PlaceFavoriteType = "hotel" | "restaurant";

export interface PlaceFavoriteRecord {
  id: string;
  user_id: string;
  item_type: PlaceFavoriteType;
  place_key: string;
  name: string;
  location: string;
  image_url: string | null;
  rating: number | null;
  description: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface PlaceFavoriteInput {
  itemType: PlaceFavoriteType;
  name: string;
  location: string;
  imageUrl?: string | null;
  rating?: number | null;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

const normalizeKeyPart = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const buildPlaceKey = (itemType: PlaceFavoriteType, name: string, location: string) =>
  `${itemType}:${normalizeKeyPart(name)}:${normalizeKeyPart(location)}`;

const getCurrentUserId = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user) throw new Error("Debes iniciar sesión para guardar favoritos.");
  return data.user.id;
};

export const listPlaceFavorites = async (itemTypes?: PlaceFavoriteType[]) => {
  await getCurrentUserId();

  let query = supabase
    .from("user_place_favorites")
    .select("*")
    .order("created_at", { ascending: false });

  if (itemTypes?.length) {
    query = query.in("item_type", itemTypes);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as PlaceFavoriteRecord[];
};

export const addPlaceFavorite = async (input: PlaceFavoriteInput) => {
  const userId = await getCurrentUserId();
  const placeKey = buildPlaceKey(input.itemType, input.name, input.location);

  const { data, error } = await supabase
    .from("user_place_favorites")
    .upsert(
      {
        user_id: userId,
        item_type: input.itemType,
        place_key: placeKey,
        name: input.name,
        location: input.location,
        image_url: input.imageUrl ?? null,
        rating: input.rating ?? null,
        description: input.description ?? null,
        metadata: input.metadata ?? {},
      },
      { onConflict: "user_id,place_key" }
    )
    .select("*")
    .single();

  if (error) throw error;
  return data as PlaceFavoriteRecord;
};

export const removePlaceFavoriteByKey = async (placeKey: string) => {
  await getCurrentUserId();

  const { error } = await supabase
    .from("user_place_favorites")
    .delete()
    .eq("place_key", placeKey);

  if (error) throw error;
};

export const togglePlaceFavorite = async (input: PlaceFavoriteInput) => {
  await getCurrentUserId();
  const placeKey = buildPlaceKey(input.itemType, input.name, input.location);

  const { data: existing, error: existingError } = await supabase
    .from("user_place_favorites")
    .select("id")
    .eq("place_key", placeKey)
    .maybeSingle();

  if (existingError) throw existingError;

  if (existing) {
    await removePlaceFavoriteByKey(placeKey);
    return { favorited: false, placeKey };
  }

  await addPlaceFavorite(input);
  return { favorited: true, placeKey };
};
