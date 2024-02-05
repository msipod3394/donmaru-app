import styled from "styled-components";
import { Text, VStack, HStack, Image } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { FC, useEffect, useState } from "react";
import { selectCard } from "@/types/favoriteCard";

type Props = {
  data: Array<selectCard>;
  onClickHandle?: (arg: number | undefined) => void;
};

export const CardFavorite: FC<Props> = (props) => {
  const { data, onClickHandle } = props;
  const handleItemClick = (index: number) => {
    onClickHandle?.(index);
  };
  return (
    <>
      {data.map((item, index) => (
        <SBox
          key={index}
          className={item.isSelected ? "_isSelected" : ""}
          onClick={() => handleItemClick(index)}
          cursor={"pointer"}
        >
          <Image w="80px" src={item.imageSrc} alt="" />
          <SBoxIn spacing={0.5}>
            <Text size="sm" fontWeight="500">
              {item.name}
            </Text>
            <HStack>
              {item.ingredients.map((ingredient, i) => (
                <Text as="span" key={i} fontSize="xs">
                  {ingredient}
                </Text>
              ))}
            </HStack>
            <HStack gap=".5rem">
              <HStack gap=".25rem">
                <TimeIcon fontSize="xs" color="red" />
                <Text fontSize="xs" color="gray.500">
                  {item.lastDate}
                </Text>
              </HStack>
              <HStack gap=".25rem">
                <TimeIcon fontSize="xs" color="red" />
                <Text fontSize="xs" color="gray.500">
                  過去{item.count}回注文
                </Text>
              </HStack>
            </HStack>
          </SBoxIn>
        </SBox>
      ))}
    </>
  );
};

const SBox = styled(HStack)`
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  box-sizing: border-box;
  border: 3px solid #000;

  &._isSelected {
    border-color: #de5d50;
  }
`;

const SBoxIn = styled(VStack)`
  align-items: flex-start;
`;
