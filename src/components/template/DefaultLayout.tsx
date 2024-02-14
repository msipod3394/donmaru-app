import { FC, ReactNode } from "react";
import {
  Box,
  Container,
  Heading,
  Image,
  HStack,
  VStack,
} from "@chakra-ui/react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  pageTitle?: string;
};

export const DefaultLayout: FC<Props> = (props) => {
  const { children, pageTitle = "" } = props;
  return (
    <SLayoutWrap as="main">
      <SInner>
        <SLeftBox>
          <Image src="/common/FixLeft/FixLeft_image.png" alt="丼丸ロゴ" />
        </SLeftBox>
        <SRightBox as="section">
          <Heading as="h2" size="4xl" fontFamily="serif" pb={4}>
            {pageTitle}
          </Heading>
          <SSRightBoxIn>{children}</SSRightBoxIn>
        </SRightBox>
      </SInner>
    </SLayoutWrap>
  );
};

// Layout
const SLayoutWrap = styled(Container)`
  width: 100%;
  min-width: 100%;
  padding: 0;
  margin: 0;
`;

const SInner = styled(HStack)`
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
`;

const SLeftBox = styled(Box)`
  width: 50%;

  > img {
    margin: 0 auto;
  }
`;

const SRightBox = styled(Box)`
  width: 50%;
  max-width: 390px;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  padding: 4rem 1.6rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  > h1 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const SSRightBoxIn = styled(VStack)`
  overflow-y: scroll;
  /* padding-bottom: 8rem; */

  &::-webkit-scrollbar {
    display: none;
  }
`;
