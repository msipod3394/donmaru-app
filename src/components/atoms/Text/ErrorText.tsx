import React, { FC, ReactNode } from "react";
import { Text } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

export const ErrorText: FC<Props> = ({ children }) => {
  return <Text color="#ff1500">{children}</Text>;
};
