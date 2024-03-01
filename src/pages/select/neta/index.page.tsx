import styled from "styled-components";
import { useState, useCallback, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Text, HStack, Checkbox } from "@chakra-ui/react";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { supabase } from "@/lib/supabase";
import { DBNetas } from "@/types/global_db.types";
import { getAllNetas } from "@/hooks/supabaseFunctions";
import { useLoginUser } from "@/provider/LoginUserContext";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";

const SelectNeta: NextPage = () => {
  const router = useRouter();

  const [selectedNetas, setSelectedNetas] = useState<number[]>([]);

  // DBから取得した全てのネタデータ
  const [netas, setNetas] = useState<Object | undefined>();

  // チェックしたネタが入っている丼リスト
  const [selectDons, setSelectDons] = useState<DBNetas[] | null>(null);

  // 初回、netasテーブルを呼び出す
  useEffect(() => {
    const getNetas = async () => {
      const getFetchNetas: Object = await getAllNetas();
      setNetas(getFetchNetas);
    };
    getNetas();
  }, []);

  useEffect(() => {
    // ソートされた丼から1つランダムに選ぶ
    if (selectDons !== null && selectDons.length > 0) {
      if (selectDons.length >= 1) {
        const randomIndex = Math.floor(Math.random() * selectDons.length);
        const selectDonID = selectDons[randomIndex].don_id;
        // router.push(`/result/${selectDonID}`);
      }
    }
    console.log("selectDons", selectDons);
    
  }, [selectDons]);

  // チェックボックスの更新
  const handleCheckboxChange = (netaId: number) => {
    setSelectedNetas((prevSelectedNetas) => {
      const newSelectedNetas = prevSelectedNetas.includes(netaId)
        ? prevSelectedNetas.filter((id) => id !== netaId)
        : [...prevSelectedNetas, netaId];

      // 2つ以上アイテムが選択された場合、アラートを表示
      if (newSelectedNetas.length > 2) {
        alert("2つ以上のネタを選択できません。");

        // 選択状態を変更せずに戻す
        return prevSelectedNetas;
      }

      return newSelectedNetas;
    });
  };

  // DB登録の実行
  const onSubmit = useCallback(async () => {
    // チェック
    if (!selectedNetas || selectedNetas.length === 0) {
      alert("1つ以上のネタを選択してください。");
      return;
    }

    // 通信
    try {
      // 共通クエリ
      // let donsNetasQuery = supabase.from("dons_netas").select(" * , dons( * )");

      let donsNetasQuery = supabase.from("dons").select("*, dons_netas( * )")

      // 選択状況でフィルタリング
      if (selectedNetas.length > 1) {
        console.log("選択したネタが2つの場合");
        donsNetasQuery = donsNetasQuery
        .in('dons_netas.neta_id', [1,2])

          // .filter(
          //   "neta_id",
          //   "in",
          //   `(${selectedNetas[0]}, ${selectedNetas[1]})`
          // );
      } else {
        console.log("選択したネタが1つの場合");
        const netaId = selectedNetas[0];
        donsNetasQuery = donsNetasQuery.eq("neta_id", netaId);
      }
      const { data } = await donsNetasQuery;
      setSelectDons(data);
    } catch (error) {
      console.error("エラー", error);
    }
  }, [selectedNetas]);

  return (
    <DefaultLayout pageTitle="ネタを選ぶ">
      <SBGGrayInner mt="1rem">
        <Text>好きなネタを「2つ」まで選んでね</Text>
      </SBGGrayInner>
      <HStack minW="100%" mb={10}>
        <HStack w="100%" flexWrap="wrap">
          {netas &&
            // mapはArrayのみしか使えないので、構造の確認を挟む必要がある
            Object.values(netas).map((neta: DBNetas) => (
              <Box w="48%" key={neta.id}>
                <Checkbox
                  isChecked={selectedNetas.includes(neta.id)}
                  onChange={() => handleCheckboxChange(neta.id)}
                >
                  {neta.name}
                </Checkbox>
              </Box>
            ))}
        </HStack>
      </HStack>
      <BaseButton isArrow={false} onClick={onSubmit}>
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

export default SelectNeta;
