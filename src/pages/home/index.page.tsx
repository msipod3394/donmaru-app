import styled from "styled-components";
import { useRouter } from "next/router";
import { Text, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  getAllDons,
  getAllFavoriteDons,
  getAllOrder,
} from "@/hooks/supabaseFunctions";
import { useLoginUser } from "@/provider/LoginUserContext";
import { useFullPropertyDons } from "@/provider/FullPropertyDonsContext";
import { convertFormattedDate } from "@/hooks/convertFormattedDate";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import useFetchDonsData from "@/hooks/useFetchDonsData";

const Home = () => {
  const router = useRouter();

  // ローディング
  const [loading, setLoading] = useState(false);

  // ログイン状況の呼び出し
  const { loginUser } = useLoginUser();

  // 全てのプロパティが揃ったデータ
  const { fullPropertyDons, setFullDons } = useFullPropertyDons();

  const { allData } = useFetchDonsData();

  useEffect(() => {
    setFullDons(allData);
    console.log("fullPropertyDons", fullPropertyDons);
  }, [allData]);

  // おまかせガチャ
  const onClickSelectDons = () => {
    // fullPropertyDonsデータから一つ選択して返す
    const donsIndex =
      Math.floor(Math.random() * fullPropertyDons.length - 1) + 1;
    router.push(`/result/${donsIndex}`);
  };

  return (
    <DefaultLayout pageTitle="丼丸ガチャ">
      <Stack mt="2rem" spacing="1rem">
        <SText>
          本日あなたにぴったりの
          <br />
          海鮮丼を選びます 🐟
        </SText>
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
          {/* <Link onClick={() => router.push(`/result`)}>おまかせガチャ</Link> */}
        </Stack>
      </Stack>
    </DefaultLayout>
  );
};

// Style
const SText = styled(Text)`
  padding: 2rem;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  text-align: center;
  background-color: #f3f3f3;
`;

export default Home;
