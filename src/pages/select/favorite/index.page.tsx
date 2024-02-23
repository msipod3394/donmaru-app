import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Text, Stack, VStack, HStack, Image } from "@chakra-ui/react";
import styled from "styled-components";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { useEffect, useState } from "react";
import { getAllDons, getAllFavoriteDons } from "@/hooks/supabaseFunctions";
// import { CardFavorite } from "@/components/atoms/Card/CardMenuItem";
import { useLoginUser } from "@/provider/LoginUserContext";
import { DBDons, DBFavorits } from "@/types/global_db.types";
import FavoriteDonCard from "./FavoriteDonCard";
import { useSelectedDons } from "@/provider/SelectedDonsContext";

const SelectFavorite = () => {
  const router = useRouter();
  const { loginUser } = useLoginUser();

  /**
   * State管理
   */
  // ローディング
  const [loading, setLoading] = useState(false);

  // お気に入りに追加した丼
  const [favoriteDons, setFavoriteDons] = useState<DBDons[]>([]);

  // donsデータから一つ選択して返す
  const onClickSelectDons = () => {
    const donsIndex = Math.floor(Math.random() * favoriteDons.length);
    const selectDonIndex = favoriteDons[donsIndex].id;
    router.push(`/result/${selectDonIndex}`);
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

  useEffect(() => {
    console.log("favoriteDons", favoriteDons);
  }, [favoriteDons]);

  return (
    <DefaultLayout pageTitle="お気に入りから選ぶ">
      <SBGGrayInner mt="1rem">
        <Text>現在登録中のお気に入りメニュー</Text>
      </SBGGrayInner>
      <VStack minW="100%" mb={10} spacing={4}>
        {favoriteDons.map((don) => (
          <FavoriteDonCard
            key={don.id}
            don={don}
            // onClick={onClickHandleFavorite}
          />
        ))}
      </VStack>
      <BaseButton
        isArrow={true}
        isDark={true}
        onClick={() => onClickSelectDons()}
      >
        ガチャする
      </BaseButton>
    </DefaultLayout>
  );
};

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
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  box-sizing: border-box;
  border: 3px solid #000;

  &._isSelected {
    border-color: #de5d50;
  }
`;
const SBoxIn = styled(VStack)`
  align-items: flex-start;
`;

export default SelectFavorite;
