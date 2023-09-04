import { createClient, AuthFlowType } from "@supabase/supabase-js";

const PKCE: AuthFlowType = 'pkce'
const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    debug: true,
  },
  global: {
    headers: { "x-my-custom-header": "my-app-name" },
  },
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "",
  options
);
