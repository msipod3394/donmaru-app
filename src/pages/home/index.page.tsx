import { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Box,
  Link,
} from "@chakra-ui/react";
import styled from "styled-components";
import useAuth from "@/hooks/useAuth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { BaseInput } from "@/components/atoms/Inputs/BaseInput";
import { ErrorText } from "@/components/atoms/Text/ErrorText";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { getAllDons } from "@/hooks/supabaseFunctions";
import { useSelectedDons } from "@/provider/SelectedDonsContext";

const Home = () => {
  const router = useRouter();
  const { selectedDons, setDons } = useSelectedDons();

  // 初回、donsテーブルを呼び出す
  useEffect(() => {
    const getDons = async () => {
      const dons = await getAllDons();
      setDons(dons);
      console.log(dons.dons_netas);
    };
    getDons();
  }, []);

  const onClickSelectDons = () => {
    // donsデータから一つ選択して返す
    const donsIndex = Math.floor(Math.random() * selectedDons.length - 1) + 1;
    console.log(donsIndex);

    setDons(selectedDons[donsIndex]);
    router.push(`/result/${donsIndex}`);
  };

  useEffect(() => {
    console.log("selectedDons", selectedDons);
  }, [selectedDons]);

  return (
    <DefaultLayout pageTitle="丼丸ガチャ">

      {/* selectedDonsが存在する場合に表示 */}
      {selectedDons && <p>{selectedDons.title}</p>}

      <Stack mt="2rem" spacing="1rem">
        <SText>
          本日あなたにぴったりの
          <br />
          海鮮丼を選びます 🐟
        </SText>
        <Stack spacing="1.5rem">
          <BaseButton
            isDark={false}
            isArrow={true}
            onClick={() => onClickSelectDons()}
          >
            おまかせガチャ
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/select/favorite">
            お気に入りからガチャ
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/select/neta">
            具材を選んでガチャ
          </BaseButton>
          {/* <Link onClick={() => router.push(`/result`)}>おまかせガチャ</Link> */}
        </Stack>
      </Stack>
    </DefaultLayout>
  );
};

// Style
const SText = styled(Text)`
  padding: 2rem;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  text-align: center;
  background-color: #f3f3f3;
`;

export default Home;
