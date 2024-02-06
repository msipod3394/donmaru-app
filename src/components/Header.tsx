import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Header = () => {
  const [currentUser, setCurrentUser] = useState("");
  const router = useRouter();

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
};

export default Header;
