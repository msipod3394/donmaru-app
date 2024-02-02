import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import useAuth from "@/hooks/useAuth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
type SignUpFormInput = {
  // name: string;
  email: string;
  password: string;
};

const SignUp: NextPage = () => {
  const router = useRouter();
  const { onSignUp, errorMessage } = useAuth();

  // useForm の設定
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      // name: "",
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
    const { email, password } = data;
    await onSignUp(email, password);

    // エラーメッセージの取得
    if (errorMessage) {
      console.log("エラーメッセージ:", errorMessage);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* メールアドレス */}
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>メールアドレス :</FormLabel>
          <Input {...register("email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        {/* パスワード */}
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>パスワード :</FormLabel>
          <Input type="password" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit">登録</Button>
        {/* <Button onClick={() => router.push("/login")}>ログイン画面へ</Button> */}
      </form>
      {/* エラーメッセージ */}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default SignUp;
