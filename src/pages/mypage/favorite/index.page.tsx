import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { VStack, Text } from "@chakra-ui/react";
import { DBDons, DBFavorits } from "@/types/global_db.types";
import { getAllFavoriteDons } from "@/hooks/supabaseFunctions";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import FavoriteDonCard from "./FavoriteDonCard";

export default function PageFavorite() {
  const router = useRouter();

  // ローディング
  const [loading, setLoading] = useState(false);

  // お気に入りに追加した丼
  const [favoriteDons, setFavoriteDons] = useState<DBDons[]>([]);

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
          console.log("fetchDataOnlyDons", fetchDataOnlyDons);
          setFavoriteDons(fetchDataOnlyDons);
        }
      } catch (error) {
        console.error("エラーが発生しました", error);
      } finally {
        setLoading(false);
      }
    };
    getDons();
  }, []);

  return (
    <DefaultLayout pageTitle="お気に入り一覧">
      {loading && <Text>読み込み中</Text>}
      {!loading && (
        <>
          <VStack minW="100%" spacing={2} mt={4} mb={4}>
            {favoriteDons.map((don) => (
              <FavoriteDonCard
                key={don.id}
                don={don}
                onClick={() => console.log("test")}
              />
            ))}
          </VStack>
          <SFixButtonArea>
            <BaseButton
              isDark={true}
              isArrow={true}
              onClick={() => router.push("/mypage/favorite/edit")}
            >
              <Link href="/mypage/favorite/edit">編集する</Link>
            </BaseButton>
            <BaseButton isDark={false} isArrow={false}>
              <Link href="/mypage">マイページに戻る</Link>
            </BaseButton>
          </SFixButtonArea>
        </>
      )}
    </DefaultLayout>
  );
}

// Style
const SFixButtonArea = styled(VStack)`
  position: fixed;
  bottom: 2.4rem;
`;

