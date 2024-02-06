import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export const getAllDons = async () => {
  const dons = await supabase.from("dons").select("*");
  return dons.data;
};

export const getUserSession = async () => {
  // const supabase = createServerComponentClient({ cookies });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};
