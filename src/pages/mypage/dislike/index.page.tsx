import Link from "next/link";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import {
  Heading,
  Box,
  HStack,
  Text,
  Stack,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { getAllNetas } from "@/hooks/supabaseFunctions";
import { DBNetas } from "@/types/global_db.types";
import { supabase } from "@/lib/supabase";
import { useLoginUser } from "@/provider/LoginUserContext";

export default function PageDislike() {
  // ログイン状況の呼び出し
  const { loginUser } = useLoginUser();

  // DBから取得した全てのネタデータ
  const [allNetas, setAllNetas] = useState<DBNetas | null>(null);

  // チェックを入れたネタ
  const [selectedNetas, setSelectedNetas] = useState<number[]>([]);

  // チェックボックスの更新
  const handleCheckboxChange = (netaId: number) => {
    setSelectedNetas((prevSelectedNetas) => {
      const newSelectedNetas = prevSelectedNetas.includes(netaId)
        ? prevSelectedNetas.filter((id) => id !== netaId)
        : [...prevSelectedNetas, netaId];
      return newSelectedNetas;
    });
  };

  // DB登録の実行

  useEffect(() => {
    console.log("selectedNetas", selectedNetas);
  }, [selectedNetas]);

  // 初回、netasテーブルを呼び出す
  const fetchData = async () => {
    try {
      const fetchNetas: DBNetas | null = await getAllNetas();
      setAllNetas(fetchNetas);
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };
  useEffect(() => {
    fetchData();
    // console.log("allNetas");
  }, []);

  // DB登録の実行
  const onSubmit = useCallback(async () => {
    try {
      // // DBに登録のないネタのみ登録
      // const insertPromises = selectedNetas.map(async (netaId) => {
      //   try {
      //     // 既存の neta_id がデータベースに登録されているか確認
      //     const existingRecord = await supabase
      //       .from("dislikes")
      //       .select("*")
      //       .eq("neta_id", netaId);

      //     // 返ってきたデータの中身を確認する式
      //     const checkExistingRecord = existingRecord.data?.length === 0;

      //     // 存在・登録チェック
      //     if (existingRecord.data && checkExistingRecord) {
      //       console.log("既存のレコードが存在しない場合、新しく挿入", netaId);

      //       const { data, error } = await supabase
      //         .from("dislikes")
      //         .insert([{ neta_id: netaId, user_id: loginUser.id }]);
      //     } else {
      //       console.log("登録済みID", netaId);
      //     }
      //   } catch (insertError) {
      //     console.error(
      //       `netaId ${netaId} の挿入中にエラーが発生しました:`,
      //       insertError
      //     );
      //   }
      // });

      // // 全ての更新処理が完了するのを待つ
      // await Promise.all(insertPromises);

      // DBに登録のないネタのみ登録

      const deletePromises = selectedNetas.map(async (netaId) => {
        try {
          const result = `(${selectedNetas.join(",")})`;

          // 既存の neta_id がデータベースに登録されているか確認
          const existingRecord = await supabase
            .from("dislikes")
            .select("*")
            .not("neta_id", "in", result);

          console.log("existingRecord", existingRecord.data);


        } catch (insertError) {
          console.error(
            `netaId ${netaId} の挿入中にエラーが発生しました:`,
            insertError
          );
        }
      });

      await Promise.all(deletePromises);
    } catch (error) {
      console.error("一般的なエラーが発生しました", error);
    }
  }, [selectedNetas, loginUser.id]);

  return (
    <DefaultLayout pageTitle="苦手ネタ登録">
      <SBGGrayInner mt="3rem">
        <Text>
          登録されたネタが入っている丼は、
          <br />
          選択されないよう配慮します。
        </Text>
      </SBGGrayInner>
      <HStack minW="100%" mb={10} flexWrap="wrap" gap="0">
        {allNetas &&
          // mapはArrayのみしか使えないので、構造の確認を挟む必要がある
          Object.values(allNetas).map((neta: DBNetas) => (
            <Box w="50%" key={neta.id} mb=".5rem">
              <Checkbox
                isChecked={selectedNetas.includes(neta.id)}
                onChange={() => handleCheckboxChange(neta.id)}
              >
                {neta.name}
              </Checkbox>
            </Box>
          ))}
      </HStack>
      <BaseButton isArrow={false} isDark={true} onClick={onSubmit}>
        更新する
      </BaseButton>
    </DefaultLayout>
  );
}

// style
const SBGGrayInner = styled(Box)`
  width: 100%;
  padding: 2rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  background-color: #efefef;
`;

const SCheckbox = styled(Checkbox)``;
