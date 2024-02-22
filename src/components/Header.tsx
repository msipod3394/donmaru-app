import { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";
import { supabase } from "@/lib/supabase";

export const Header = memo(() => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState("");

  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getSession();

    // セッションがあるときだけ現在ログインしているユーザーを取得する
    console.log(data);

    if (data.session !== null) {
      // supabaseに用意されている現在ログインしているユーザーを取得する関数
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // currentUserにユーザーのメールアドレスを格納
      if (user) {
        setCurrentUser(user.id);
      }
    }
  };

  // HeaderコンポーネントがレンダリングされたときにgetCurrentUser関数が実行される
  useEffect(() => {
    getCurrentUser();
  }, [router]);

  return (
    <div>
      {currentUser ? (
        <Text>{currentUser} でログインしています。</Text>
      ) : (
        <Text>ログインしていません。</Text>
      )}
    </div>
  );
});

Header.displayName = "Header";
