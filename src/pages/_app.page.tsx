import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme/theme";
import { SelectedDonsProvider } from "@/provider/SelectedDonsContext";
import { LoginUserProvider, useLoginUser } from "@/provider/LoginUserContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FullPropertyDonsProvider } from "@/provider/FullPropertyDonsContext";
// import { FullPropertyDonsProvider } from "@/provider/FullPropertyDonsContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter();

  // ユーザーのログイン情報
  // const { loginUser } = useLoginUser();
  // console.log("loginUser", loginUser);

  // ログインしているかを確認し、ログインしていなかったらリダイレクト
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (!loginUser || Object.values(loginUser).every(value => value === "")) {
  //       console.log("ログインしていない");
  //       router.push("/login");
  //     } else {
  //       console.log("ログイン中");
  //     }
  //   }
  // }, []);

  return (
    <ChakraProvider theme={theme}>
      <SelectedDonsProvider>
        <LoginUserProvider>
          <FullPropertyDonsProvider>
            <Component {...pageProps} />
          </FullPropertyDonsProvider>
        </LoginUserProvider>
      </SelectedDonsProvider>
    </ChakraProvider>
  );
}
