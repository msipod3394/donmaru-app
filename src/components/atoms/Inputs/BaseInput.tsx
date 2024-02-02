import { Input } from "@chakra-ui/react";
import { FC } from "react";
import styled from "styled-components";

type Props = {
  text: string;
  register?: any; // React Hook Form の register 関数がくる想定
  type?: string;
};

export const BaseInput: FC<Props> = ({ text, register, type = "" }) => {
  const SBaseInput = styled(Input)`
    border: 2px solid #000;
    outline: none;
    border-radius: inherit;
    font-size: 1.2rem;
    padding: 1.5rem 1rem;

    &:hover,
    &:active {
      border: 2px solid #f13b3a;
      outline: none;
    }
  `;

  return <SBaseInput placeholder={text} {...register} type={type} />;
};
