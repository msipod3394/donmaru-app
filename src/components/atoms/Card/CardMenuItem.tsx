import { FC, memo } from "react";
import styled from "styled-components";
import { Text, VStack, HStack, Image } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { FaHeart } from "react-icons/fa";
import { convertFormattedDate } from "@/hooks/convertFormattedDate";
import { DBDons } from "@/types/global_db.types";

type Props = {
  data: Array<DBDons>;
  onClickHandle?: (arg: number | undefined) => void;
};

export const CardMenuItem: FC<Props> = memo((props) => {
  const { dons, onClickHandle } = props;
  const handleItemClick = (index: number) => {
    onClickHandle?.(index);
  };

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
const IconHeart = styled(FaHeart)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 24px;
  color: #f13b3a;
`;

CardMenuItem.displayName = "CardMenuItem";
