import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import { DBDons, DBFavorits, DBOrders } from "@/types/global_db.types";
import {
  getAllDons,
  getAllFavoriteDons,
  getAllOrder,
} from "@/hooks/supabaseFunctions";
import { useLoginUser } from "@/provider/LoginUserContext";
import { convertFormattedDate } from "@/hooks/convertFormattedDate";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { MenuCard } from "./MenuCard";
import { useFullPropertyDons } from "@/provider/FullPropertyDonsContext";
// import { useFullPropertyDons } from "@/provider/FullPropertyDonsContext";

export default function PageMenu() {
  // ローディング
  const [loading, setLoading] = useState(false);

  // ログイン状況
  const { loginUser } = useLoginUser();

  // 全てのプロパティが揃ったデータ
  const { fullPropertyDons, setFullDons } = useFullPropertyDons();

  // 全ての丼
  const [dons, setDons] = useState([]);

  // お気に入りに追加した丼
  const [favoriteDonsIDs, setFavoriteDonsIDs] = useState([]);

  // 注文履歴
  const [order, setOrder] = useState([]);

  // 全データが整った状態
  const [allData, setAllData] = useState({});

  // 初回読み込み時
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 全ての丼データを取得
        const [allDons, allFavoriteDons, allOrder] = await Promise.all([
          getAllDons(),
          getAllFavoriteDons(),
          getAllOrder(loginUser.id),
        ]);

        setDons(allDons);

        // お気に入り丼の取得
        if (allFavoriteDons !== null) {
          const fetchFavoriteDons = allFavoriteDons.map((item) => item.dons);
          const favoriteIds = fetchFavoriteDons.map((item) => item.id);
          // setFavoriteDons(fetchFavoriteDons);
          setFavoriteDonsIDs(favoriteIds);
        }

        // 注文履歴
        // カウント数を取得・更新
        const donIdCounts = {};
        allOrder.forEach((order) => {
          const donId = order.don_id;
          donIdCounts[donId] = (donIdCounts[donId] || 0) + 1;
        });

        const allOrderAddCount = allOrder.map((order) => {
          const donId = order.don_id;
          const count = donIdCounts[donId];
          return { ...order, count };
        });

        // 最新の注文データだけにソート
        const latestOrdersMap = new Map();
        allOrderAddCount.forEach((order) => {
          const existingOrder = latestOrdersMap.get(order.don_id);
          const formattedDate = convertFormattedDate(order.updated_at);
          order.updated_at = formattedDate;
          if (
            !existingOrder ||
            new Date(order.updated_at) > new Date(existingOrder.updated_at)
          ) {
            latestOrdersMap.set(order.don_id, order);
          }
        });

        const latestOrders = Array.from(latestOrdersMap.values());
        console.log("latestOrders", latestOrders);
        setOrder(latestOrders);
      } catch (error) {
        console.error("エラーが発生しました", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // dons取得後、各プロパティを付与
  useEffect(() => {
    if (dons) {
      // favoriteプロパティを付与
      const allDonsAddFavorite = dons.map((don) => {
        const isFavorite = favoriteDonsIDs.includes(don.id);
        return { ...don, favorite: isFavorite };
      });

      // 履歴と注文回数プロパティを追加
      const allDonsAddOrder = allDonsAddFavorite.map((don) => {
        const orderIds = order.map((don) => don.don_id);
        // console.log(orderIds);

        if (orderIds.includes(don.id)) {
          const targetId = don.id;
          const targetOrder = order.find((don) => don.don_id === targetId);

          return { ...don, order: targetOrder };
        } else {
          return { ...don, order: {} };
        }
      });

      // console.log("allDonsAddOrder", allDonsAddOrder);

      setAllData(allDonsAddOrder);
      setFullDons(allDonsAddOrder);
    }
  }, [dons, favoriteDonsIDs, order]);

  useEffect(() => {
    console.log("fullPropertyDons", fullPropertyDons);
  }, [allData]);

  return (
    <DefaultLayout pageTitle="全メニュー">
      <VStack minW="100%" spacing={2} mt="2rem" mb="2rem" minH="500px">
        {allData && <MenuCard dons={allData} />}
      </VStack>
    </DefaultLayout>
  );
}
