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

const Home = () => {
  const router = useRouter();

  return (
    <DefaultLayout pageTitle="丼丸ガチャ">
      <Stack mt="2rem" spacing="1rem">
        <SText>
          本日あなたにぴったりの
          <br />
          海鮮丼を選びます 🐟
        </SText>
        <Stack spacing="1.5rem">
          <BaseButton isDark={false} isArrow={true} href="/result">
            おまかせガチャ
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/select/neta">
            具材を選んでガチャ
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/select/favorite">
            お気に入りからガチャ
          </BaseButton>
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
