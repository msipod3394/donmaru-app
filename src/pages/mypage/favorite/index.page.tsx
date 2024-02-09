import Link from "next/link";
import styled from "styled-components";
import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { FaRegHeart } from "react-icons/fa";
import { getAllDons } from "@/hooks/supabaseFunctions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DBDons } from "@/types/global_db.types";
import FavoriteDonCard from "./favoriteDonCard";

export default function PageFavorite() {
  const router = useRouter();

  // 全丼データ
  const [allDons, setAllDons] = useState<DBDons[]>([]);

  /**
   * 全メニューの取得・表示
   */
  // 初回、donsテーブルを呼び出す
  useEffect(() => {
    const getDons = async () => {
      const dons = await getAllDons();
      setAllDons(dons);
    };
    getDons();
    console.log(allDons);
  }, [setAllDons]);

  return (
    <DefaultLayout pageTitle="お気に入り">
      <VStack minW="100%" spacing={2} mt={16} mb={4}>
        <FavoriteDonCard allDons={allDons} />
        {/* <SBox>
          <Image w="80px" src="/menu/sample_result.png" alt="" />
          <SBoxIn spacing={0.5}>
            <Text size="sm" fontWeight="500">
              丼丸丼
            </Text>
            <Text fontSize="xs">サーモン、マグロ、イカ、ネギトロ</Text>
            <HStack gap=".5rem">
              <HStack gap=".25rem">
                <TimeIcon boxSize={3} color="red" />
                <Text fontSize="xs" color="gray.500">
                  2024年01月01日
                </Text>
              </HStack>
              <HStack gap=".25rem">
                <TimeIcon boxSize={3} color="red" />
                <Text fontSize="xs" color="gray.500">
                  過去3回注文
                </Text>
              </HStack>
            </HStack>
          </SBoxIn>
          <IconHeart />
        </SBox> */}
      </VStack>
      <SFixButtonArea>
        <BaseButton isDark={true} isArrow={false}>
          <Link href="/mypage">マイページに戻る</Link>
        </BaseButton>
      </SFixButtonArea>
    </DefaultLayout>
  );
}

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

const SBox = styled(HStack)`
  position: relative;
  width: 100%;
  border: 2px solid #000;
  padding: 1rem;
  border-radius: 5px;
`;
const SBoxIn = styled(VStack)`
  align-items: flex-start;
`;
const SFixButtonArea = styled(VStack)`
  position: fixed;
  bottom: 2.4rem;
`;
const IconHeart = styled(FaRegHeart)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 24px;
  color: #f13b3a;
`;
