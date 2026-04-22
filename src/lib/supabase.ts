import { createClient } from "@supabase/supabase-js";

const REMEMBER_ACCOUNT_KEY = "mta.rememberAccount";

// Fallback para conservar el entorno actual mientras el proyecto adopta .env.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://wxrxagmxrmpfdltrclld.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4cnhhZ214cm1wZmRsdHJjbGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MDAyNjMsImV4cCI6MjA4OTk3NjI2M30.LR3tl_7ud3uuTi5Acn2V4k4NBTbpGPR9nH4QDnGGJdY";

const canUseBrowserStorage = () => typeof window !== "undefined" && !!window.localStorage && !!window.sessionStorage;

export const getRememberAccountPreference = () => {
  if (!canUseBrowserStorage()) return true;

  return window.localStorage.getItem(REMEMBER_ACCOUNT_KEY) !== "false";
};

export const setRememberAccountPreference = (rememberAccount: boolean) => {
  if (!canUseBrowserStorage()) return;

  window.localStorage.setItem(REMEMBER_ACCOUNT_KEY, String(rememberAccount));
};

const authStorage = {
  getItem: (key: string) => {
    if (!canUseBrowserStorage()) return null;

    return window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (!canUseBrowserStorage()) return;

    const rememberAccount = getRememberAccountPreference();
    const primaryStorage = rememberAccount ? window.localStorage : window.sessionStorage;
    const secondaryStorage = rememberAccount ? window.sessionStorage : window.localStorage;

    secondaryStorage.removeItem(key);
    primaryStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (!canUseBrowserStorage()) return;

    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true,
    storage: authStorage,
  },
});
