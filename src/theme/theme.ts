// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const base = {
  // baseBg: "#F13B3A",
  baseBg: "#FFF",
  baseText: "#222222",
  primary: "#337ab7",
  success: "#198754",
  info: "#0dcaf0",
  warning: "#ffc107",
  danger: "#DE5D50",
  dark: "#525263",
};

const breakpoints = {
  base: "1024px",
  xs: "375px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const theme = extendTheme({
  styles: {
    global: {
      body: {
        // 背景色
        backgroundColor: base.baseBg,
        // テキスト
        color: base.baseText,
      },
    },
  },
  components: {
    global: {
      variants: {
        serif: {
          fontFamily: `"Sawarabi Mincho", serif`,
        },
        sans: {
          fontFamily: `'Noto Sans JP', sans-serif`,
        },
      },
      defaultProps: {
        variant: "sans", // デフォルトはゴシック体
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        md: {
          bg: "#FFF",
          fontSize: "md",
          borderRadius: "full",
          border: "1px solid #000",
          padding: ".5rem",
        },
        // md: {
        //   bg: "#FFF",
        //   fontSize: "2xl",
        //   borderRadius: "full",
        //   border: "3px solid #000",
        //   padding: "1rem",
        // },
      },
      defaultProps: {
        size: "xl", // default is md
        variant: "md", // default is solid
      },
    },
    Input: {
      baseStyle: {},
      variants: {
        md: {
          border: "2px solid #000",
        },
      },
      defaultProps: {
        size: "md",
        variant: "md",
      },
    },
  },
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.625rem", // 26px
    "4xl": "1.625rem", // 28px
    "5xl": "1.875rem", // 30px
    "6xl": "2rem", // 32px
    "7xl": "2.25rem", // 36px
    "8xl": "2.5rem", // 40px
    "9xl": "3rem", // 48px
    "10xl": "3.75rem", // 60px
  },
  breakpoints,
  fonts: {
    heading: `"Sawarabi Mincho", serif`,
    body: `'Noto Sans JP', sans-serif`,
  },
});

export default theme;
