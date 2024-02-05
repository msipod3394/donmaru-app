import Link from "next/link";
import styled from "styled-components";
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

export default function PageDislike() {
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

  return (
    <DefaultLayout pageTitle="苦手ネタ登録">
      <SBGGrayInner mt="3rem">
        <Text>
          登録されたネタが入っている丼は、
          <br />
          選択されないよう配慮します。
        </Text>
      </SBGGrayInner>
      <HStack minW="100%" mb={10}>
        <Stack w="50%">
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
        </Stack>
        <Stack w="50%">
          <Checkbox iconColor="gray">サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
          <Checkbox>サーモン</Checkbox>
        </Stack>
      </HStack>
      <BaseButton isArrow={false} isDark={true}>
        <Link href="/mypage">登録する</Link>
      </BaseButton>
    </DefaultLayout>
  );
}
