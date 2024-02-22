import { FC, memo } from "react";
import styled from "styled-components";
import { Text, VStack, HStack, Image } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { convertFormattedDate } from "@/hooks/convertFormattedDate";
import { DBDons } from "@/types/global_db.types";

type Props = {
  data: Array<DBDons>;
  onClickHandle?: (arg: number | undefined) => void;
};

export const CardFavorite: FC<Props> = memo((props) => {
  const { data, onClickHandle } = props;
  const handleItemClick = (index: number) => {
    onClickHandle?.(index);
  };

  return (
    <>
      {data.map((item, index) => (
        <SBox
          key={index}
          // className={item.isSelected ? "_isSelected" : ""}
          onClick={() => handleItemClick(index)}
          cursor={"pointer"}
        >
          <Image w="80px" src={`/menu/${item.image}`} alt="" />
          <SBoxIn spacing={0.5}>
            <Text size="sm" fontWeight="500">
              {item.title}
            </Text>
            <HStack></HStack>
            <HStack gap=".5rem">
              <HStack gap=".25rem">
                <TimeIcon fontSize="xs" color="red" />
                <Text fontSize="xs" color="gray.500">
                  {convertFormattedDate(item.updated_at)}
                </Text>
              </HStack>
              <HStack gap=".25rem">
                <TimeIcon fontSize="xs" color="red" />
                <Text fontSize="xs" color="gray.500">
                  {/* 過去{item.count}回注文 */}
                  過去hoge回注文
                </Text>
              </HStack>
            </HStack>
          </SBoxIn>
        </SBox>
      ))}
    </>
  );
});

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

CardFavorite.displayName = "CardFavorite";
