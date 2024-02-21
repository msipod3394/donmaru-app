import { useState, useCallback, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Text, Stack, HStack, Checkbox, Button } from "@chakra-ui/react";
import styled from "styled-components";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { supabase } from "@/lib/supabase";
import { getAllNetas } from "@/hooks/supabaseFunctions";
import { DBNetas } from "@/types/global_db.types";

const SelectNeta = () => {
  const [selectedNetas, setSelectedNetas] = useState<number[]>([]);

  // DBから取得した全てのネタデータ
  const [netas, setNetas] = useState<DBNetas[] | undefined>();

  // チェックしたネタが入っている丼リスト
  const [selectDons, setSelectDons] = useState<Object>({});

  // 初回、netasテーブルを呼び出す
  useEffect(() => {
    const getNetas = async () => {
      const getNetas = await getAllNetas();
      setNetas(getNetas);
    };
    getNetas();
  }, []);

  useEffect(() => {
    // console.log("selectDons", selectDons[0]);
    const selectDonsLength = Object.keys(selectDons).length;
    if (selectDonsLength) {
      const randomIndex = Math.floor(Math.random() * selectDonsLength);
      const selectedDon = selectDons[randomIndex];
      console.log("select", selectedDon);
    }
  }, [selectDons]);

  const handleCheckboxChange = (netaId: number) => {
    setSelectedNetas((prevSelectedNetas) => {
      if (prevSelectedNetas.includes(netaId)) {
        return prevSelectedNetas.filter((id) => id !== netaId);
      } else {
        return [...prevSelectedNetas, netaId];
      }
    });
  };

  const onSubmit = useCallback(async () => {
    console.log(selectedNetas);

    const donsNetas = await supabase
      .from("dons_netas")
      .select(" * , dons( * )")
      .filter("neta_id", "in", `(${selectedNetas[0]}, ${selectedNetas[1]})`); // todo:複数のネタで絞り込みたい時はこれを使う
    console.log("donsNetas", donsNetas.data);
    setSelectDons(donsNetas.data);
  }, [selectedNetas]);

  return (
    <DefaultLayout pageTitle="ネタを選ぶ">
      <SBGGrayInner mt="1rem">
        <Text>好きなネタを「2つ」まで選んでね</Text>
      </SBGGrayInner>
      <HStack minW="100%" mb={10}>
        <Stack>
          {netas &&
            netas.map((neta: DBNetas) => (
              <Checkbox
                key={neta.id}
                isChecked={selectedNetas.includes(neta.id)}
                onChange={() => handleCheckboxChange(neta.id)}
              >
                {neta.name}
              </Checkbox>
            ))}
        </Stack>
      </HStack>
      <Button onClick={onSubmit}>ガチャする</Button>
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
