import React, { FC } from "react";
import styled from "styled-components";
import { Box, Text, VStack, HStack, Image, Stack } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { FaHeart } from "react-icons/fa";
import { donsTable } from "@/types/dons";
import { DBNetas } from "@/types/global_db.types";

type Order = {
  don_id: number;
  updated_at: string;
  count: number;
};

type Props = {
  dons: {
    id: number;
    title: string;
    image: string;
    created_at: string;
    updated_at: string;
    dons_netas: {
      netas: DBNetas;
    }[];
    favorite: boolean;
    order?: Order;
  }[];
};

export const MenuCard: FC<Props> = (props) => {
  const { dons } = props;
  console.log(dons);

  return (
    <>
      {Array.isArray(dons) &&
        dons.map((don) => (
          <SBox key={don.id}>
            <Image w="80px" src={`/menu/${don.image}`} alt={don.title} />
            <SBoxIn spacing={0.5}>
              <Text size="sm" fontWeight="500">
                {don.title}
              </Text>
              <HStack gap={0} flexWrap="wrap">
                {don.dons_netas &&
                  Array.isArray(don.dons_netas) &&
                  don.dons_netas.map((neta, index) => {
                    const netaName = neta.netas && neta.netas.name;
                    return (
                      <Text as="span" fontSize="xs" key={index}>
                        {index > 0 && <>・</>}
                        {netaName}
                      </Text>
                    );
                  })}
              </HStack>
              <HStack gap=".5rem">
                {don.order?.updated_at && (
                  <>
                    <HStack gap=".25rem">
                      <TimeIcon boxSize={3} color="red" />
                      <Text fontSize="xs" color="gray.500">
                        {don.order?.updated_at}
                      </Text>
                    </HStack>
                  </>
                )}
                {don.order?.updated_at && (
                  <>
                    <HStack gap=".25rem">
                      <TimeIcon boxSize={3} color="red" />
                      <Text fontSize="xs" color="gray.500">
                        過去{don.order?.count}回注文
                      </Text>
                    </HStack>
                  </>
                )}
              </HStack>
            </SBoxIn>
            {don.favorite && <IconHeart />}
          </SBox>
        ))}
    </>
  );
};

// style
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
const IconHeart = styled(FaHeart)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 24px;
  color: #f13b3a;
`;
