import { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Box,
  Link,
} from "@chakra-ui/react";
import styled from "styled-components";
import useAuth from "@/hooks/useAuth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DefaultLayout } from "@/components/template/DefaultLayout";
import { BaseButton } from "@/components/atoms/Buttons/BaseButton";
import { BaseInput } from "@/components/atoms/Inputs/BaseInput";
import { ErrorText } from "@/components/atoms/Text/ErrorText";

// バリデーションスキーマ
const schema = yup.object().shape({
  // name: yup.string().required("氏名は必須です"),
  email: yup
    .string()
    .email("有効なメールアドレスを入力してください")
    .required("メールアドレスは必須です"),
  password: yup
    .string()
    .min(6, "パスワードは6文字以上で入力してください")
    .required("パスワードは必須です"),
});

// 入力フォームのデータ型
type SignInFormInput = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const router = useRouter();
  const { onSignIn, getCurrentUser, errorMessage } = useAuth();

  // useForm の設定
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInFormInput> = async (data) => {
    const { email, password } = data;
    await onSignIn(email, password);
    await getCurrentUser();

    // エラーメッセージの取得
    if (errorMessage) {
      console.log("エラーメッセージ:", errorMessage);
    }
  };

  return (
    <DefaultLayout pageTitle="ログイン">
      <SText mt="2rem">
        ログインして、
        <br />
        今日の海鮮丼を決めよう！
      </SText>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="1rem" mb="2rem">
          {/* メールアドレス */}
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>メールアドレス</FormLabel>
            <BaseInput
              text="メールアドレス"
              register={register("email")}
              type="email"
            />{" "}
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          {/* パスワード */}
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>パスワード</FormLabel>
            <BaseInput
              text="パスワード"
              register={register("password")}
              type="password"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Stack mt="2rem">
            <BaseButton type="submit">ログイン</BaseButton>
            <Box mt="2rem">
              <Link mt="2rem" onClick={() => router.push("/signup")}>
                <Text textAlign="center" textDecoration="underline">
                  新規登録はこちら
                </Text>
              </Link>
            </Box>
          </Stack>
        </Stack>
      </form>
      {/* エラーメッセージ */}
      <ErrorText>{errorMessage && <p>{errorMessage}</p>}</ErrorText>
    </DefaultLayout>
  );
};

// Style
const SText = styled(Text)`
  padding: 2rem;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  text-align: center;
  background-color: #f3f3f3;
`;

export default SignIn;
