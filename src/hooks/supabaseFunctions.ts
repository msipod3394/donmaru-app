import { supabase } from "@/lib/supabase";
import { DBDons } from "@/types/global_db.types";

export const getAllDons: () => Promise<DBDons[]> = async () => {
  const dons = await supabase
    .from("dons")
    .select("*,  dons_netas( dons( * ) )");

  return dons.data as DBDons[];
};

export const getAllFavoriteDons = async () => {
  const favoritseDons = await supabase.from("favorits").select(`*,  dons( * )`);
  return favoritseDons.data;
};

export const getNotFavoriteDons = async (favoriteid: number[]) => {
  const result = `(${favoriteid.join(",")})`;
  const unFavoritseDons = await supabase
    .from("dons")
    .select(`*`)
    .not("id", "in", result);
  return unFavoritseDons.data;
};

export const getAllNetas: () => Promise<DBDons[]> = async () => {
  const dons = await supabase.from("netas").select("*");

  return dons.data as DBDons[];
};

export const getUserSession = async () => {
  // const supabase = createServerComponentClient({ cookies });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};
