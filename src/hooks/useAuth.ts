import { useRouter } from "next/router";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const useAuth = () => {
  const router = useRouter();
  // const supabase = createClientComponentClient<Database>();

  const [message, setMessage] = useState("");

  // サインアップ
  const onSignUp = (email: string, password: string) => {
    supabase.auth
      .signUp({ email, password })
      .then(({ data, error: signUpError }) => {
        if (signUpError) {
          console.error("サインアップエラー:", signUpError);
          // エラー文をセット
          setMessage(`エラーが発生しました。${signUpError}`);
          throw signUpError;
        } else {
          console.log("サインアップ成功:", data.user);
          router.push("/login");
        }
      })
      .catch((error) => {
        // alert("エラーが発生しました");
        console.log(message);
        return message; // エラーメッセージを返す
      });
  };

  // サインイン
  const onSignIn = async (email: string, password: string) => {
    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      console.log(data);
      if (signInError) {
        console.log(signInError);
        throw signInError;
      }
      await router.push("/home");
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  // 情報変更
  const onDataUpdata = async (
    newUserName: string | undefined,
    email: string
  ) => {
    try {
      // ユーザー情報を更新
      const { data, error } = await supabase
        .from("users")
        .update({ user_name: newUserName })
        .eq("email", email)
        .select();
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  return {
    onSignUp,
    onSignIn,
    onDataUpdata,
    errorMessage: message, // エラーメッセージを外部に公開
  };
};

export default useAuth;
