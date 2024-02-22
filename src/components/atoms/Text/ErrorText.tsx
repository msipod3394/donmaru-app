import React, { FC, ReactNode, memo } from "react";
import { Text } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

export const ErrorText: FC<Props> = memo(({ children }) => {
  return <Text color="#ff1500">{children}</Text>;
});

ErrorText.displayName = "ErrorText";
