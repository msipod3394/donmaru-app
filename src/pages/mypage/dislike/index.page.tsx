import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { Box, HStack, Text, Checkbox } from "@chakra-ui/react";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { getAllDislikeNetas, getAllNetas } from "@/hooks/supabaseFunctions";
import { DBDislikes, DBNetas } from "@/types/global_db.types";
import { supabase } from "@/lib/supabase";
import { useLoginUser } from "@/provider/LoginUserContext";

export default function PageDislike() {
  // ログイン状況の呼び出し
  const { loginUser } = useLoginUser();

  // DBから取得した全てのネタデータ
  const [allNetas, setAllNetas] = useState<DBNetas | null>(null);

  // DBから取得した全ての苦手ネタデータ
  const [allDislikeNetas, setAllDislikeNetas] = useState<DBDislikes | null>(
    null
  );

  // チェックを入れたネタ
  const [selectedNetas, setSelectedNetas] = useState<number[]>([]);

  // 全てのプロパティが揃ったデータ
  const [fullNetas, setFullNetas] = useState();

  // 初回、netasテーブルを呼び出す
  const fetchData = async () => {
    try {
      const fetchNetas: DBNetas | null = await getAllNetas();
      const fetchDislikeNetas: DBDislikes | null = await getAllDislikeNetas();
      setAllNetas(fetchNetas);
      setAllDislikeNetas(fetchDislikeNetas);
    } catch (error) {
      console.error(error);
    }
  };

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
  const onSubmit = useCallback(async () => {
    try {
      // DBに登録のないネタのみ登録
      const insertPromises = selectedNetas.map(async (netaId) => {
        try {
          // 既存の neta_id がデータベースに登録されているか確認
          const existingRecord = await supabase
            .from("dislikes")
            .select("*")
            .eq("neta_id", netaId);

          // 返ってきたデータの中身を確認する式
          const checkExistingRecord = existingRecord.data?.length === 0;

          // 存在・登録チェック
          if (existingRecord.data && checkExistingRecord) {
            console.log("レコードが存在しない場合、新しく挿入", netaId);

            const { data, error } = await supabase
              .from("dislikes")
              .insert([{ neta_id: netaId, user_id: loginUser.id }]);
          } else {
            console.log("登録済みID", netaId);
          }
        } catch (error) {
          console.error(error);
        }
      });

      // DBに登録のある、チェックのないネタを削除
      const deletePromises = selectedNetas.map(async (netaId) => {
        try {
          const joinSelectedNetas = `(${selectedNetas.join(",")})`;

          // 既存の neta_id がデータベースに登録されているか確認
          const existingRecords = await supabase
            .from("dislikes")
            .select("*")
            .not("neta_id", "in", joinSelectedNetas);

          // console.log("existingRecords", existingRecords.data);

          // 各既存レコードに対して非同期操作を行う
          if (existingRecords.data) {
            await Promise.all(
              existingRecords.data.map(async (record) => {
                try {
                  const { data, error } = await supabase
                    .from("dislikes")
                    .delete()
                    .eq("neta_id", record.neta_id)
                    .eq("user_id", loginUser.id);

                  console.log("削除済みID", record.neta_id);
                } catch (error) {
                  console.error(error);
                }
              })
            );
          }
        } catch (error) {
          console.error(error);
        }
      });
      // すべての非同期削除操作が完了するまで待機
      await Promise.all([insertPromises, deletePromises]);
    } catch (error) {
      console.error("error", error);
    }
  }, [selectedNetas, loginUser.id]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (allDislikeNetas) {
      const registeredNetas = allDislikeNetas.map(
        (neta: DBNetas) => neta.neta_id
      );
      setSelectedNetas(registeredNetas);
      const allNetasAddDislike = Object.values(allNetas).map((neta) => {
        const isDisliked = registeredNetas.includes(neta.id);
        return { ...neta, dislike: isDisliked };
      });
      console.log("allNetasAddDislike", allNetasAddDislike);
      setFullNetas(allNetasAddDislike);
    }
  }, [allDislikeNetas, allNetas]);

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
        {fullNetas &&
          // mapはArrayのみしか使えないので、構造の確認を挟む必要がある
          Object.values(fullNetas).map((neta) => (
            <Box w="50%" key={neta.id} mb=".5rem">
              <Checkbox
                defaultChecked={neta.dislike}
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
