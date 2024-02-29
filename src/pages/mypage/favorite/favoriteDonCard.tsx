import React, { FC } from "react";
import styled from "styled-components";
import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { DBDons, Don } from "@/types/global_db.types";
import { convertFormattedDate } from "@/hooks/convertFormattedDate";

// type Neta = {
//   id: number;
//   name: string;
//   created_at: string;
//   updated_at: string;
// };

// type DonsNetas = {
//   netas: {
//     id: number;
//     name: string;
//     created_at: string;
//     updated_at: string;
//   };
// };

// type Don = {
//   id: number;
//   image: string;
//   title: string;
//   created_at: string;
//   dons_netas: DonsNetas[];
//   updated_at: string;
// };

type Props = {
  don: Don;
  favorite?: boolean;
  // onClick: () => void | undefined;
};

const FavoriteDonCard: FC<Props> = (props) => {
  const { don, favorite = true } = props;

  // console.log("dons_netas", don);

  // don データを返す
  // const handleCardClick = () => {
  //   onClick(don);
  // };

  return (
    <>
      <SBox>
        <Image w="80px" src={`/menu/don_${don.id}.png`} alt={don.title} />
        <SBoxIn spacing={0.5}>
          <Text size="sm" fontWeight="500">
            {don.title}
          </Text>
          <Text fontSize="xs">
            {don.dons_netas &&
              don.dons_netas.map((neta, index) => {
                const netaName = neta.netas && neta.netas.name;
                return (
                  <>
                    <Text as="span" fontSize="xs" key={netaName}>
                      {index > 0 && <>・</>}
                      {netaName}
                    </Text>
                  </>
                );
              })}
          </Text>
          <HStack gap=".5rem">
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
          </HStack>
        </SBoxIn>
        {favorite === true ? <IconOnHeart /> : <IconHeart />}
      </SBox>
    </>
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

const IconOnHeart = styled(FaHeart)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 24px;
  color: #f13b3a;
`;

export default FavoriteDonCard;
