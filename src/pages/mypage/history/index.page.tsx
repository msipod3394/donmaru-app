import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Text, Stack, VStack, HStack, Image } from "@chakra-ui/react";
import styled from "styled-components";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { BaseInput } from "@/components/atoms/Inputs/BaseInput";
import { ErrorText } from "@/components/atoms/Text/ErrorText";
import { useState } from "react";
import { CardFavorite } from "@/components/atoms/Card/CardMenuItem";

const OrderHistory = () => {
  const router = useRouter();

  // dummyData
  const dummyData = [
    {
      id: "1",
      name: "丼丸丼",
      ingredients: ["サーモン", "マグロ", "イカ", "ネギトロ"],
      lastDate: "2024年01月01日",
      count: "1",
      imageSrc: "/menu/sample_result.png",
      isSelected: true,
    },
    {
      id: "2",
      name: "丼丸丼",
      ingredients: ["サーモン", "マグロ", "イカ", "ネギトロ"],
      lastDate: "2024年01月01日",
      count: "1",
      imageSrc: "/menu/sample_result.png",
      isSelected: false,
    },
    {
      id: "3",
      name: "丼丸丼",
      ingredients: ["サーモン", "マグロ", "イカ", "ネギトロ"],
      lastDate: "2024年01月01日",
      count: "1",
      imageSrc: "/menu/sample_result.png",
      isSelected: false,
    },
  ];

  const [data, setData] = useState(dummyData);

  return (
    <DefaultLayout pageTitle="注文履歴">
      <SBGGrayInner mt="1rem">
        <Text>現在登録中のお気に入りメニュー</Text>
      </SBGGrayInner>
      <VStack minW="100%" mb={10} spacing={4}>
        <CardFavorite data={data} />
        {/* {dummyData.map((item, index) => (
          <CardFavorite
            key={index}
            item={item}
            index={index}
            selected={data}
            onClickHandle={(index) => onClickHandleSelect(index)}
          />
        ))} */}
      </VStack>
      <BaseButton isDark={false} href="/mypage">
        マイページに戻る
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
const SBox = styled(HStack)`
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  box-sizing: border-box;
  border: 3px solid #000;

  &._isSelected {
    border-color: #000;
  }
`;
const SBoxIn = styled(VStack)`
  align-items: flex-start;
`;

export default OrderHistory;
