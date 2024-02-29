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
import { useFullPropertyDons } from "@/provider/FullPropertyDonsContext";
import { CardMenuItem } from "@/components/atoms/Card/CardMenuItem";

export default function PageFavorite() {
  const router = useRouter();

  // 全てのプロパティが揃ったデータ
  const { fullPropertyDons } = useFullPropertyDons();

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
    console.log("fullPropertyDons", fullPropertyDons);
    const filteredFavoriteDons = fullPropertyDons.filter(
      (item: Dons) => item.favorite === true
    );
    setFavoriteDons(filteredFavoriteDons);
  }, []);

  return (
    <DefaultLayout pageTitle="お気に入り管理">
      {loading && <Text>読み込み中</Text>}
      {!loading && (
        <>
          <SContentInner minW="100%" mt={5} mb={5} spacing={2}>
            <CardMenuItem dons={favoriteDons} />
          </SContentInner>
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
const SContentInner = styled(VStack)`
  padding-bottom: 2rem;
`;
const SFixButtonArea = styled(VStack)`
  position: fixed;
  bottom: 2.4rem;
`;

