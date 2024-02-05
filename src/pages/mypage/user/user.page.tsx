import styled from "styled-components";
import {
  Box,
  Container,
  Heading,
  Image,
  HStack,
  VStack,
  Text,
  Input,
  Stack,
} from "@chakra-ui/react";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { BaseInput } from "@/components/atoms/Inputs/BaseInput";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import Link from "next/link";

export default function PageUserSetting() {
  const SText = styled(Text)`
    font-size: 1.25rem;
    text-align: center;
    background-color: #f3f3f3;
    padding: 2rem;
    margin-bottom: 4rem;
  `;

  return (
    <DefaultLayout pageTitle="会員情報の変更">
      <Stack minW="100%" spacing={4} mt="4rem" mb="4rem">
        <BaseInput text="ユーザーID" />
        <BaseInput text="パスワード" />
      </Stack>
      <BaseButton isDark={true} isArrow={false}>
        <Link href="/mypage">登録する</Link>
      </BaseButton>
      <Text as="u" mt="1rem">
        <Link href="/mypage">退会する</Link>
      </Text>
    </DefaultLayout>
  );
}
