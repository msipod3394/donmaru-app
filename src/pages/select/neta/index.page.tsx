import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Text, Stack, HStack, Checkbox } from "@chakra-ui/react";
import styled from "styled-components";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";

const SelectNeta = () => {
  return (
    <DefaultLayout pageTitle="ネタを選ぶ">
      <SBGGrayInner mt="1rem">
        <Text>好きなネタを「2つ」まで選んでね</Text>
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
      <BaseButton isArrow={true} isDark={true} href="/result">
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

const SCheckbox = styled(Checkbox)``;

export default SelectNeta;
