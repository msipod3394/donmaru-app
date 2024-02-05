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
  Image,
} from "@chakra-ui/react";
import styled from "styled-components";
import useAuth from "@/hooks/useAuth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { BaseInput } from "@/components/atoms/Inputs/BaseInput";
import { ErrorText } from "@/components/atoms/Text/ErrorText";

const Home = () => {
  const router = useRouter();

  return (
    <DefaultLayout pageTitle="へいお待ち!">
      <Stack spacing="1rem">
        <Image
          mt="1rem"
          mb="1rem"
          src="/menu/sample_result.png"
          alt="サンプル画像"
        />
        <SResultText fontFamily="serif">「丼丸丼」</SResultText>
        <SText>サーモン、マグロ、イカ、ネギトロ</SText>
        <Stack spacing="1.5rem">
          <BaseButton isArrow={false} href="">
            注文履歴に追加する
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/home">
            もう一回ガチャする
          </BaseButton>
        </Stack>
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
  margin-bottom: 3rem;
  font-size: 1rem;
  text-align: center;
  background-color: #f13a3a20;
`;

export default Home;
