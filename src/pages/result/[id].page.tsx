import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Text, Stack, Image, HStack } from "@chakra-ui/react";
import { useLoginUser } from "@/provider/LoginUserContext";
import { supabase } from "@/lib/supabase";
import { getAllDons } from "@/hooks/supabaseFunctions";
import { donsTable } from "@/types/dons";
import { DBDons } from "@/types/global_db.types";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { useFullPropertyDons } from "@/provider/FullPropertyDonsContext";
import useFetchDonsData from "@/hooks/useFetchDonsData";

const PageResult = () => {
  // idを取得
  const router = useRouter();
  const { id } = router.query;

  // ログイン状況の呼び出し
  const { loginUser } = useLoginUser();

  // 全てのプロパティが揃ったデータ
  const { fullPropertyDons, setFullDons } = useFullPropertyDons();

  // 初回、donsテーブルを呼び出す
  // const [allDons, setAllDons] = useState<DBDons[]>([]);
  const [selectDon, setSelectDon] = useState<donsTable[]>([]);
  const [loading, setLoading] = useState(false);

  const { dons, favoriteDonsIDs, order, allData, fetchData } =
    useFetchDonsData();

  useEffect(() => {
    // const getDons = async () => {
    //   try {
    //     setLoading(true);
    //     const dons: DBDons[] = await getAllDons();
    //     setAllDons(dons);
    //   } catch (error) {
    //     console.error("エラーが発生しました", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // getDons();
    console.log("user_id", loginUser.id);
  }, []);

  useEffect(() => {
    if (fullPropertyDons !== undefined && id !== undefined) {
      console.log("fullPropertyDons", fullPropertyDons);
      const result = fullPropertyDons.find((item: DBDons) => item.id == id);
      setSelectDon(result);
    }
  }, [fullPropertyDons, id]);

  // DB(注文履歴テーブル)に登録
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
      alert("注文履歴に追加しました！");
      console.log("注文履歴に追加成功");
      fetchData();
      setFullDons(allData);
    }
  };

  // 注文履歴へ追加
  const onClickAddOrder = () => {
    // 注文履歴に追加実行
    if (
      selectDon !== undefined &&
      selectDon.id !== undefined &&
      loginUser.id !== undefined
    ) {
      insertOrderTable(selectDon.id, loginUser.id);
    }
  };

  useEffect(() => {
    console.log("fullPropertyDons", fullPropertyDons);
  }, [fullPropertyDons]);

  return (
    <DefaultLayout pageTitle="へいお待ち!">
      <Stack spacing="1rem">
        {loading && <p>Loading...</p>}
        {!loading && selectDon && (
          <>
            <Image
              mt="1rem"
              mb="1rem"
              src={`/menu/${selectDon.image}`}
              alt={selectDon.title}
            />
            <SResultText fontFamily="serif">{selectDon.title}</SResultText>
            <SText gap={0} flexWrap="wrap" justifyContent="center">
              {selectDon.dons_netas &&
                Array.isArray(selectDon.dons_netas) &&
                selectDon.dons_netas.map((neta, index) => {
                  const netaName = neta.netas && neta.netas.name;
                  return (
                    <Text
                      as="span"
                      fontSize="md"
                      textAlign="center"
                      key={index}
                    >
                      {index > 0 && <>・</>}
                      {netaName}
                    </Text>
                  );
                })}
            </SText>
            <Stack spacing="1.5rem">
              <BaseButton isArrow={false} onClick={onClickAddOrder}>
                注文履歴に追加する
              </BaseButton>
              <BaseButton
                isDark={false}
                isArrow={true}
                onClick={() => router.push("/home")}
              >
                もう一回ガチャする
              </BaseButton>
            </Stack>
          </>
        )}
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
  margin-bottom: 2rem;
  font-size: 1rem;
  text-align: center;
  background-color: #f13a3a20;
`;

export default PageResult;
