import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { VStack } from "@chakra-ui/react";
import { supabase } from "@/lib/supabase";
import { DBDons } from "@/types/global_db.types";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { CardFavorite } from "@/components/atoms/Card/CardMenuItem";
import { useLoginUser } from "@/provider/LoginUserContext";

const OrderHistory = () => {
  const router = useRouter();
  const [data, setData] = useState<DBDons[]>([]);

  // ユーザーデータ取得
  const { loginUser } = useLoginUser();

  // ordersテーブルからユーザーのdonsを取得
  const getFetchData = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`*,  dons( * )`)
        .eq("user_id", id);
      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  // ↑のデータ取得後の、配列操作・ステート更新
  const fetchDataAndSetDons = async () => {
    try {
      const fetchData = await getFetchData(loginUser.id);
      const fetchDataOnlyDons = fetchData.map((item) => item.dons);
      console.log("fetchDataOnlyDons", fetchDataOnlyDons);
      setData(fetchDataOnlyDons);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDataAndSetDons();
  }, []);

  return (
    <DefaultLayout pageTitle="注文履歴">
      <SContentInner minW="100%" mt={5} mb={5} spacing={2}>
        <CardFavorite data={data} />
      </SContentInner>
      <SFixButtonArea>
        <BaseButton isDark={true} onClick={() => router.push("/mypage")}>
          マイページに戻る
        </BaseButton>
      </SFixButtonArea>
    </DefaultLayout>
  );
};

// Style
const SContentInner = styled(VStack)`
  padding-bottom: 2rem;
`;
const SFixButtonArea = styled(VStack)`
  position: fixed;
  bottom: 2.4rem;
`;

export default OrderHistory;
