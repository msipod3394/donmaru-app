import { FC, ReactNode, memo } from "react";
import styled, { css } from "styled-components";
import { Button, Link } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  isDark?: boolean;
  isArrow?: boolean;
  type?: "submit" | "button" | "reset";
  href?: string;
  onClick?: () => void;
};

export const BaseButton: FC<Props> = memo(
  ({
    children,
    isDark = true,
    isArrow = false,
    type = "button",
    href,
    onClick,
  }) => {
    const SButton = styled(href ? Link : Button)`
      // LinkかButtonを動的に選択
      padding: 1rem;
      min-width: 20rem;
      border: 3px solid #000;
      border-radius: 10rem;

      ${isDark &&
      css`
        background-color: #000;
        color: #fff;
      `}

      > span {
        display: flex;
        justify-content: center;
        font-size: 1.5rem;
        line-height: 1;
        font-weight: 500;

        ${isArrow &&
        css`
          &::after {
            content: "";
            display: block;
            width: 1.5rem;
            height: 1.5rem;
            mask-image: url(/common/icon/arrow.svg);
            mask-repeat: no-repeat;
            mask-position: center;
            background-color: #000;
            margin-left: 0.5rem;
          }
        `}

        ${isArrow &&
        isDark &&
        css`
          &::after {
            background-color: #fff;
          }
        `}
      }

      &:hover {
        background-color: #000;
        color: #fff;
        text-decoration: none;

        ${isDark &&
        css`
          background-color: #fff;
          color: #000;
        `}

        ${isArrow &&
        css`
          > span::after {
            background-color: #fff;
          }
        `}
  
      ${isArrow &&
        isDark &&
        css`
          > span::after {
            background-color: #000;
          }
        `}
      }
    `;

    return (
      <SButton fontFamily="serif" type={type} href={href} onClick={onClick}>
        <span>{children}</span>
      </SButton>
    );
  }
);

BaseButton.displayName = "BaseButton";
