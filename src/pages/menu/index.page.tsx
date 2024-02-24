import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Text, Stack, VStack, HStack, Image } from "@chakra-ui/react";
import { DBFavorits } from "@/types/global_db.types";
import { getAllDons, getAllFavoriteDons } from "@/hooks/supabaseFunctions";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { MenuCard } from "./MenuCard";

export default function PageMenu() {
  // ローディング
  const [loading, setLoading] = useState(false);

  // 読み込み時、donsテーブル呼び出し
  const [dons, setDons] = useState<any>([]);
  const [fliterDons, setFliterDons] = useState<any>([]);

  // お気に入りに追加した丼
  const [favoriteDonsID, setFavoriteDonsID] = useState([]);

  useEffect(() => {
    // 全丼データの取得
    const getDons = async () => {
      // 全ての丼データを取得
      const dons = await getAllDons();
      setDons(dons);
      // console.log("dons", dons);
    };
    getDons();

    // お気に入りの取得
    const getFavoriteDons = async () => {
      try {
        // ローディング
        setLoading(true);

        // お気に入りテーブルからユーザーのdonsを取得
        const allFavoriteDons: DBFavorits[] | null = await getAllFavoriteDons();

        // ↑のデータ取得後の、配列操作・ステート更新
        if (allFavoriteDons !== null) {
          const fetchDataOnlyDons = allFavoriteDons.map((item) => item.dons);
          const favoriteIds = fetchDataOnlyDons.map((item) => item.id);
          setFavoriteDonsID(favoriteIds);
        }
      } catch (error) {
        console.error("エラーが発生しました", error);
      } finally {
        setLoading(false);
      }
    };
    getFavoriteDons();
  }, []);

  useEffect(() => {
    if (dons) {
      // dons取得後、favoriteプロパティを付与
      const filteredDons = dons.map((don) => {
        if (favoriteDonsID.includes(don.id)) {
          return { ...don, favorite: true };
        } else {
          return { ...don, favorite: false };
        }
      });
      setFliterDons(filteredDons);
    }
  }, [dons, favoriteDonsID]);

  return (
    <DefaultLayout pageTitle="お品書き">
      <VStack minW="100%" spacing={2} mt="2rem" mb="2rem" minH="500px">
        {fliterDons && <MenuCard dons={fliterDons} />}
      </VStack>
    </DefaultLayout>
  );
}
