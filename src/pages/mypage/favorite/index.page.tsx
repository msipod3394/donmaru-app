import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { Box, VStack, HStack, Text } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";
import { DBDons, DBFavorits } from "@/types/global_db.types";
import { getAllDons, getAllFavoriteDons } from "@/hooks/supabaseFunctions";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import FavoriteDonCard from "./favoriteDonCard";

export default function PageFavorite() {
  const router = useRouter();

  /**
   * State管理
   */
  // ローディング
  const [loading, setLoading] = useState(false);

  // 全丼データ
  const [allDons, setAllDons] = useState<DBDons[]>([]);

  // お気に入りに追加した丼
  const [favoriteDons, setFavoriteDons] = useState<DBDons[]>([]);

  // 初回、DBからデータ取得
  useEffect(() => {
    const getDons = async () => {
      try {
        setLoading(true); // ローディング

        const dons: DBDons[] = await getAllDons();
        const allFavoriteDons: DBFavorits[] = await getAllFavoriteDons();

        // 全丼データ登録
        setAllDons(dons);

        // お気に入りに登録されている丼のIDだけ抽出
        const donIds = allFavoriteDons.map((don) => don.don_id);

        // donsテーブルからdonIdsの情報を抽出
        const filteredFavoriteDons = allDons.filter((don) =>
          donIds.includes(don.id)
        );

        // お気に入りにセット
        setFavoriteDons(filteredFavoriteDons);
      } catch (error) {
        console.error("エラーが発生しました", error);
      } finally {
        setLoading(false);
      }
    };
    getDons();
  }, []);

  // setFavoriteDonsが呼ばれた後に再レンダリング
  useEffect(() => {
    console.log("favoriteDonsが更新された");
  }, [favoriteDons]);

  return (
    <DefaultLayout pageTitle="お気に入り一覧">
      {loading && <Text>読み込み中</Text>}
      {!loading && (
        <>
          <VStack minW="100%" spacing={2} mt={16} mb={4}>
            {favoriteDons.map((don) => (
              <FavoriteDonCard
                key={don.id}
                don={don}
                onClick={() => console.log("test")}
              />
            ))}
          </VStack>
          <SFixButtonArea>
            <BaseButton isDark={true} isArrow={true}>
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
const SBGGrayInner = styled(Box)`
  width: 100%;
  padding: 2rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  background-color: #efefef;
`;

const SBox = styled(HStack)`
  position: relative;
  width: 100%;
  border: 2px solid #000;
  padding: 1rem;
  border-radius: 5px;
`;
const SBoxIn = styled(VStack)`
  align-items: flex-start;
`;
const SFixButtonArea = styled(VStack)`
  position: fixed;
  bottom: 2.4rem;
`;
const IconHeart = styled(FaRegHeart)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 24px;
  color: #f13b3a;
`;
