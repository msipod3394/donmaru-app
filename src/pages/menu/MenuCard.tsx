import React from "react";
import styled from "styled-components";
import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { FaRegHeart } from "react-icons/fa";
import { donsTable } from "@/types/dons";

type Props = {
  dons: donsTable[];
};

export const MenuCard = (props: Props) => {
  const { dons } = props;
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
  return (
    <>
      {dons.map((don) => (
        <SBox key={don.id}>
          <Image w="80px" src={`/menu/${don.image}`} alt={don.title} />
          <SBoxIn spacing={0.5}>
            <Text size="sm" fontWeight="500">
              {don.title}
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
        </SBox>
      ))}
    </>
  );
};
