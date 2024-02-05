import { supabase } from "@/lib/supabase";

export const getAllDons = async () => {
  const dons = await supabase.from("dons").select("*");
  return dons.data;
};
