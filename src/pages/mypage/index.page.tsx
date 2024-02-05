import Link from "next/link";
import styled from "styled-components";
import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { FaRegHeart } from "react-icons/fa";

export default function PageMyPage() {
  return (
    <DefaultLayout pageTitle="マイページ">
      <VStack justifyContent="center">
        <VStack minW="100%" spacing={4} mt={8} mb={4}>
          <BaseButton isDark={false} href="/mypage/history">
            注文履歴
          </BaseButton>
          <BaseButton isDark={false} href="/mypage/favorite">
            お気に入り
          </BaseButton>
          <BaseButton isDark={false} href="/mypage/dislike">
            苦手ネタ登録
          </BaseButton>
        </VStack>
        <VStack minW="100%" spacing={4} mt={8} mb={4}>
          <BaseButton isDark={false} href="/mypage/user">
            会員情報の変更
          </BaseButton>
          <BaseButton isDark={true} href="/home">
            ログアウト
          </BaseButton>
        </VStack>
      </VStack>
    </DefaultLayout>
  );
}
