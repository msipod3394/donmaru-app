import Link from "next/link";
import styled from "styled-components";
import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { FaRegHeart } from "react-icons/fa";
import { getAllDons, getAllFavoriteDons } from "@/hooks/supabaseFunctions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DBDons } from "@/types/global_db.types";
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

  /**
   * 全メニューの取得・表示
   */
  // 初回、donsテーブルを呼び出す
  useEffect(() => {
    const getDons = async () => {
      const dons: DBDons[] = await getAllDons();
      setAllDons(dons);
      // console.log("allDons", allDons);
    };
    getDons();
  }, []);

  // 丼をお気に入りに追加
  const onClickSelectFavorite = (selectedDon: DBDons) => {
    // 丼データを取得
    // console.log("追加した丼" ,selectedDon);

    // 同じIDがあれば削除、なければ追加する
    const isAlreadyInFavorite = favoriteDons.some(
      (don) => don.id === selectedDon.id
    );
    if (isAlreadyInFavorite) {
      // 丼IDをチェックして、セレクトした丼ID以外のものを抽出して、Stateを上書き
      setFavoriteDons((prevState) =>
        prevState.filter((don) => don.id !== selectedDon.id)
      );
    } else {
      // 同じIDがなければ、そのまま追加処理
      setFavoriteDons((prevState) => [...prevState, selectedDon]);
    }
  };

  useEffect(() => {
    console.log("favoriteDons", favoriteDons);
  }, [favoriteDons]);

  return (
    <DefaultLayout pageTitle="お気に入り">
      <VStack minW="100%" spacing={2} mt={16} mb={4}>
        {allDons.map((don) => (
          <FavoriteDonCard
            key={don.id}
            don={don}
            onClick={onClickSelectFavorite}
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
