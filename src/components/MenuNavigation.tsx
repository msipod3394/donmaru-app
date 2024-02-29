import NextLink from "next/link";
import { Stack, LinkProps, Text, Link } from "@chakra-ui/react";
import { useLoginUser } from "@/provider/LoginUserContext";

type HoverLinkProps = LinkProps & {
  children: React.ReactNode;
  href: string;
};

export const Navigation = () => {
  const HoverLink: React.FC<HoverLinkProps> = ({
    children,
    href,
    ...props
  }) => (
    <NextLink href={href} passHref>
      <Link as="span" _hover={{ textDecoration: "underline" }} p={2} {...props}>
        {children}
      </Link>
    </NextLink>
  );

  // ログイン状況の呼び出し
  const { loginUser } = useLoginUser();
  const checkLoginUser = loginUser ? `loginUser ${loginUser}` : null;

  return (
    <Stack as="nav">
      {/* 会員登録セクション */}
      {checkLoginUser ? (
        <Text as="b">こんにちは！{loginUser.email} さん</Text>
      ) : (
        <>
          <Stack>
            <Text as="h3" fontWeight="bold">
              会員登録
            </Text>
            <HoverLink href="/signup">新規登録</HoverLink>
            <HoverLink href="/login">ログイン</HoverLink>
          </Stack>
        </>
      )}

      {/* ホーム */}
      <Stack mt="40px">
        <HoverLink as="b" href="/home">
          ホーム
        </HoverLink>
      </Stack>

      {/* 今日の丼を選ぶセクション */}
      <Stack mt="40px">
        <Text as="h3" fontWeight="bold">
          今日の丼を選ぶ
        </Text>
        <HoverLink href="/home">ガチャする</HoverLink>
        <HoverLink href="/menu">全メニューから選ぶ</HoverLink>
      </Stack>

      {/* マイページセクション */}
      <Stack mt="40px">
        <Text as="h3" fontWeight="bold">
          マイページ
        </Text>
        <HoverLink href="/mypage">マイページ トップ</HoverLink>
        <HoverLink href="/mypage/history">注文履歴</HoverLink>
        <HoverLink href="/mypage/favorite">お気に入り管理</HoverLink>
        <HoverLink href="/mypage/dislike">苦手ネタ管理</HoverLink>
        {/* <HoverLink href="/mypage/user">会員情報管理</HoverLink> */}
      </Stack>
    </Stack>
  );
};
