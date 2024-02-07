import { useRouter } from "next/router";
import { Text, Stack, Image } from "@chakra-ui/react";
import styled from "styled-components";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { useSelectedDons } from "@/provider/SelectedDonsContext";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLoginUser } from "@/provider/LoginUserContext";

const Home = () => {
  const router = useRouter();
  const { selectedDons, setDons } = useSelectedDons();
  const { loginUser, setUser } = useLoginUser();

  console.log("don_id", selectedDons.id);
  console.log("user_id", loginUser.id);

  const onClickAddOrder = () => {
    alert("注文履歴に追加しました！");

    // 注文履歴に追加
    const insertOrderTable = async (
      don_id: string | undefined,
      user_id: string
    ) => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .insert([{ don_id, user_id }])
          .select();
      } catch (error) {
        alert("エラーが発生しました");
      } finally {
        console.log("成功：注文履歴に追加");
      }
    };

    insertOrderTable(selectedDons.id, loginUser.id)
  };

  return (
    <DefaultLayout pageTitle="へいお待ち!">
      <Stack spacing="1rem">
        <Image
          mt="1rem"
          mb="1rem"
          src={`/menu/${selectedDons.image}`}
          alt={selectedDons.title}
        />
        <SResultText fontFamily="serif">「{selectedDons.title}」</SResultText>
        <SText>サーモン、マグロ、イカ、ネギトロ</SText>
        <Stack spacing="1.5rem">
          <BaseButton isArrow={false} onClick={onClickAddOrder}>
            注文履歴に追加する
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/home">
            もう一回ガチャする
          </BaseButton>
        </Stack>
      </Stack>
    </DefaultLayout>
  );
};

// Style
const SResultText = styled(Text)`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`;
const SText = styled(Text)`
  padding: 2rem;
  margin-bottom: 3rem;
  font-size: 1rem;
  text-align: center;
  background-color: #f13a3a20;
`;

export default Home;
