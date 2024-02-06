import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme/theme";
import Header from "@/components/Header";
import { SelectedDonsProvider } from "@/provider/SelectedDonsContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SelectedDonsProvider>
        <Header />
        <Component {...pageProps} />
      </SelectedDonsProvider>
    </ChakraProvider>
  );
}
