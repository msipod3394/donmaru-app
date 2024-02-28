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

export default function PageMenu() {
  // ユーザーのログイン情報
  const { loginUser } = useLoginUser();

  // ローディング
  const [loading, setLoading] = useState(false);

  // 読み込み時、donsテーブル呼び出し
  const [dons, setDons] = useState<any>([]);
  const [fliterDons, setFliterDons] = useState<any>([]);

  // お気に入りに追加した丼
  const [favoriteDons, setFavoriteDons] = useState([]);
  const [favoriteDonsIDs, setFavoriteDonsIDs] = useState([]);

  // 注文履歴
  const [order, setOrder] = useState([]);

  // 全データが整った状態
  const [allData, setAllData] = useState({});

  // 初回読み込み時
  useEffect(() => {
    // 全丼データの取得
    const getDons = async () => {
      // 全ての丼データを取得
      const allDons = await getAllDons();
      setDons(allDons);
    };
    getDons();

    // お気に入り丼の取得
    const getFavoriteDons = async () => {
      try {
        // お気に入りテーブルからユーザーのdonsを取得
        const allFavoriteDons: DBFavorits[] | null = await getAllFavoriteDons();

        // ↑のデータ取得後、配列操作・ステート更新
        if (allFavoriteDons !== null) {
          const fetchFavoriteDons = allFavoriteDons.map((item) => item.dons);
          const favoriteIds = fetchFavoriteDons.map((item) => item.id);
          setFavoriteDons(fetchFavoriteDons);
          setFavoriteDonsIDs(favoriteIds);
        }
      } catch (error) {
        console.error("エラーが発生しました", error);
      }
    };
    getFavoriteDons();

    // 過去の注文回数を取得
    const getOrder = async () => {
      try {
        // お気に入りテーブルからユーザーのdonsを取得
        const allOrder: DBOrders[] | null = await getAllOrder(loginUser.id);
        console.log("過去の注文履歴", allOrder);

        // IDごとの注文回数をカウントするオブジェクトを作成
        const donIdCounts = {};

        // don_idの重複をカウント
        allOrder.forEach((order) => {
          const donId = order.don_id;
          donIdCounts[donId] = (donIdCounts[donId] || 0) + 1;
        });

        // カウント数を新しいプロパティとして更新
        const allOrderAddCount = allOrder.map((order) => {
          const donId = order.don_id;
          const count = donIdCounts[donId];
          return { ...order, count };
        });
        // console.log("allOrderAddCount", allOrderAddCount);

        // 最新の注文データのみ保持
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
        // console.log("最新の注文データ+count", latestOrders);
        setOrder(latestOrders);
      } catch (error) {
        console.error("エラーが発生しました", error);
      } finally {
      }
    };
    getOrder();
  }, []);

  useEffect(() => {
    if (dons) {
      // console.log("全丼データ", dons);
      // console.log("お気に入り丼", favoriteDons);
      // console.log("お気に入り丼ID", favoriteDonsIDs);
      // console.log("過去の注文履歴情報", order);

      // dons取得後、favoriteプロパティを付与
      const allDonsAddFavorite = dons.map((don) => {
        if (favoriteDonsIDs.includes(don.id)) {
          return { ...don, favorite: true };
        } else {
          return { ...don, favorite: false };
        }
      });
      setFliterDons(allDonsAddFavorite);

      // 履歴と注文回数プロパティを追加
      const allDonsAddOrder = allDonsAddFavorite.map((don: DBDons) => {
        // 注文履歴のIDを抽出
        const orderIds = order.map((don) => don.don_id);

        // 注文履歴に登録があれば、注文履歴プロパティを追加
        if (orderIds.includes(don.id)) {
          // 一致する履歴を探してくる
          const targetId = don.id;
          const targetOrder = order.find((don) => don.don_id === targetId);

          return { ...don, order: targetOrder };
        } else {
          return { ...don, order: {} };
        }
      });
      // console.log("allDonsAddOrder", allDonsAddOrder);
      setAllData(allDonsAddOrder);
    }
  }, [dons, favoriteDons, favoriteDonsIDs, order]);

  return (
    <DefaultLayout pageTitle="お品書き">
      <VStack minW="100%" spacing={2} mt="2rem" mb="2rem" minH="500px">
        {allData && <MenuCard dons={allData} />}
      </VStack>
    </DefaultLayout>
  );
}
