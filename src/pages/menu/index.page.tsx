import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Text, Stack, VStack, HStack, Image } from "@chakra-ui/react";
import styled from "styled-components";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { BaseInput } from "@/components/atoms/Inputs/BaseInput";
import { ErrorText } from "@/components/atoms/Text/ErrorText";
import { useEffect, useState } from "react";
import { CardFavorite } from "@/components/atoms/Card/CardMenuItem";
import { MenuCard } from "./MenuCard";
import { getAllDons } from "@/hooks/supabaseFunctions";

export default function PageMenu() {
  const SFixButtonArea = styled(VStack)`
    position: fixed;
    bottom: 2.4rem;
  `;

  // 読み込み時、donsテーブル呼び出し
  const [dons, setDons] = useState<any>([]);
  useEffect(() => {
    const getDons = async () => {
      const dons = await getAllDons();
      setDons(dons);
      console.log("dons", dons);
    };
    getDons();
  }, []);

  return (
    <DefaultLayout pageTitle="お品書き">
      <VStack minW="100%" spacing={2} mt="2rem" mb="2rem" minH="500px">
        <MenuCard dons={dons} />
      </VStack>
      <SFixButtonArea>
        <BaseButton isDark={true} isArrow={false} href="home">
          トップに戻る
        </BaseButton>
      </SFixButtonArea>
    </DefaultLayout>
  );
}
