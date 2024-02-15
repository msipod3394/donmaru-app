import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { DBDons, DBFavorits } from "@/types/global_db.types";

export const getAllDons: () => Promise<DBDons[]> = async () => {
  const dons = await supabase.from("dons").select("*");

  return dons.data as DBDons[];
};

export const getAllFavoriteDons = async () => {
  const favoritseDons = await supabase.from("favorits").select(`*,  dons( * )`);
  console.log(favoritseDons.data);
  return favoritseDons.data;
};

export const getUnFavoriteDons = async (favoriteid: number[]) => {
  const result = `(${favoriteid.join(",")})`;
  const unFavoritseDons = await supabase
    .from("dons")
    .select(`*`)
    .not("id", "in", result);
  return unFavoritseDons.data;
};

export const getUserSession = async () => {
  // const supabase = createServerComponentClient({ cookies });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};
