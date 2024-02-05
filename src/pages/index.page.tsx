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
    <DefaultLayout pageTitle="UI一覧">
      <Stack mt="2rem" spacing="1rem">
        <Stack spacing="1.5rem">
          <BaseButton isDark={false} isArrow={true} href="/signup">
            新規登録
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/login">
            ログイン
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/select/neta">
            具材を選んでガチャ
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/select/favorite">
            お気に入りからガチャ
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/result">
            結果画面
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/menu">
            お品書き
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/mypage">
            マイページ
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/mypage/orderHistory">
            注文履歴
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/mypage/favorite">
            お気に入り管理
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/mypage/dislike">
            苦手ネタ管理
          </BaseButton>
          <BaseButton isDark={false} isArrow={true} href="/mypage/user">
            会員情報管理
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
