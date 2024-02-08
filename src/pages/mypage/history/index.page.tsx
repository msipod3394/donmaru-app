import { useRouter } from "next/router";
import { Box, Text, Stack, VStack, HStack, Image } from "@chakra-ui/react";
import styled from "styled-components";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { useEffect, useState } from "react";
import { CardFavorite } from "@/components/atoms/Card/CardMenuItem";
import { useLoginUser } from "@/provider/LoginUserContext";
import { supabase } from "@/lib/supabase";
import { DBDons } from "@/types/global_db.types";

const OrderHistory = () => {
  const router = useRouter();

  const [data, setData] = useState<DBDons[]>([]);
  const [donIds, setDonIds] = useState<string[]>([]);

  // ユーザーデータからdons_id抽出
  const { loginUser } = useLoginUser();

  useEffect(() => {
    const getFetchOrderData = async (id: string) => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", id);
        if (error) throw error;
        return data;
      } catch (error: any) {
        console.error("Error:", error.message);
        throw error;
      }
    };

    const fetchDataAndSetDonIds = async () => {
      try {
        const result = await getFetchOrderData(loginUser.id);
        const donIds = result.map((order) => order.don_id);
        setDonIds(donIds);

        console.log("donIds", donIds);

        // donsテーブルから特定の情報を抽出
        const donData = await getFetchDonData(donIds);
        console.log("donData", donData);

        setData(donData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const getFetchDonData = async (ids: string[]) => {
      try {
        const { data, error } = await supabase
          .from("dons")
          .select("*")
          .in("id", ids);
        if (error) throw error;
        return data;
      } catch (error) {
        // console.error("Error:", error.message);
        throw error;
      }
    };

    fetchDataAndSetDonIds();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <DefaultLayout pageTitle="注文履歴">
      <SBGGrayInner mt="1rem">
        <Text>現在登録中のお気に入りメニュー</Text>
      </SBGGrayInner>
      <VStack minW="100%" mb={10} spacing={4}>
        <CardFavorite data={data} />
      </VStack>
      <BaseButton isDark={false} onClick={() => router.push("/mypage")}>
        マイページに戻る
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
    border-color: #000;
  }
`;
const SBoxIn = styled(VStack)`
  align-items: flex-start;
`;

export default OrderHistory;
