import React, { FC } from "react";
import styled from "styled-components";
import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { DBDons } from "@/types/global_db.types";
import { convertFormattedDate } from "@/hooks/convertFormattedDate";

type Props = {
  don: DBDons;
  onClick: () => void;
  favorite?: boolean;
};

const NotFavoriteDonCard: FC<Props> = (props) => {
  const { don, onClick, favorite = true } = props;

  // don データを返す
  const handleCardClick = () => {
    onClick(don);
  };

  return (
    <>
      <SBox onClick={handleCardClick}>
        <Image w="80px" src={`/menu/${don.image}`} alt={don.title} />
        <SBoxIn spacing={0.5}>
          <Text size="sm" fontWeight="500">
            {don.title}
          </Text>
          <Text fontSize="xs">{`hoge,hoge,hoge`}</Text>
          <HStack gap=".5rem">
            <HStack gap=".25rem">
              <TimeIcon boxSize={3} color="red" />
              <Text fontSize="xs" color="gray.500">
                {convertFormattedDate(don.updated_at)}
              </Text>
            </HStack>
            <HStack gap=".25rem">
              <TimeIcon boxSize={3} color="red" />
              <Text fontSize="xs" color="gray.500">
                過去{`hoge`}回注文
              </Text>
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

export default NotFavoriteDonCard;
