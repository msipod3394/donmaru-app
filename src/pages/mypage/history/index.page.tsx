import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Text, VStack } from "@chakra-ui/react";
import { supabase } from "@/lib/supabase";
import { DBDons } from "@/types/global_db.types";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { CardMenuItem } from "@/components/atoms/Card/CardMenuItem";
import { useLoginUser } from "@/provider/LoginUserContext";
import { useFullPropertyDons } from "@/provider/FullPropertyDonsContext";

const OrderHistory = () => {
  const router = useRouter();

  // ローディング
  const [loading, setLoading] = useState(false);

  // orderに登録されている丼
  const [orderDons, setOrderDons] = useState<DBDons[]>([]);

  // 全てのプロパティが揃ったデータ
  const { fullPropertyDons } = useFullPropertyDons();

  console.log("fullPropertyDons", fullPropertyDons);

  // 初回、DBからデータ取得
  useEffect(() => {
    console.log("fullPropertyDons", fullPropertyDons);

    // orderテーブルに登録があるもののみソート
    const filteredOrderDons = fullPropertyDons.filter(
      (item: Dons) => Object.keys(item.order).length !== 0
    );

    // 登録が新しい順にソート
    const sortedOrderDons = filteredOrderDons.sort((a, b) => {
      const updatedAtA = new Date(a.order.updated_at).getTime();
      const updatedAtB = new Date(b.order.updated_at).getTime();
      return updatedAtB - updatedAtA;
    });

    setOrderDons(sortedOrderDons);
  }, []);

  return (
    <DefaultLayout pageTitle="注文履歴">
      {loading && <Text>読み込み中</Text>}
      {!loading && (
        <>
          <SContentInner minW="100%" mt={5} mb={5} spacing={2}>
            <CardMenuItem dons={orderDons} />
          </SContentInner>
          <SFixButtonArea>
            <BaseButton isDark={true} onClick={() => router.push("/mypage")}>
              マイページに戻る
            </BaseButton>
          </SFixButtonArea>
        </>
      )}
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
