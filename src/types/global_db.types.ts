import { Database } from "@/types/database.types";

export type DBDislikes = Database["public"]["Tables"]["dislikes"]["Row"];
// export type DBDons = Database["public"]["Tables"]["dons"]["Row"];
export type DBDons = {
  created_at: string;
  id: number;
  image: string;
  title: string;
  updated_at: string;
};
export type DBDons_netas = Database["public"]["Tables"]["dons_netas"]["Row"];
export type DBFavorits = Database["public"]["Tables"]["favorits"]["Row"];
export type DBNetas = Database["public"]["Tables"]["netas"]["Row"];
export type DBOrders = Database["public"]["Tables"]["orders"]["Row"];
export type DBUser = Database["public"]["Tables"]["users"]["Row"];
