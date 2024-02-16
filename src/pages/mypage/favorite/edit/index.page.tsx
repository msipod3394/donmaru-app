import Link from "next/link";
import styled from "styled-components";
import { VStack, Heading } from "@chakra-ui/react";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import {
  getAllFavoriteDons,
  getNotFavoriteDons,
} from "@/hooks/supabaseFunctions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DBDons, DBFavorits } from "@/types/global_db.types";
import FavoriteDonCard from "../FavoriteDonCard";
import { supabase } from "@/lib/supabase";
import { useLoginUser } from "@/provider/LoginUserContext";

export default function PageFavorite() {
  const router = useRouter();

  // ユーザーデータ取得
  const { loginUser } = useLoginUser();

  // ローディング
  const [loading, setLoading] = useState(false);

  // お気に入りに追加した丼
  const [favoriteDons, setFavoriteDons] = useState<DBDons[]>([]);

  // お気に入りに追加した丼のID
  const [favoriteDonsId, setFavoriteDonsId] = useState<Array[]>([]);

  // お気に入りに追加されていない丼
  const [notFavoriteDons, setNotFavoriteDons] = useState<DBDons[]>([]);

  // 丼をお気に入りに追加
  const onClickSelectFavorite = (selectedDon: DBDons) => {
    // 同じIDがあれば削除、なければ追加
    const isAlreadyInFavorite = favoriteDons.some(
      (don) => don.id === selectedDon.id
    );

    // 丼IDをチェックして、セレクトした丼ID以外のものを抽出、Stateを更新
    if (isAlreadyInFavorite) {
      setFavoriteDons((prevState) =>
        prevState.filter((don) => don.id !== selectedDon.id)
      );

      setNotFavoriteDons((prevState) => {
        const newArray = [...prevState, selectedDon];
        const sortedData = newArray.slice().sort((a, b) => a.id - b.id);
        // console.log("sortedData", sortedData);
        return sortedData;
      });
    } else {
      // 同じIDがなければ、favoriteDonsに追加
      setFavoriteDons((prevState) => [...prevState, selectedDon]);

      // NotFavoriteDons から、選択した丼を削除
      setNotFavoriteDons((prevState) =>
        prevState.filter((don) => don.id !== selectedDon.id)
      );
    }
  };

  // DB(favoriteテーブル)に登録
  const insertOrderTable = async (
    don_id: number | undefined,
    user_id: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("favorits")
        .insert([{ don_id, user_id }])
        .select();
      console.log(don_id, user_id);
    } catch (error) {
      alert("エラーが発生しました");
    } finally {
      // alert("お気に入りに追加しました！");
      console.log("お気に入りに追加成功");
    }
  };

  // ユーザーのお気に入り登録を一旦削除
  const resetFavorite = async (user_id: string) => {
    const { data, error } = await supabase
      .from("favorits")
      .delete()
      .eq("user_id", user_id);
    if (error) {
      console.error("削除中にエラーが発生しました", error);
    } else {
      console.log(`user_id: ${user_id} のデータを削除しました。`);
    }
  };

  // 重複チェック
  const checkVal = async () => {
    try {
      supabase
        .from("favorits")
        .select()
        .eq("don_id", "1")
        .eq("user_id", "a9f25ec4-172b-443f-a60e-632ef34ad94f")
        .then(({ data, error }) => {
          if (error) {
            console.error(error);
            return;
          }
          if (data.length > 0) {
            console.log("指定された条件に合致する行が見つかりました");
          } else {
            console.log("指定された条件に合致する行は見つかりませんでした");
          }
        });
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  /**
   * メモ：
   * checkValで重複チェックができるようになったので、
   * あとは、favoriteDons をmapで回して、
   * 問題ないもののみ、UpDateしていく
   */

  // 登録実行
  const onClickAddFavorite = async () => {
    try {
      checkVal();

      // お気に入りをリセット
      // await resetFavorite(loginUser.id);

      // お気に入りデータを更新
      // await Promise.all(
      //   favoriteDons.map(async (item) => {
      //     console.log(item);
      //     await insertOrderTable(item.id, loginUser.id);
      //   })
      // );

      // お気に入り画面に戻る
      // router.push(`/mypage/favorite`);
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  // 初回、DBからデータ取得
  useEffect(() => {
    const getDons = async () => {
      try {
        // ローディング
        setLoading(true);

        // お気に入りテーブルからユーザーのdonsを取得
        const allFavoriteDons: DBFavorits[] | null = await getAllFavoriteDons();

        // ↑のデータ取得後の、配列操作・ステート更新
        if (allFavoriteDons !== null) {
          const fetchDataOnlyDons = allFavoriteDons.map((item) => item.dons);
          setFavoriteDons(fetchDataOnlyDons);
        }

        // お気に入り未登録の丼を取得
        if (allFavoriteDons !== null) {
          const fetchDataOnlyDonIds = allFavoriteDons.map(
            (item) => item.don_id
          );

          // console.log("fetchDataOnlyDonIds", fetchDataOnlyDonIds);
          setFavoriteDonsId(fetchDataOnlyDonIds);

          const val: DBDons | null = await getNotFavoriteDons(favoriteDonsId);
          setNotFavoriteDons(val);
        }
      } catch (error) {
        console.error("エラーが発生しました", error);
      } finally {
        setLoading(false);
      }
    };

    // getDons関数を呼び出す
    getDons();
  }, []);

  useEffect(() => {
    console.log("favoriteDons", favoriteDons);
  }, [favoriteDons]);

  return (
    <DefaultLayout pageTitle="お気に入りを編集">
      {!loading && (
        <DefaultLayoutInner>
          <VStack minW="100%" spacing={2} mt={8} mb={4}>
            <Heading as="h3" size="2xl" fontFamily="serif" pb={4}>
              登録済みの丼
            </Heading>
            {favoriteDons.map((don) => (
              <FavoriteDonCard
                key={don.id}
                don={don}
                onClick={onClickSelectFavorite}
              />
            ))}
          </VStack>
          <VStack minW="100%" spacing={2} mt={8}>
            <Heading as="h3" size="2xl" fontFamily="serif" pb={4}>
              未登録の丼
            </Heading>
            {notFavoriteDons.map((don) => (
              <FavoriteDonCard
                key={don.title}
                don={don}
                onClick={onClickSelectFavorite}
                favorite={false}
              />
            ))}
          </VStack>
          <SFixButtonArea>
            <BaseButton
              isDark={true}
              isArrow={false}
              onClick={onClickAddFavorite}
            >
              登録する
            </BaseButton>
            <BaseButton isDark={false} isArrow={false}>
              <Link href="/mypage/favorite">一覧に戻る</Link>
            </BaseButton>
          </SFixButtonArea>
        </DefaultLayoutInner>
      )}
    </DefaultLayout>
  );
}

// Style
const SFixButtonArea = styled(VStack)`
  position: fixed;
  bottom: 2.4rem;
`;

const DefaultLayoutInner = styled(VStack)`
  padding-bottom: 12rem;
`;
