import styled from "styled-components";
import { useRouter } from "next/router";
import { Text, Stack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllDislikeNetas } from "@/hooks/supabaseFunctions";
import { useLoginUser } from "@/provider/LoginUserContext";
import { useFullPropertyDons } from "@/provider/FullPropertyDonsContext";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import useFetchDonsData from "@/hooks/useFetchDonsData";
import { DBDislikes, DBNetas } from "@/types/global_db.types";

const Home = () => {
  const router = useRouter();

  // ローディング
  const [loading, setLoading] = useState(false);

  // ログイン状況の呼び出し
  const { loginUser } = useLoginUser();

  // 全てのプロパティが揃ったデータ
  const { allData } = useFetchDonsData();
  const { fullPropertyDons, setFullDons } = useFullPropertyDons();

  // 苦手ネタ
  const [dislikeNetas, setDislikeNetas] = useState();

  // 苦手ネタフィルタリング後（ここから1つ選ぶ）
  const [filteredDons, setFilteredDons] = useState();

  // 初回読み込み時
  const fetchData = async () => {
    try {
      const fetchDislikeNetas: DBDislikes | null = await getAllDislikeNetas();
      const dislikeNetaIds = fetchDislikeNetas.map(
        (neta: DBDislikes) => neta.neta_id
      );
      setDislikeNetas(dislikeNetaIds);
      handleFilteredDons();
        return dislikeNetaIds;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDataAndFilteredDons = async () => {
      try {
        const dislikeNetaIds = await fetchData();
        console.log(dislikeNetaIds);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndFilteredDons();
  }, [fullPropertyDons]);

  const handleFilteredDons = () => {
    if (Array.isArray(fullPropertyDons)) {
      const filteredResultDons = fullPropertyDons.filter((item) => {
        if (item.dons_netas !== null) {
          const hasDislikedNeta = Object.values(item.dons_netas).every(
            (netaItem) => {
              return (
                netaItem &&
                netaItem.netas &&
                !dislikeNetas.includes(netaItem.netas.id)
              );
            }
          );
          return hasDislikedNeta;
        }
      });

      console.log("filteredResultDons", filteredResultDons);
      setFilteredDons(filteredResultDons);
    }
  };

  const onClickSelectDons = () => {
    const donsIndex = Math.floor(Math.random() * filteredDons.length);
    console.log("結果確認", filteredDons[donsIndex].id);
    router.push(`/result/${filteredDons[donsIndex].id}`);
  };

  return (
    <DefaultLayout pageTitle="丼丸ガチャ">
      <Stack mt="2rem" spacing="1rem">
        <SText>
          本日あなたにぴったりの
          <br />
          海鮮丼を選びます 🐟
        </SText>
        {loading ? (
          <Spinner size="lg" color="teal.500" alignItems="center" />
        ) : (
          <Stack spacing="1.5rem">
            <BaseButton
              isDark={false}
              isArrow={true}
              onClick={() => onClickSelectDons()}
            >
              おまかせガチャ
            </BaseButton>
            <BaseButton
              isDark={false}
              isArrow={true}
              onClick={() => router.push("/select/favorite")}
            >
              お気に入りからガチャ
            </BaseButton>
            <BaseButton
              isDark={false}
              isArrow={true}
              onClick={() => router.push("/select/neta")}
            >
              具材を選んでガチャ
            </BaseButton>
          </Stack>
        )}
      </Stack>
    </DefaultLayout>
  );
};

const SText = styled(Text)`
  padding: 2rem;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  text-align: center;
  background-color: #f3f3f3;
`;

export default Home;
