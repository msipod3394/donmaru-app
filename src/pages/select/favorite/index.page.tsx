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
  const [loading, setLoading] = useState(false);

  // 全丼データ
  const [allDons, setAllDons] = useState<DBDons[]>([]);

  // お気に入りに追加した丼
  const [favoriteDons, setFavoriteDons] = useState<DBFavorits[]>([]);

  // 選択した丼
  const { selectedDons, setDons } = useSelectedDons();

  // お気に入り操作
  const onClickHandleFavorite = (selectedDon: DBDons) => {
    console.log(selectedDon);
    // 同じIDがあれば削除、なければ追加
    const isAlreadyInFavorite = favoriteDons.some(
      (don) => don.id === selectedDon.id
    );

    // 丼IDをチェックして、セレクトした丼ID以外のものを抽出、Stateを更新
    if (isAlreadyInFavorite) {
      setFavoriteDons((prevState) =>
        prevState.filter((don) => don.id !== selectedDon.id)
      );
    } else {
      // 同じIDがなければ、favoriteDonsに追加
      setFavoriteDons((prevState) => [...prevState, selectedDon]);
    }
  };

  // donsデータから一つ選択して返す
  const onClickSelectDons = () => {
    const donsIndex = Math.floor(Math.random() * favoriteDons.length);
    // console.log(favoriteDons[donsIndex]);

    setDons(favoriteDons[donsIndex]);
    console.log("selectedDons", selectedDons);

    router.push(`/result`);
  };

  // 初回、DBからデータ取得
  useEffect(() => {
    const getDons = async () => {
      try {
        setLoading(true); // ローディング

        const dons: DBDons[] | null = await getAllDons();
        const allFavoriteDons: DBFavorits[] | null = await getAllFavoriteDons();

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

        // // donsテーブルからdonIdsの情報を抽出
        // const filteredNotFavoriteDons = allDons.filter(
        //   (don) => !donIds.includes(don.id)
        // );
      } catch (error) {
        console.error("エラーが発生しました", error);
      } finally {
        setLoading(false);
      }
    };

    // getDons関数を呼び出す
    getDons();

    console.log("favoriteDons", favoriteDons);
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
            onClick={onClickHandleFavorite}
          />
        ))}
        {/* <CardFavorite
          data={data}
          onClickHandle={(index) => onClickHandleSelect(index)}
        /> */}
        {/* {dummyData.map((item, index) => (
          <CardFavorite
            key={index}
            item={item}
            index={index}
            selected={data}
            onClickHandle={(index) => onClickHandleSelect(index)}
          />
        ))} */}
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
